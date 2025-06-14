import React, { useState } from 'react';
import { StatCard } from '@/components/StatCard';
import { ChartCard } from '@/components/ChartCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Users, 
  Activity, 
  Bed, 
  AlertTriangle, 
  Calendar,
  Pill,
  Building2,
  MapPin,
  Eye,
  BarChart3,
  Stethoscope,
  UserCheck,
  Heart,
  Droplets,
  ClipboardList,
  Syringe,
  Download,
  FileText
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';

export function HospitalDashboard() {
  const { getStatistics, getResourcesByHospital, getDiseasesByHospital } = useData();
  const { user } = useAuth();
  
  const [selectedHospital, setSelectedHospital] = useState(user?.hospitalId || 'hospital-luanda');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isComparingHospitals, setIsComparingHospitals] = useState(false);
  
  const hospitalOptions = [
    { id: 'hospital-luanda', name: 'Hospital Central de Luanda' },
    { id: 'hospital-benguela', name: 'Hospital de Benguela' },
    { id: 'hospital-huambo', name: 'Hospital do Huambo' },
    { id: 'hospital-lobito', name: 'Hospital do Lobito' },
    { id: 'hospital-cabinda', name: 'Hospital de Cabinda' }
  ];
  
  const stats = getStatistics('hospital', selectedHospital);
  const resources = getResourcesByHospital(selectedHospital);
  const diseases = getDiseasesByHospital(selectedHospital);
  
  const criticalResources = resources.filter(r => r.status === 'critical');
  const lowResources = resources.filter(r => r.status === 'low');
  const highSeverityDiseases = diseases.filter(d => d.severity === 'high');

  // Dados do gráfico principal - Surtos e Epidemias com valores reais e agrupados
  const outbreakData = diseases.reduce((acc: any[], disease) => {
    const existingDisease = acc.find(d => d.name === disease.name);
    if (existingDisease) {
      existingDisease.value += disease.cases;
      // Mantém a cor baseada na maior severidade
      if (disease.severity === 'high' || 
          (disease.severity === 'medium' && existingDisease.severity === 'low')) {
        existingDisease.severity = disease.severity;
        existingDisease.color = disease.severity === 'high' ? '#dc2626' : '#f59e0b';
      }
    } else {
      acc.push({
        name: disease.name,
        value: disease.cases,
        severity: disease.severity,
        color: disease.severity === 'high' ? '#dc2626' : 
               disease.severity === 'medium' ? '#f59e0b' : '#84cc16'
      });
    }
    return acc;
  }, []).sort((a, b) => b.value - a.value);

  // Funções para os botões
  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    try {
      // Simula geração de relatório
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simula download do relatório
      const reportData = {
        hospital: selectedHospital,
        date: new Date().toLocaleDateString(),
        stats,
        diseases: outbreakData,
        resources
      };
      
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-${selectedHospital}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success('Relatório gerado com sucesso!');
    } catch (error) {
      toast.error('Erro ao gerar relatório');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleCompareHospitals = () => {
    setIsComparingHospitals(true);
    try {
      // Simula comparação entre hospitais
      const comparisonData = hospitalOptions.map(hospital => ({
        name: hospital.name,
        stats: getStatistics('hospital', hospital.id),
        diseases: getDiseasesByHospital(hospital.id)
      }));
      
      // Mostra dados em um toast
      toast.info(
        <div className="space-y-2">
          <h3 className="font-bold">Comparação entre Hospitais</h3>
          {comparisonData.map(hospital => (
            <div key={hospital.name} className="text-sm">
              <p className="font-medium">{hospital.name}</p>
              <p>Casos: {hospital.stats.totalCases}</p>
              <p>Pacientes: {hospital.stats.totalPatients}</p>
            </div>
          ))}
        </div>
      );
    } catch (error) {
      toast.error('Erro ao comparar hospitais');
    } finally {
      setIsComparingHospitals(false);
    }
  };

  const handleDetailedAnalysis = () => {
    // Simula análise detalhada
    toast.info(
      <div className="space-y-2">
        <h3 className="font-bold">Análise Detalhada</h3>
        <p>Total de Casos: {stats.totalCases}</p>
        <p>Casos Críticos: {stats.criticalCases}</p>
        <p>Doenças de Alta Severidade: {highSeverityDiseases.length}</p>
        <p>Recursos Críticos: {criticalResources.length}</p>
      </div>
    );
  };

  // Dados do segundo gráfico - Estado dos Pacientes com cores únicas para cada estado
  const patientStatusData = [
    { name: 'Recuperado', value: 4, color: '#16a34a' },
    { name: 'Estável', value: 2, color: '#0891b2' },
    { name: 'Em Tratamento', value: 3, color: '#ca8a04' },
    { name: 'Grave', value: 1, color: '#ea580c' },
    { name: 'Crítico', value: 1, color: '#dc2626' },
    { name: 'Internado', value: 2, color: '#9333ea' },
    { name: 'Em Observação', value: 1, color: '#ec4899' }
  ];

  // Generate bed occupancy data
  const bedOccupancyData = [
    { name: 'UTI', value: 85 },
    { name: 'Enfermaria', value: 70 },
    { name: 'Pediatria', value: 60 },
    { name: 'Maternidade', value: 90 }
  ];

  const selectedHospitalName = hospitalOptions.find(h => h.id === selectedHospital)?.name || 'Hospital';

  // Seções específicas do hospital
  const hospitalSections = [
    { id: 'visao-geral', title: 'Visão Geral', icon: Eye, description: 'Dashboard principal do hospital' },
    { id: 'consultas', title: 'Gerir Consultas', icon: Stethoscope, description: 'Agendamento e gestão de consultas' },
    { id: 'farmacia', title: 'Farmácia', icon: Pill, description: 'Gestão de medicamentos e farmácia' },
    { id: 'hemoterapia', title: 'Hemoterapia', icon: Droplets, description: 'Banco de sangue e hemoterapia' },
    { id: 'rh', title: 'RH', icon: Users, description: 'Recursos humanos e gestão de pessoal' },
    { id: 'profissionais', title: 'Profissionais Clínicos', icon: UserCheck, description: 'Gestão de profissionais clínicos' },
    { id: 'pacientes', title: 'Pacientes', icon: Heart, description: 'Registo e gestão de pacientes' }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Dashboard Hospitalar</h1>
            <p className="text-muted-foreground mt-2">
              Visão geral das operações do {selectedHospitalName}
            </p>
          </div>
          
          {/* Hospital Selector */}
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-muted-foreground" />
            <Select value={selectedHospital} onValueChange={setSelectedHospital}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {hospitalOptions.map((hospital) => (
                  <SelectItem key={hospital.id} value={hospital.id}>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{hospital.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
          >
            {isGeneratingReport ? (
              <>
                <Download className="w-4 h-4 mr-2 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 mr-2" />
                Relatório Mensal
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleCompareHospitals}
            disabled={isComparingHospitals}
          >
            <Eye className="w-4 h-4 mr-2" />
            Comparar Hospitais
          </Button>
          <Button 
            size="sm" 
            className="bg-health-gradient"
            onClick={handleDetailedAnalysis}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Análise Detalhada
          </Button>
        </div>
      </div>

      {/* Seções específicas do hospital */}
      <Card className="health-card shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Seções do {selectedHospitalName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hospitalSections.map((section) => (
              <div 
                key={section.id} 
                className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors cursor-pointer"
                onClick={() => toast.info(`Navegando para ${section.title}`)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <section.icon className="h-5 w-5 text-health-primary" />
                  <h3 className="font-medium text-sm">{section.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground">{section.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pacientes Atendidos"
          value={stats.totalPatients.toString()}
          change="+12% vs mês anterior"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Casos Ativos"
          value={stats.activeCases.toString()}
          change="+5 hoje"
          changeType="positive"
          icon={Bed}
        />
        <StatCard
          title="Total de Doenças"
          value={stats.totalCases.toString()}
          change="Casos registrados"
          changeType="neutral"
          icon={Activity}
        />
        <StatCard
          title="Alertas Críticos"
          value={stats.resources.toString()}
          change="Recursos em falta"
          changeType="negative"
          icon={AlertTriangle}
          gradient="bg-gradient-to-r from-warning-amber to-danger-red"
        />
      </div>

      {/* Gráfico principal - Surtos e Epidemias */}
      <div className="w-full">
        <ChartCard
          title={`Surtos, Epidemias e Pandemias - ${selectedHospitalName}`}
          data={outbreakData}
          type="bar"
          dataKey="value"
          xAxisKey="name"
          height={400}
          animated={true}
        />
      </div>

      {/* Segundo gráfico - Estado dos Pacientes */}
      <div className="w-full">
        <ChartCard
          title={`Estado Atual dos Pacientes - ${selectedHospitalName}`}
          data={patientStatusData}
          type="bar"
          dataKey="value"
          xAxisKey="name"
          height={350}
          animated={true}
        />
      </div>

      {/* Additional info cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bed occupancy */}
        <Card className="health-card shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              Ocupação de Leitos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bedOccupancyData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-health-gradient rounded-full transition-all duration-1000" 
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12">{item.value}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Stock alerts */}
        <Card className="health-card shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Alertas de Stock
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {criticalResources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between p-3 bg-danger-red/10 rounded-lg animate-pulse">
                <div>
                  <p className="font-medium text-sm">{resource.name}</p>
                  <p className="text-xs text-muted-foreground">Estoque crítico</p>
                </div>
                <Badge variant="destructive">{resource.quantity} unidades</Badge>
              </div>
            ))}
            {lowResources.slice(0, 2).map((resource) => (
              <div key={resource.id} className="flex items-center justify-between p-3 bg-warning-amber/10 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{resource.name}</p>
                  <p className="text-xs text-muted-foreground">Estoque baixo</p>
                </div>
                <Badge variant="outline" className="border-warning-amber text-warning-amber">
                  {resource.quantity} unidades
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent activities */}
        <Card className="health-card shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {highSeverityDiseases.slice(0, 4).map((disease, index) => (
                <div key={disease.id} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 animate-pulse ${
                    disease.severity === 'high' ? 'bg-danger-red' : 'bg-warning-amber'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">Novo caso de {disease.name}</p>
                    <p className="text-xs text-muted-foreground">{disease.department} - {disease.lastUpdate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartCard } from '@/components/ChartCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, TrendingUp, MapPin, Activity, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Disease {
  id: string;
  name: string;
  cases: number;
  change: string;
  trend: 'up' | 'down';
  severity: 'high' | 'medium' | 'low';
  type: 'pandemic' | 'epidemic' | 'endemic';
}

const initialDiseases: Disease[] = [
  { id: '1', name: 'Malária', cases: 2456, change: '+12%', trend: 'up', severity: 'high', type: 'endemic' },
  { id: '2', name: 'Cólera', cases: 567, change: '+45%', trend: 'up', severity: 'high', type: 'epidemic' },
  { id: '3', name: 'Dengue', cases: 234, change: '+25%', trend: 'up', severity: 'medium', type: 'epidemic' },
  { id: '4', name: 'Sarampo', cases: 189, change: '+8%', trend: 'up', severity: 'medium', type: 'epidemic' },
  { id: '5', name: 'COVID-19', cases: 1234, change: '-15%', trend: 'down', severity: 'medium', type: 'pandemic' },
  { id: '6', name: 'Febre Amarela', cases: 123, change: '+3%', trend: 'up', severity: 'low', type: 'endemic' }
];

export function EpidemiologyPage() {
  const [diseases, setDiseases] = useState<Disease[]>(initialDiseases);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [newDisease, setNewDisease] = useState({
    name: '',
    cases: 0,
    change: '',
    trend: 'up' as 'up' | 'down',
    severity: 'low' as 'high' | 'medium' | 'low',
    type: 'endemic' as 'pandemic' | 'epidemic' | 'endemic'
  });

  const handleAddDisease = () => {
    const disease: Disease = {
      id: Date.now().toString(),
      ...newDisease
    };
    setDiseases([...diseases, disease]);
    setNewDisease({ name: '', cases: 0, change: '', trend: 'up', severity: 'low', type: 'endemic' });
    setIsAddModalOpen(false);
  };

  const handleEditDisease = () => {
    if (selectedDisease) {
      setDiseases(diseases.map(d => 
        d.id === selectedDisease.id ? selectedDisease : d
      ));
      setIsEditModalOpen(false);
      setSelectedDisease(null);
    }
  };

  const handleDeleteDisease = (id: string) => {
    setDiseases(diseases.filter(d => d.id !== id));
  };

  const pandemics = diseases.filter(d => d.type === 'pandemic');
  const epidemics = diseases.filter(d => d.type === 'epidemic');
  const endemics = diseases.filter(d => d.type === 'endemic');

  const chartData = diseases.map(disease => ({
    name: disease.name,
    value: disease.cases,
    change: parseFloat(disease.change.replace('%', '').replace('+', ''))
  }));

  const monthlyData = [
    { name: 'Jan', malaria: 1800, colera: 320, dengue: 180, sarampo: 150, covid: 1400, febre: 100 },
    { name: 'Fev', malaria: 2100, colera: 380, dengue: 200, sarampo: 160, covid: 1300, febre: 110 },
    { name: 'Mar', malaria: 2300, colera: 420, dengue: 220, sarampo: 170, covid: 1250, febre: 115 },
    { name: 'Abr', malaria: 2200, colera: 480, dengue: 210, sarampo: 180, covid: 1200, febre: 118 },
    { name: 'Mai', malaria: 2400, colera: 520, dengue: 230, sarampo: 185, covid: 1180, febre: 120 },
    { name: 'Jun', malaria: 2456, colera: 567, dengue: 234, sarampo: 189, covid: 1234, febre: 123 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Vigilância Epidemiológica Nacional</h1>
          <p className="text-muted-foreground mt-2">
            Monitoramento de surtos, epidemias e endemias em Angola
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-angola-gradient">
          <Plus className="w-4 h-4 mr-2" />
          Registrar Nova Doença
        </Button>
      </div>

      {/* Critical Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-l-4 border-l-danger-red health-card animate-pulse">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-danger-red" />
              <div>
                <h3 className="font-semibold text-danger-red">Surto de Cólera - Luanda</h3>
                <p className="text-sm text-muted-foreground">
                  +45% de casos nas últimas 2 semanas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-warning-amber health-card animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-warning-amber" />
              <div>
                <h3 className="font-semibold text-warning-amber">Malária em Alta - Benguela</h3>
                <p className="text-sm text-muted-foreground">
                  Época chuvosa contribui para aumento
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Disease Categories */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pandemic">Pandemias ({pandemics.length})</TabsTrigger>
          <TabsTrigger value="epidemic">Epidemias ({epidemics.length})</TabsTrigger>
          <TabsTrigger value="endemic">Endemias ({endemics.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {diseases.map((disease, index) => (
              <Card key={disease.id} className="health-card animate-fade-in hover-scale" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <div className={`w-3 h-3 rounded-full mx-auto ${
                      disease.severity === 'high' ? 'bg-danger-red animate-pulse' :
                      disease.severity === 'medium' ? 'bg-warning-amber' : 'bg-health-secondary'
                    }`} />
                    <h3 className="text-lg font-bold">{disease.cases}</h3>
                    <p className="text-sm text-muted-foreground">{disease.name}</p>
                    <Badge variant={disease.trend === 'up' ? 'destructive' : 'default'} className="text-xs">
                      {disease.change}
                    </Badge>
                    <div className="flex gap-1 mt-2">
                      <Button size="sm" variant="outline" onClick={() => { setSelectedDisease(disease); setIsViewModalOpen(true); }}>
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => { setSelectedDisease(disease); setIsEditModalOpen(true); }}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteDisease(disease.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pandemic">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pandemics.map((disease) => (
              <Card key={disease.id} className="health-card">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-bold">{disease.cases}</h3>
                    <p className="text-sm text-muted-foreground">{disease.name}</p>
                    <Badge variant="destructive">{disease.change}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="epidemic">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {epidemics.map((disease) => (
              <Card key={disease.id} className="health-card">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-bold">{disease.cases}</h3>
                    <p className="text-sm text-muted-foreground">{disease.name}</p>
                    <Badge variant={disease.trend === 'up' ? 'destructive' : 'default'}>{disease.change}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="endemic">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {endemics.map((disease) => (
              <Card key={disease.id} className="health-card">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-bold">{disease.cases}</h3>
                    <p className="text-sm text-muted-foreground">{disease.name}</p>
                    <Badge variant={disease.trend === 'up' ? 'destructive' : 'default'}>{disease.change}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Evolução Mensal - Principais Doenças"
          data={monthlyData}
          type="line"
          dataKey="malaria"
          xAxisKey="name"
        />
        <ChartCard
          title="Distribuição por Casos Ativos"
          data={chartData}
          type="pie"
          dataKey="value"
        />
      </div>

      {/* Add Disease Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Nova Doença</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome da Doença</Label>
              <Input
                id="name"
                value={newDisease.name}
                onChange={(e) => setNewDisease({...newDisease, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="cases">Número de Casos</Label>
              <Input
                id="cases"
                type="number"
                value={newDisease.cases}
                onChange={(e) => setNewDisease({...newDisease, cases: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="change">Variação (%)</Label>
              <Input
                id="change"
                value={newDisease.change}
                placeholder="+15%"
                onChange={(e) => setNewDisease({...newDisease, change: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="type">Tipo</Label>
              <Select value={newDisease.type} onValueChange={(value: any) => setNewDisease({...newDisease, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pandemic">Pandemia</SelectItem>
                  <SelectItem value="epidemic">Epidemia</SelectItem>
                  <SelectItem value="endemic">Endemia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="severity">Gravidade</Label>
              <Select value={newDisease.severity} onValueChange={(value: any) => setNewDisease({...newDisease, severity: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddDisease} className="w-full">
              Registrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Disease Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Doença</DialogTitle>
          </DialogHeader>
          {selectedDisease && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Nome da Doença</Label>
                <Input
                  id="edit-name"
                  value={selectedDisease.name}
                  onChange={(e) => setSelectedDisease({...selectedDisease, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-cases">Número de Casos</Label>
                <Input
                  id="edit-cases"
                  type="number"
                  value={selectedDisease.cases}
                  onChange={(e) => setSelectedDisease({...selectedDisease, cases: parseInt(e.target.value)})}
                />
              </div>
              <Button onClick={handleEditDisease} className="w-full">
                Salvar Alterações
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Disease Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da Doença</DialogTitle>
          </DialogHeader>
          {selectedDisease && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome</Label>
                  <p className="font-medium">{selectedDisease.name}</p>
                </div>
                <div>
                  <Label>Casos Ativos</Label>
                  <p className="font-medium">{selectedDisease.cases}</p>
                </div>
                <div>
                  <Label>Variação</Label>
                  <p className="font-medium">{selectedDisease.change}</p>
                </div>
                <div>
                  <Label>Tipo</Label>
                  <Badge>{selectedDisease.type}</Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Geographic Distribution */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Distribuição Geográfica - Casos Ativos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { province: 'Luanda', cases: 1245, risk: 'high', population: '8.3M' },
              { province: 'Benguela', cases: 567, risk: 'medium', population: '2.2M' },
              { province: 'Huambo', cases: 234, risk: 'low', population: '2.0M' },
              { province: 'Huíla', cases: 189, risk: 'low', population: '2.5M' },
              { province: 'Cabinda', cases: 123, risk: 'medium', population: '0.7M' },
              { province: 'Namibe', cases: 89, risk: 'low', population: '0.5M' }
            ].map((location, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{location.province}</h3>
                    <p className="text-sm text-muted-foreground">Pop: {location.population}</p>
                  </div>
                  <Badge variant={
                    location.risk === 'high' ? 'destructive' :
                    location.risk === 'medium' ? 'secondary' : 'default'
                  }>
                    {location.risk === 'high' ? 'Alto Risco' :
                     location.risk === 'medium' ? 'Médio Risco' : 'Baixo Risco'}
                  </Badge>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Casos ativos</span>
                    <span className="font-bold">{location.cases}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        location.risk === 'high' ? 'bg-danger-red' :
                        location.risk === 'medium' ? 'bg-warning-amber' : 'bg-health-secondary'
                      }`}
                      style={{ width: `${Math.min((location.cases / 1245) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: '14:30',
                event: 'Novo surto detectado',
                location: 'Luanda - Maianga',
                disease: 'Dengue',
                severity: 'high'
              },
              {
                time: '12:15',
                event: 'Alerta de tendência',
                location: 'Benguela',
                disease: 'Malária',
                severity: 'medium'
              },
              {
                time: '09:45',
                event: 'Relatório atualizado',
                location: 'Huambo',
                disease: 'Tuberculose',
                severity: 'low'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.severity === 'high' ? 'bg-danger-red' :
                  activity.severity === 'medium' ? 'bg-warning-amber' : 'bg-health-secondary'
                }`} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{activity.event}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.location} • {activity.disease}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

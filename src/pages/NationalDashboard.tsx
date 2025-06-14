import React, { useState } from 'react';
import { StatCard } from '@/components/StatCard';
import { ChartCard } from '@/components/ChartCard';
import { HospitalNavigator } from '@/components/HospitalNavigator';
import { SystemFeatures } from '@/components/SystemFeatures';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Activity, 
  Bed, 
  AlertTriangle,
  FileText,
  MapPin,
  BarChart3,
  Calendar
} from 'lucide-react';
import { useData } from '@/context/DataContext';

export function NationalDashboard() {
  const { getStatistics, getChartData } = useData();
  const [activeView, setActiveView] = useState<'overview' | 'hospitals' | 'features'>('overview');
  
  const stats = getStatistics('national');

  // Dados nacionais com cores únicas para cada doença
  const nationalDiseaseData = [
    { name: 'Malária', value: 75000, color: '#dc2626' },
    { name: 'Cólera', value: 16000, color: '#ea580c' },
    { name: 'Dengue', value: 9000, color: '#f59e0b' },
    { name: 'Sarampo', value: 4750, color: '#84cc16' },
    { name: 'Covid-19', value: 3500, color: '#06b6d4' },
    { name: 'Febre Amarela', value: 2000, color: '#8b5cf6' }
  ];

  // Estado dos pacientes a nível nacional com cores únicas para cada estado
  const nationalPatientData = [
    { name: 'Recuperado', value: 20, color: '#16a34a' },
    { name: 'Estável', value: 10, color: '#0891b2' },
    { name: 'Em Tratamento', value: 15, color: '#ca8a04' },
    { name: 'Grave', value: 5, color: '#ea580c' },
    { name: 'Crítico', value: 5, color: '#dc2626' },
    { name: 'Internado', value: 10, color: '#9333ea' },
    { name: 'Em Observação', value: 5, color: '#ec4899' }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'hospitals':
        return <HospitalNavigator />;
      case 'features':
        return <SystemFeatures />;
      default:
        return (
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total de Pacientes"
                value={stats.totalPatients.toString()}
                change="+8% vs mês anterior"
                changeType="positive"
                icon={Users}
              />
              <StatCard
                title="Casos Ativos Nacionais"
                value={stats.activeCases.toString()}
                change="+23 hoje"
                changeType="positive"
                icon={Bed}
              />
              <StatCard
                title="Surtos Registados"
                value={stats.totalCases.toString()}
                change="Em todo o território"
                changeType="neutral"
                icon={Activity}
              />
              <StatCard
                title="Alertas Críticos"
                value={stats.resources.toString()}
                change="Hospitais com necessidades"
                changeType="negative"
                icon={AlertTriangle}
                gradient="bg-gradient-to-r from-warning-amber to-danger-red"
              />
            </div>

            {/* Gráfico principal nacional - Surtos e Epidemias */}
            <div className="w-full">
              <ChartCard
                title="Surtos, Epidemias e Pandemias - Nacional"
                data={nationalDiseaseData}
                type="bar"
                dataKey="value"
                xAxisKey="name"
                height={400}
                animated={true}
              />
            </div>

            {/* Segundo gráfico nacional - Estado dos Pacientes */}
            <div className="w-full">
              <ChartCard
                title="Estado Atual dos Pacientes - Nacional"
                data={nationalPatientData}
                type="bar"
                dataKey="value"
                xAxisKey="name"
                height={350}
                animated={true}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Dashboard Nacional de Saúde</h1>
          <p className="text-muted-foreground mt-2">
            Visão geral do Sistema Nacional de Saúde de Angola
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Relatório Nacional
          </Button>
          <Button variant="outline" size="sm">
            <MapPin className="w-4 h-4 mr-2" />
            Mapa de Saúde
          </Button>
          <Button size="sm" className="bg-health-gradient">
            <BarChart3 className="w-4 h-4 mr-2" />
            Análise Avançada
          </Button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg">
        <Button
          variant={activeView === 'overview' ? 'secondary' : 'ghost'}
          onClick={() => setActiveView('overview')}
          className="flex-1"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Visão Geral
        </Button>
        <Button
          variant={activeView === 'hospitals' ? 'secondary' : 'ghost'}
          onClick={() => setActiveView('hospitals')}
          className="flex-1"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Hospitais
        </Button>
        <Button
          variant={activeView === 'features' ? 'secondary' : 'ghost'}
          onClick={() => setActiveView('features')}
          className="flex-1"
        >
          <FileText className="w-4 h-4 mr-2" />
          Funcionalidades
        </Button>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
}

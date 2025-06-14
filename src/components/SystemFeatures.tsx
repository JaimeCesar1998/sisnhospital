
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Bell, 
  FileText, 
  Users, 
  Truck, 
  Calendar,
  BarChart3,
  Globe,
  Phone,
  Wifi,
  Database
} from 'lucide-react';

export function SystemFeatures() {
  const missingFeatures = [
    {
      category: 'Segurança e Controlo',
      features: [
        { name: 'Sistema de Backup Automático', icon: Database, status: 'missing', priority: 'high' },
        { name: 'Controlo de Acesso por Níveis', icon: Shield, status: 'partial', priority: 'high' },
        { name: 'Auditoria de Ações', icon: FileText, status: 'missing', priority: 'medium' }
      ]
    },
    {
      category: 'Comunicação e Alertas',
      features: [
        { name: 'Sistema de Notificações Push', icon: Bell, status: 'basic', priority: 'high' },
        { name: 'Comunicação Inter-hospitalar', icon: Phone, status: 'missing', priority: 'high' },
        { name: 'Alertas de Emergência Nacional', icon: Globe, status: 'missing', priority: 'critical' }
      ]
    },
    {
      category: 'Gestão de Recursos',
      features: [
        { name: 'Transferência de Pacientes', icon: Truck, status: 'basic', priority: 'high' },
        { name: 'Gestão de Equipamentos', icon: Users, status: 'missing', priority: 'medium' },
        { name: 'Planeamento de Recursos', icon: Calendar, status: 'missing', priority: 'medium' }
      ]
    },
    {
      category: 'Análise e Relatórios',
      features: [
        { name: 'Relatórios Automatizados', icon: BarChart3, status: 'basic', priority: 'medium' },
        { name: 'Previsão Epidemiológica', icon: Globe, status: 'missing', priority: 'high' },
        { name: 'Análise Preditiva', icon: BarChart3, status: 'missing', priority: 'low' }
      ]
    },
    {
      category: 'Conectividade',
      features: [
        { name: 'Sincronização Offline', icon: Wifi, status: 'missing', priority: 'critical' },
        { name: 'API Externa OMS', icon: Globe, status: 'missing', priority: 'medium' },
        { name: 'Integração com Laboratórios', icon: Database, status: 'missing', priority: 'high' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'missing': return 'bg-red-500';
      case 'partial': return 'bg-yellow-500';
      case 'basic': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-600 text-red-600';
      case 'high': return 'border-orange-500 text-orange-600';
      case 'medium': return 'border-yellow-500 text-yellow-600';
      case 'low': return 'border-green-500 text-green-600';
      default: return 'border-gray-500 text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'missing': return 'Em Falta';
      case 'partial': return 'Parcial';
      case 'basic': return 'Básico';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Funcionalidades do Sistema</h2>
          <p className="text-muted-foreground mt-2">
            Análise de funcionalidades implementadas e em falta
          </p>
        </div>
        <Button className="bg-health-gradient">
          <FileText className="w-4 h-4 mr-2" />
          Relatório Completo
        </Button>
      </div>

      <div className="grid gap-6">
        {missingFeatures.map((category) => (
          <Card key={category.category} className="health-card shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.features.map((feature) => (
                  <div 
                    key={feature.name} 
                    className="p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(feature.status)}`} />
                      <feature.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">{feature.name}</h4>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {getStatusLabel(feature.status)}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getPriorityColor(feature.priority)}`}
                        >
                          {feature.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <Card className="health-card shadow-lg border-l-4 border-l-health-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Resumo do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">8</div>
              <div className="text-sm text-muted-foreground">Em Falta</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <div className="text-sm text-muted-foreground">Parciais</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-muted-foreground">Básicas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-health-primary">62%</div>
              <div className="text-sm text-muted-foreground">Completude</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

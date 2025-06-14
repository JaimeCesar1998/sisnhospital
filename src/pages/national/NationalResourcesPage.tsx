
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartCard } from '@/components/ChartCard';
import { Package, Truck, AlertTriangle, TrendingUp, Send } from 'lucide-react';

export function NationalResourcesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Recursos Nacionais</h1>
          <p className="text-muted-foreground mt-2">
            Gestão centralizada de recursos e distribuição
          </p>
        </div>
        <Button size="sm" className="bg-health-gradient">
          <Send className="w-4 h-4 mr-2" />
          Nova Distribuição
        </Button>
      </div>

      {/* National Stock Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-health-primary" />
              <div>
                <h3 className="text-2xl font-bold">2,450</h3>
                <p className="text-sm text-muted-foreground">Medicamentos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-health-secondary" />
              <div>
                <h3 className="text-2xl font-bold">156</h3>
                <p className="text-sm text-muted-foreground">Equipamentos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold">89%</h3>
              <p className="text-sm text-muted-foreground">Cobertura Nacional</p>
            </div>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-danger-red">23</h3>
              <p className="text-sm text-muted-foreground">Alertas Críticos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="distribution" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="distribution">Distribuição</TabsTrigger>
          <TabsTrigger value="requests">Requisições</TabsTrigger>
          <TabsTrigger value="logistics">Logística</TabsTrigger>
        </TabsList>

        <TabsContent value="distribution" className="space-y-6">
          {/* Distribution Chart */}
          <ChartCard
            title="Distribuição Mensal de Recursos"
            data={[
              { name: 'Jan', medicines: 1200, equipment: 45 },
              { name: 'Fev', medicines: 1450, equipment: 52 },
              { name: 'Mar', medicines: 1680, equipment: 48 },
              { name: 'Abr', medicines: 1890, equipment: 65 },
              { name: 'Mai', medicines: 2100, equipment: 78 },
              { name: 'Jun', medicines: 2450, equipment: 89 }
            ]}
            type="line"
            dataKey="medicines"
            xAxisKey="name"
          />

          {/* Recent Distributions */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Distribuições Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    destination: 'Hospital Central Luanda',
                    items: 'Paracetamol 500mg x 1000',
                    date: '2024-06-12',
                    status: 'delivered',
                    priority: 'urgent'
                  },
                  {
                    destination: 'Hospital de Benguela',
                    items: 'Ventilador x 2',
                    date: '2024-06-11',
                    status: 'transit',
                    priority: 'normal'
                  },
                  {
                    destination: 'Hospital do Huambo',
                    items: 'Insulina NPH x 50',
                    date: '2024-06-10',
                    status: 'delivered',
                    priority: 'urgent'
                  }
                ].map((distribution, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Package className="w-6 h-6 text-health-primary" />
                      <div>
                        <h3 className="font-semibold">{distribution.destination}</h3>
                        <p className="text-sm text-muted-foreground">{distribution.items}</p>
                        <p className="text-xs text-muted-foreground">{distribution.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={distribution.priority === 'urgent' ? 'destructive' : 'default'}>
                        {distribution.priority === 'urgent' ? 'Urgente' : 'Normal'}
                      </Badge>
                      <Badge variant={
                        distribution.status === 'delivered' ? 'default' :
                        distribution.status === 'transit' ? 'secondary' : 'destructive'
                      }>
                        {distribution.status === 'delivered' ? 'Entregue' :
                         distribution.status === 'transit' ? 'Em Trânsito' : 'Pendente'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Requisições Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    hospital: 'Hospital Américo Boavida',
                    request: 'Seringas 5ml x 2000',
                    urgency: 'high',
                    date: '2024-06-12',
                    reason: 'Stock crítico'
                  },
                  {
                    hospital: 'Hospital de Cabinda',
                    request: 'Monitor Cardíaco x 1',
                    urgency: 'medium',
                    date: '2024-06-11',
                    reason: 'Substituição equipamento'
                  },
                  {
                    hospital: 'Hospital do Namibe',
                    request: 'Insulina NPH x 30',
                    urgency: 'high',
                    date: '2024-06-10',
                    reason: 'Aumento demanda'
                  }
                ].map((request, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <AlertTriangle className={`w-6 h-6 ${
                        request.urgency === 'high' ? 'text-danger-red' : 'text-warning-amber'
                      }`} />
                      <div>
                        <h3 className="font-semibold">{request.hospital}</h3>
                        <p className="text-sm text-muted-foreground">{request.request}</p>
                        <p className="text-xs text-muted-foreground">
                          {request.reason} • {request.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">Recusar</Button>
                      <Button size="sm" className="bg-health-gradient">Aprovar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logistics" className="space-y-6">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Veículos em Rota
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    vehicle: 'Camião LOG-001',
                    route: 'Luanda → Benguela',
                    cargo: 'Medicamentos variados',
                    eta: '2h 30min',
                    progress: 65
                  },
                  {
                    vehicle: 'Ambulância LOG-005',
                    route: 'Huambo → Namibe',
                    cargo: 'Equipamento médico',
                    eta: '4h 15min',
                    progress: 25
                  }
                ].map((vehicle, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Truck className="w-6 h-6 text-health-primary" />
                      <div>
                        <h3 className="font-semibold">{vehicle.vehicle}</h3>
                        <p className="text-sm text-muted-foreground">{vehicle.route}</p>
                        <p className="text-xs text-muted-foreground">{vehicle.cargo}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">ETA: {vehicle.eta}</div>
                      <div className="w-24 h-2 bg-muted rounded-full mt-1">
                        <div 
                          className="h-2 bg-health-gradient rounded-full" 
                          style={{ width: `${vehicle.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{vehicle.progress}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

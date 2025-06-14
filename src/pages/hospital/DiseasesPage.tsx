import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChartCard } from '@/components/ChartCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, TrendingUp, Bell, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData, Disease } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function DiseasesPage() {
  const { diseases, addDisease, updateDisease, deleteDisease, getDiseasesByHospital } = useData();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const hospitalDiseases = user?.hospitalId ? getDiseasesByHospital(user.hospitalId) : diseases;
  
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [newDisease, setNewDisease] = useState({
    name: '',
    cases: 0,
    trend: '',
    severity: 'low' as 'high' | 'medium' | 'low',
    department: '',
    lastUpdate: 'Agora',
    type: 'outbreak' as 'outbreak' | 'epidemic' | 'pandemic' | 'endemic'
  });

  const handleAddDisease = () => {
    const disease = {
      ...newDisease,
      hospitalId: user?.hospitalId || '',
      lastUpdate: 'Agora'
    };
    addDisease(disease);
    setNewDisease({ name: '', cases: 0, trend: '', severity: 'low', department: '', lastUpdate: 'Agora', type: 'outbreak' });
    setIsAddModalOpen(false);
    toast({
      title: "Doença registrada",
      description: `${disease.name} foi adicionada com sucesso.`,
    });
  };

  const handleEditDisease = () => {
    if (selectedDisease) {
      updateDisease(selectedDisease.id, selectedDisease);
      setIsEditModalOpen(false);
      setSelectedDisease(null);
      toast({
        title: "Doença atualizada",
        description: "As informações foram atualizadas com sucesso.",
      });
    }
  };

  const handleDeleteDisease = (id: string) => {
    deleteDisease(id);
    toast({
      title: "Doença removida",
      description: "A doença foi removida do sistema.",
      variant: "destructive",
    });
  };

  const highSeverity = hospitalDiseases.filter(d => d.severity === 'high');
  const mediumSeverity = hospitalDiseases.filter(d => d.severity === 'medium');
  const lowSeverity = hospitalDiseases.filter(d => d.severity === 'low');

  const monthlyData = [
    { name: 'Jan', ...generateMonthlyData(hospitalDiseases, 0.7) },
    { name: 'Fev', ...generateMonthlyData(hospitalDiseases, 0.8) },
    { name: 'Mar', ...generateMonthlyData(hospitalDiseases, 0.9) },
    { name: 'Abr', ...generateMonthlyData(hospitalDiseases, 0.95) },
    { name: 'Mai', ...generateMonthlyData(hospitalDiseases, 0.98) },
    { name: 'Jun', ...generateMonthlyData(hospitalDiseases, 1.0) }
  ];

  function generateMonthlyData(diseases: Disease[], multiplier: number) {
    const data: any = {};
    diseases.slice(0, 6).forEach((disease, index) => {
      const key = disease.name.toLowerCase().replace(/\s+/g, '').replace(/[^\w]/g, '');
      data[key] = Math.round(disease.cases * multiplier);
    });
    return data;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Gestão de Doenças - {user?.hospitalName}</h1>
          <p className="text-muted-foreground mt-2">
            Monitoramento específico de doenças e casos ativos no hospital
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Alertas
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-health-gradient">
            <Plus className="w-4 h-4 mr-2" />
            Registrar Caso
          </Button>
        </div>
      </div>

      {/* Alert Cards */}
      {highSeverity.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highSeverity.slice(0, 2).map((disease, index) => (
            <Card key={disease.id} className="border-l-4 border-l-danger-red health-card animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-danger-red" />
                  <div>
                    <h3 className="font-semibold text-danger-red">Surto de {disease.name} - {disease.department}</h3>
                    <p className="text-sm text-muted-foreground">
                      {disease.trend} novos casos hoje
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tabs for Severity */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todas ({hospitalDiseases.length})</TabsTrigger>
          <TabsTrigger value="high">Alta ({highSeverity.length})</TabsTrigger>
          <TabsTrigger value="medium">Média ({mediumSeverity.length})</TabsTrigger>
          <TabsTrigger value="low">Baixa ({lowSeverity.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {hospitalDiseases.map((disease, index) => (
              <Card key={disease.id} className="health-card animate-fade-in hover-scale" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm">{disease.name}</h3>
                        <p className="text-xs text-muted-foreground">{disease.department}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        disease.severity === 'high' ? 'bg-danger-red animate-pulse' :
                        disease.severity === 'medium' ? 'bg-warning-amber' : 'bg-health-secondary'
                      }`} />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{disease.cases}</p>
                      <p className="text-xs text-muted-foreground">casos ativos</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant={disease.trend.includes('+') ? 'destructive' : 'default'} className="text-xs">
                        {disease.trend}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{disease.lastUpdate}</span>
                    </div>
                    <div className="flex gap-1">
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

        <TabsContent value="high">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {highSeverity.map((disease) => (
              <Card key={disease.id} className="health-card border-l-4 border-l-danger-red">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{disease.name}</h3>
                    <p className="text-2xl font-bold">{disease.cases} casos</p>
                    <Badge variant="destructive">{disease.trend}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="medium">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mediumSeverity.map((disease) => (
              <Card key={disease.id} className="health-card border-l-4 border-l-warning-amber">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{disease.name}</h3>
                    <p className="text-2xl font-bold">{disease.cases} casos</p>
                    <Badge variant="secondary">{disease.trend}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="low">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lowSeverity.map((disease) => (
              <Card key={disease.id} className="health-card border-l-4 border-l-health-secondary">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{disease.name}</h3>
                    <p className="text-2xl font-bold">{disease.cases} casos</p>
                    <Badge variant="outline">{disease.trend}</Badge>
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
          title="Evolução Mensal das Principais Doenças"
          data={monthlyData}
          type="line"
          dataKey={hospitalDiseases[0]?.name.toLowerCase().replace(/\s+/g, '').replace(/[^\w]/g, '') || 'disease'}
          xAxisKey="name"
        />
        <ChartCard
          title="Distribuição por Gravidade"
          data={[
            { name: 'Alta', value: highSeverity.length },
            { name: 'Média', value: mediumSeverity.length },
            { name: 'Baixa', value: lowSeverity.length }
          ]}
          type="pie"
          dataKey="value"
        />
      </div>

      {/* Modals */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Novo Caso</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="disease-name">Nome da Doença</Label>
              <Input
                id="disease-name"
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
              <Label htmlFor="department">Departamento</Label>
              <Input
                id="department"
                value={newDisease.department}
                onChange={(e) => setNewDisease({...newDisease, department: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="trend">Tendência (%)</Label>
              <Input
                id="trend"
                value={newDisease.trend}
                placeholder="ex: +15%"
                onChange={(e) => setNewDisease({...newDisease, trend: e.target.value})}
              />
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
            <div>
              <Label htmlFor="type">Classificação</Label>
              <Select value={newDisease.type} onValueChange={(value: any) => setNewDisease({...newDisease, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outbreak">Surto</SelectItem>
                  <SelectItem value="epidemic">Epidemia</SelectItem>
                  <SelectItem value="pandemic">Pandemia</SelectItem>
                  <SelectItem value="endemic">Endêmico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddDisease} className="w-full">
              Registrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Doença</DialogTitle>
          </DialogHeader>
          {selectedDisease && (
            <div className="space-y-4">
              <div>
                <Label>Casos Ativos</Label>
                <Input
                  type="number"
                  value={selectedDisease.cases}
                  onChange={(e) => setSelectedDisease({...selectedDisease, cases: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label>Departamento</Label>
                <Input
                  value={selectedDisease.department}
                  onChange={(e) => setSelectedDisease({...selectedDisease, department: e.target.value})}
                />
              </div>
              <Button onClick={handleEditDisease} className="w-full">
                Salvar Alterações
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
                  <Label>Departamento</Label>
                  <p className="font-medium">{selectedDisease.department}</p>
                </div>
                <div>
                  <Label>Última Atualização</Label>
                  <p className="font-medium">{selectedDisease.lastUpdate}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

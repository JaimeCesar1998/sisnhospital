
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChartCard } from '@/components/ChartCard';
import { Target, TrendingUp, Calendar, CheckCircle, Clock, Users, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialPlans = [
  {
    id: '1',
    title: 'Expansão da Rede Hospitalar',
    description: 'Construção de 12 novos hospitais provinciais',
    progress: 65,
    deadline: '2024-12-31',
    status: 'active',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Campanha Nacional de Vacinação',
    description: 'Vacinação contra Malária e Dengue',
    progress: 89,
    deadline: '2024-08-30',
    status: 'active',
    priority: 'urgent'
  },
  {
    id: '3',
    title: 'Modernização de Equipamentos',
    description: 'Atualização tecnológica dos hospitais centrais',
    progress: 42,
    deadline: '2025-03-15',
    status: 'active',
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Formação de Pessoal Médico',
    description: 'Capacitação de 500 profissionais de saúde',
    progress: 100,
    deadline: '2024-06-01',
    status: 'completed',
    priority: 'high'
  }
];

export function StrategicPlanningPage() {
  const [plans, setPlans] = useState(initialPlans);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium'
  });
  const { toast } = useToast();

  const handleNewPlan = () => {
    setIsAddModalOpen(true);
  };

  const handleAddPlan = () => {
    const plan = {
      ...newPlan,
      id: Date.now().toString(),
      progress: 0,
      status: 'active'
    };
    setPlans([...plans, plan]);
    setNewPlan({ title: '', description: '', deadline: '', priority: 'medium' });
    setIsAddModalOpen(false);
    toast({
      title: "Plano criado",
      description: "Novo plano estratégico adicionado com sucesso",
    });
  };

  const handleEditPlan = (plan: any) => {
    setSelectedPlan({...plan});
    setIsEditModalOpen(true);
  };

  const handleSavePlan = () => {
    setPlans(plans.map(p => p.id === selectedPlan.id ? selectedPlan : p));
    setIsEditModalOpen(false);
    toast({
      title: "Plano atualizado",
      description: "As alterações foram salvas com sucesso",
    });
  };

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter(p => p.id !== id));
    toast({
      title: "Plano removido",
      description: "O plano foi excluído com sucesso",
    });
  };

  const handleViewDetails = (plan: any) => {
    setSelectedPlan(plan);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Planejamento Estratégico</h1>
          <p className="text-muted-foreground mt-2">
            Planos e metas para o sistema nacional de saúde
          </p>
        </div>
        <Button size="sm" className="bg-health-gradient" onClick={handleNewPlan}>
          <Target className="w-4 h-4 mr-2" />
          Novo Plano
        </Button>
      </div>

      {/* Strategic Goals */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-health-primary" />
              <div>
                <h3 className="text-2xl font-bold">95%</h3>
                <p className="text-sm text-muted-foreground">Cobertura Meta 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-health-secondary" />
              <div>
                <h3 className="text-2xl font-bold">2.5M</h3>
                <p className="text-sm text-muted-foreground">Pacientes Meta</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-sm text-muted-foreground">Novos Hospitais</p>
            </div>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold">78%</h3>
              <p className="text-sm text-muted-foreground">Progresso Atual</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <ChartCard
        title="Progresso das Metas Estratégicas 2024"
        data={[
          { name: 'Jan', planned: 65, actual: 62 },
          { name: 'Fev', planned: 68, actual: 65 },
          { name: 'Mar', planned: 71, actual: 69 },
          { name: 'Abr', planned: 74, actual: 72 },
          { name: 'Mai', planned: 77, actual: 75 },
          { name: 'Jun', planned: 80, actual: 78 }
        ]}
        type="line"
        dataKey="actual"
        xAxisKey="name"
      />

      {/* Active Plans */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle>Planos Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plans.map((plan, index) => (
              <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    plan.status === 'completed' ? 'bg-health-secondary' :
                    plan.priority === 'urgent' ? 'bg-danger-red' :
                    plan.priority === 'high' ? 'bg-warning-amber' : 'bg-health-primary'
                  }`} />
                  <div className="flex-1">
                    <h3 className="font-semibold">{plan.title}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs text-muted-foreground">{plan.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div 
                            className={`h-2 rounded-full ${
                              plan.status === 'completed' ? 'bg-health-secondary' : 'bg-health-primary'
                            }`}
                            style={{ width: `${plan.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{plan.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge variant={
                    plan.status === 'completed' ? 'default' :
                    plan.priority === 'urgent' ? 'destructive' :
                    plan.priority === 'high' ? 'secondary' : 'outline'
                  }>
                    {plan.status === 'completed' ? 'Concluído' :
                     plan.priority === 'urgent' ? 'Urgente' :
                     plan.priority === 'high' ? 'Alta' : 'Média'}
                  </Badge>
                  
                  {plan.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-health-secondary" />
                  ) : (
                    <Clock className="w-5 h-5 text-warning-amber" />
                  )}
                  
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => handleViewDetails(plan)}>
                      Ver Detalhes
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditPlan(plan)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeletePlan(plan.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Milestones */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Próximos Marcos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { milestone: 'Inauguração Hospital de Huíla', date: '2024-07-15', priority: 'high' },
              { milestone: 'Conclusão Campanha Vacinação Luanda', date: '2024-07-30', priority: 'urgent' },
              { milestone: 'Entrega Equipamentos Benguela', date: '2024-08-10', priority: 'medium' },
              { milestone: 'Início Formação Pessoal Cabinda', date: '2024-08-20', priority: 'medium' }
            ].map((milestone, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    milestone.priority === 'urgent' ? 'bg-danger-red' :
                    milestone.priority === 'high' ? 'bg-warning-amber' : 'bg-health-primary'
                  }`} />
                  <div>
                    <p className="font-medium">{milestone.milestone}</p>
                    <p className="text-sm text-muted-foreground">{milestone.date}</p>
                  </div>
                </div>
                <Badge variant={
                  milestone.priority === 'urgent' ? 'destructive' :
                  milestone.priority === 'high' ? 'secondary' : 'default'
                }>
                  {milestone.priority === 'urgent' ? 'Urgente' :
                   milestone.priority === 'high' ? 'Alta' : 'Média'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Plan Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Plano Estratégico</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Título do Plano</Label>
              <Input
                value={newPlan.title}
                onChange={(e) => setNewPlan({...newPlan, title: e.target.value})}
                placeholder="Ex: Expansão da Rede Hospitalar"
              />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea
                value={newPlan.description}
                onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                placeholder="Descreva os objetivos e metas do plano..."
              />
            </div>
            <div>
              <Label>Data Limite</Label>
              <Input
                type="date"
                value={newPlan.deadline}
                onChange={(e) => setNewPlan({...newPlan, deadline: e.target.value})}
              />
            </div>
            <div>
              <Label>Prioridade</Label>
              <select 
                className="w-full p-2 border rounded"
                value={newPlan.priority}
                onChange={(e) => setNewPlan({...newPlan, priority: e.target.value})}
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddPlan} className="flex-1">
                Criar Plano
              </Button>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Plan Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Plano</DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <div className="space-y-4">
              <div>
                <Label>Título</Label>
                <Input
                  value={selectedPlan.title}
                  onChange={(e) => setSelectedPlan({...selectedPlan, title: e.target.value})}
                />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={selectedPlan.description}
                  onChange={(e) => setSelectedPlan({...selectedPlan, description: e.target.value})}
                />
              </div>
              <div>
                <Label>Progresso (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={selectedPlan.progress}
                  onChange={(e) => setSelectedPlan({...selectedPlan, progress: parseInt(e.target.value)})}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSavePlan} className="flex-1">
                  Salvar Alterações
                </Button>
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Plano</DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedPlan.title}</h3>
                <p className="text-muted-foreground">{selectedPlan.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Progresso</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-muted rounded-full">
                      <div 
                        className="h-2 bg-health-primary rounded-full"
                        style={{ width: `${selectedPlan.progress}%` }}
                      />
                    </div>
                    <span className="text-sm">{selectedPlan.progress}%</span>
                  </div>
                </div>
                <div>
                  <Label>Data Limite</Label>
                  <p className="mt-1">{selectedPlan.deadline}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className="mt-1">
                    {selectedPlan.status === 'completed' ? 'Concluído' : 'Ativo'}
                  </Badge>
                </div>
                <div>
                  <Label>Prioridade</Label>
                  <Badge variant={
                    selectedPlan.priority === 'urgent' ? 'destructive' :
                    selectedPlan.priority === 'high' ? 'secondary' : 'default'
                  } className="mt-1">
                    {selectedPlan.priority === 'urgent' ? 'Urgente' :
                     selectedPlan.priority === 'high' ? 'Alta' :
                     selectedPlan.priority === 'medium' ? 'Média' : 'Baixa'}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => setIsViewModalOpen(false)} className="flex-1">
                  Fechar
                </Button>
                <Button variant="outline" onClick={() => {
                  setIsViewModalOpen(false);
                  handleEditPlan(selectedPlan);
                }}>
                  Editar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

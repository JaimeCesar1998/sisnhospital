import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChartCard } from '@/components/ChartCard';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { Hospital, MapPin, Users, TrendingUp, Eye, Edit, Plus, Settings, FileText, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const hospitalData = [
  { name: 'Hospital Central Luanda', patients: 1234, capacity: 85, status: 'good', location: 'Luanda', id: '1' },
  { name: 'Hospital Américo Boavida', patients: 987, capacity: 92, status: 'warning', location: 'Luanda', id: '2' },
  { name: 'Hospital do Bengo', patients: 456, capacity: 67, status: 'good', location: 'Bengo', id: '3' },
  { name: 'Hospital de Benguela', patients: 678, capacity: 78, status: 'good', location: 'Benguela', id: '4' }
];

const nationalStats = [
  { name: 'Jan', hospitals: 45, patients: 12000 },
  { name: 'Fev', hospitals: 46, patients: 13500 },
  { name: 'Mar', hospitals: 47, patients: 14200 },
  { name: 'Abr', hospitals: 48, patients: 15800 },
  { name: 'Mai', hospitals: 49, patients: 16900 },
  { name: 'Jun', hospitals: 50, patients: 18500 }
];

export function NationalSupervisionPage() {
  const [hospitals, setHospitals] = useState(hospitalData);
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [hospitalToDelete, setHospitalToDelete] = useState<any>(null);
  const [newHospital, setNewHospital] = useState({
    name: '',
    location: '',
    patients: 0,
    capacity: 0,
    status: 'good'
  });
  const { toast } = useToast();

  const handleViewDetails = (hospital: any) => {
    setSelectedHospital(hospital);
    setIsViewModalOpen(true);
    toast({
      title: "Hospital selecionado",
      description: `Visualizando detalhes do ${hospital.name}`,
    });
  };

  const handleEditHospital = (hospital: any) => {
    setSelectedHospital({...hospital});
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    setHospitals(hospitals.map(h => 
      h.id === selectedHospital.id ? selectedHospital : h
    ));
    setIsEditModalOpen(false);
    toast({
      title: "Hospital atualizado",
      description: "As informações foram salvas com sucesso",
    });
  };

  const handleAddHospital = () => {
    const hospital = {
      ...newHospital,
      id: Date.now().toString()
    };
    setHospitals([...hospitals, hospital]);
    setNewHospital({ name: '', location: '', patients: 0, capacity: 0, status: 'good' });
    setIsAddModalOpen(false);
    toast({
      title: "Hospital cadastrado",
      description: "Novo hospital adicionado com sucesso",
    });
  };

  const handleInteractiveMap = () => {
    setIsMapModalOpen(true);
    toast({
      title: "Mapa Interativo",
      description: "Carregando visualização geográfica dos hospitais",
    });
  };

  const handleNationalReport = () => {
    setIsReportModalOpen(true);
    toast({
      title: "Relatório Nacional",
      description: "Gerando relatório consolidado do sistema",
    });
  };

  const handleDeleteHospital = (hospital: any) => {
    setHospitalToDelete(hospital);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteHospital = () => {
    if (hospitalToDelete) {
      setHospitals(hospitals.filter(h => h.id !== hospitalToDelete.id));
      setIsDeleteModalOpen(false);
      setHospitalToDelete(null);
      toast({
        title: "Hospital eliminado",
        description: `${hospitalToDelete.name} foi removido do sistema`,
        variant: "destructive"
      });
    }
  };

  const cancelDeleteHospital = () => {
    setIsDeleteModalOpen(false);
    setHospitalToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Supervisão Nacional</h1>
          <p className="text-muted-foreground mt-2">
            Monitoramento geral de todos os hospitais do país
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleInteractiveMap}>
            <MapPin className="w-4 h-4 mr-2" />
            Mapa Interativo
          </Button>
          <Button size="sm" className="bg-angola-gradient" onClick={handleNationalReport}>
            <FileText className="w-4 h-4 mr-2" />
            Relatório Nacional
          </Button>
        </div>
      </div>

      {/* National Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Hospital className="w-8 h-8 text-health-primary" />
              <div>
                <h3 className="text-2xl font-bold">50</h3>
                <p className="text-sm text-muted-foreground">Hospitais Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-health-secondary" />
              <div>
                <h3 className="text-2xl font-bold">18,500</h3>
                <p className="text-sm text-muted-foreground">Pacientes Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold">82%</h3>
              <p className="text-sm text-muted-foreground">Ocupação Média</p>
            </div>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold">3</h3>
              <p className="text-sm text-muted-foreground">Alertas Ativos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Evolução Nacional - Hospitais e Pacientes"
          data={nationalStats}
          type="line"
          dataKey="patients"
          xAxisKey="name"
        />
        <ChartCard
          title="Distribuição por Província"
          data={[
            { name: 'Luanda', value: 45 },
            { name: 'Benguela', value: 20 },
            { name: 'Huambo', value: 15 },
            { name: 'Outras', value: 20 }
          ]}
          type="pie"
          dataKey="value"
        />
      </div>

      {/* Hospitals List */}
      <Card className="health-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Hospitais Registados</CardTitle>
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-health-gradient">
            <Plus className="w-4 h-4 mr-1" />
            Cadastrar Hospital
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hospitals.map((hospital, index) => (
              <div key={hospital.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Hospital className="w-6 h-6 text-health-primary" />
                  <div>
                    <h3 className="font-semibold">{hospital.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {hospital.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {hospital.patients} pacientes
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">Ocupação: {hospital.capacity}%</div>
                    <div className="w-20 h-2 bg-muted rounded-full mt-1">
                      <div 
                        className={`h-2 rounded-full ${
                          hospital.capacity > 90 ? 'bg-danger-red' :
                          hospital.capacity > 80 ? 'bg-warning-amber' : 'bg-health-secondary'
                        }`}
                        style={{ width: `${hospital.capacity}%` }}
                      />
                    </div>
                  </div>
                  <Badge variant={
                    hospital.status === 'good' ? 'default' :
                    hospital.status === 'warning' ? 'secondary' : 'destructive'
                  }>
                    {hospital.status === 'good' ? 'Normal' :
                     hospital.status === 'warning' ? 'Atenção' : 'Crítico'}
                  </Badge>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => handleViewDetails(hospital)}>
                      <Eye className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditHospital(hospital)}>
                      <Edit className="w-3 h-3 mr-1" />
                      Editar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDeleteHospital(hospital)}
                      className="text-danger-red hover:bg-danger-red hover:text-white"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Hospital</DialogTitle>
          </DialogHeader>
          {selectedHospital && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome do Hospital</Label>
                  <p className="font-medium">{selectedHospital.name}</p>
                </div>
                <div>
                  <Label>Localização</Label>
                  <p className="font-medium">{selectedHospital.location}</p>
                </div>
                <div>
                  <Label>Pacientes Ativos</Label>
                  <p className="font-medium">{selectedHospital.patients}</p>
                </div>
                <div>
                  <Label>Capacidade</Label>
                  <p className="font-medium">{selectedHospital.capacity}%</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Serviços Disponíveis</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['Emergência', 'Internamento', 'Cirurgia', 'Maternidade', 'Pediatria', 'Cardiologia'].map(service => (
                    <div key={service} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-health-secondary rounded-full" />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => setIsViewModalOpen(false)}>Fechar</Button>
                <Button variant="outline" onClick={() => {
                  setIsViewModalOpen(false);
                  handleEditHospital(selectedHospital);
                }}>
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Hospital Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Hospital</DialogTitle>
          </DialogHeader>
          {selectedHospital && (
            <div className="space-y-4">
              <div>
                <Label>Nome do Hospital</Label>
                <Input
                  value={selectedHospital.name}
                  onChange={(e) => setSelectedHospital({...selectedHospital, name: e.target.value})}
                />
              </div>
              <div>
                <Label>Localização</Label>
                <Input
                  value={selectedHospital.location}
                  onChange={(e) => setSelectedHospital({...selectedHospital, location: e.target.value})}
                />
              </div>
              <div>
                <Label>Número de Pacientes</Label>
                <Input
                  type="number"
                  value={selectedHospital.patients}
                  onChange={(e) => setSelectedHospital({...selectedHospital, patients: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label>Capacidade (%)</Label>
                <Input
                  type="number"
                  value={selectedHospital.capacity}
                  onChange={(e) => setSelectedHospital({...selectedHospital, capacity: parseInt(e.target.value)})}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveEdit} className="flex-1">
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

      {/* Add Hospital Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Hospital</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nome do Hospital</Label>
              <Input
                value={newHospital.name}
                onChange={(e) => setNewHospital({...newHospital, name: e.target.value})}
                placeholder="Ex: Hospital Central de..."
              />
            </div>
            <div>
              <Label>Localização</Label>
              <Input
                value={newHospital.location}
                onChange={(e) => setNewHospital({...newHospital, location: e.target.value})}
                placeholder="Ex: Luanda, Benguela..."
              />
            </div>
            <div>
              <Label>Número de Pacientes</Label>
              <Input
                type="number"
                value={newHospital.patients}
                onChange={(e) => setNewHospital({...newHospital, patients: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label>Capacidade (%)</Label>
              <Input
                type="number"
                value={newHospital.capacity}
                onChange={(e) => setNewHospital({...newHospital, capacity: parseInt(e.target.value)})}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddHospital} className="flex-1">
                Cadastrar Hospital
              </Button>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Interactive Map Modal */}
      <Dialog open={isMapModalOpen} onOpenChange={setIsMapModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Mapa Interativo - Hospitais de Angola</DialogTitle>
          </DialogHeader>
          <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-health-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Visualização de Mapa</h3>
              <p className="text-muted-foreground">
                Mapa interativo mostrando a distribuição geográfica dos hospitais
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                {hospitals.map(h => (
                  <div key={h.id} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      h.status === 'good' ? 'bg-health-secondary' : 'bg-warning-amber'
                    }`} />
                    <span>{h.name} - {h.location}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* National Report Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Relatório Nacional do Sistema de Saúde</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold">Total de Hospitais</h4>
                <p className="text-2xl font-bold text-health-primary">50</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold">Pacientes Atendidos</h4>
                <p className="text-2xl font-bold text-health-secondary">18,500</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold">Taxa de Ocupação</h4>
                <p className="text-2xl font-bold text-warning-amber">82%</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold">Alertas Ativos</h4>
                <p className="text-2xl font-bold text-danger-red">3</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Resumo por Província</h4>
              {['Luanda: 12 hospitais', 'Benguela: 8 hospitais', 'Huambo: 6 hospitais', 'Outras: 24 hospitais'].map(item => (
                <div key={item} className="flex justify-between p-2 border rounded">
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">
                <FileText className="w-4 h-4 mr-1" />
                Baixar Relatório PDF
              </Button>
              <Button variant="outline" onClick={() => setIsReportModalOpen(false)}>
                Fechar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={cancelDeleteHospital}
        onConfirm={confirmDeleteHospital}
        title="Eliminar Hospital"
        description={
          hospitalToDelete 
            ? `Tem certeza que deseja eliminar o hospital "${hospitalToDelete.name}"? Esta ação não pode ser desfeita e todos os dados associados serão perdidos.`
            : ""
        }
        confirmText="Eliminar Hospital"
        cancelText="Cancelar"
      />
    </div>
  );
}


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Truck, MapPin, Clock, Phone, Plus, Navigation, Edit, Trash2, Eye } from 'lucide-react';

interface Ambulance {
  id: string;
  status: 'available' | 'busy' | 'maintenance';
  location: string;
  driver: string;
}

interface Route {
  id: string;
  ambulance: string;
  origin: string;
  destination: string;
  patient: string;
  priority: 'high' | 'normal';
  eta: string;
}

export function MobilityPage() {
  const [ambulances, setAmbulances] = useState<Ambulance[]>([
    { id: 'AMB-001', status: 'available', location: 'Hospital', driver: 'João Silva' },
    { id: 'AMB-002', status: 'busy', location: 'Maianga', driver: 'Maria Costa' },
    { id: 'AMB-003', status: 'maintenance', location: 'Oficina', driver: '-' }
  ]);

  const [routes, setRoutes] = useState<Route[]>([
    {
      id: '1',
      ambulance: 'AMB-002',
      origin: 'Hospital Central',
      destination: 'Bairro Maianga',
      patient: 'Maria Silva',
      priority: 'high',
      eta: '15 min'
    }
  ]);

  const [selectedAmbulance, setSelectedAmbulance] = useState<Ambulance | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isEditAmbulanceModalOpen, setIsEditAmbulanceModalOpen] = useState(false);
  const [isViewAmbulanceModalOpen, setIsViewAmbulanceModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  const [newRequest, setNewRequest] = useState({
    origin: '',
    destination: '',
    patient: '',
    priority: 'normal' as 'high' | 'normal'
  });

  const handleNewRequest = () => {
    const availableAmbulance = ambulances.find(a => a.status === 'available');
    if (availableAmbulance) {
      const route: Route = {
        id: Date.now().toString(),
        ambulance: availableAmbulance.id,
        origin: newRequest.origin,
        destination: newRequest.destination,
        patient: newRequest.patient,
        priority: newRequest.priority,
        eta: '20 min'
      };
      setRoutes([...routes, route]);
      setAmbulances(ambulances.map(a => 
        a.id === availableAmbulance.id ? { ...a, status: 'busy' as const, location: newRequest.destination } : a
      ));
      setNewRequest({ origin: '', destination: '', patient: '', priority: 'normal' });
      setIsRequestModalOpen(false);
    }
  };

  const handleEditAmbulance = () => {
    if (selectedAmbulance) {
      setAmbulances(ambulances.map(a => 
        a.id === selectedAmbulance.id ? selectedAmbulance : a
      ));
      setIsEditAmbulanceModalOpen(false);
      setSelectedAmbulance(null);
    }
  };

  const handleDeleteAmbulance = (id: string) => {
    setAmbulances(ambulances.filter(a => a.id !== id));
  };

  const handleTrackRoute = (route: Route) => {
    setSelectedRoute(route);
    setIsTrackingModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Controlo de Mobilidade</h1>
          <p className="text-muted-foreground mt-2">
            Gestão de ambulâncias e transporte hospitalar
          </p>
        </div>
        <Button onClick={() => setIsRequestModalOpen(true)} className="bg-health-gradient">
          <Plus className="w-4 h-4 mr-2" />
          Nova Solicitação
        </Button>
      </div>

      {/* Ambulances Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ambulances.map((ambulance, index) => (
          <Card key={ambulance.id} className="health-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{ambulance.id}</h3>
                <Badge variant={
                  ambulance.status === 'available' ? 'default' :
                  ambulance.status === 'busy' ? 'secondary' : 'destructive'
                }>
                  {ambulance.status === 'available' ? 'Disponível' :
                   ambulance.status === 'busy' ? 'Em Rota' : 'Manutenção'}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {ambulance.location}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {ambulance.driver}
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                <Button size="sm" variant="outline" onClick={() => { setSelectedAmbulance(ambulance); setIsViewAmbulanceModalOpen(true); }}>
                  <Eye className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => { setSelectedAmbulance(ambulance); setIsEditAmbulanceModalOpen(true); }}>
                  <Edit className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteAmbulance(ambulance.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Routes */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Rotas Ativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routes.map((route, index) => (
              <div key={route.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Truck className="w-6 h-6 text-health-primary" />
                  <div>
                    <h3 className="font-semibold">{route.ambulance}</h3>
                    <p className="text-sm text-muted-foreground">
                      {route.origin} → {route.destination}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Paciente: {route.patient}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={route.priority === 'high' ? 'destructive' : 'default'}>
                    {route.priority === 'high' ? 'Urgente' : 'Normal'}
                  </Badge>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{route.eta}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleTrackRoute(route)}>
                    Acompanhar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Solicitação de Ambulância</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="origin">Local de Origem</Label>
              <Input
                id="origin"
                value={newRequest.origin}
                onChange={(e) => setNewRequest({...newRequest, origin: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="destination">Destino</Label>
              <Input
                id="destination"
                value={newRequest.destination}
                onChange={(e) => setNewRequest({...newRequest, destination: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="patient">Nome do Paciente</Label>
              <Input
                id="patient"
                value={newRequest.patient}
                onChange={(e) => setNewRequest({...newRequest, patient: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="priority">Prioridade</Label>
              <Select value={newRequest.priority} onValueChange={(value: any) => setNewRequest({...newRequest, priority: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleNewRequest} className="w-full">
              Solicitar Ambulância
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditAmbulanceModalOpen} onOpenChange={setIsEditAmbulanceModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Ambulância</DialogTitle>
          </DialogHeader>
          {selectedAmbulance && (
            <div className="space-y-4">
              <div>
                <Label>Localização</Label>
                <Input
                  value={selectedAmbulance.location}
                  onChange={(e) => setSelectedAmbulance({...selectedAmbulance, location: e.target.value})}
                />
              </div>
              <div>
                <Label>Motorista</Label>
                <Input
                  value={selectedAmbulance.driver}
                  onChange={(e) => setSelectedAmbulance({...selectedAmbulance, driver: e.target.value})}
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select value={selectedAmbulance.status} onValueChange={(value: any) => setSelectedAmbulance({...selectedAmbulance, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Disponível</SelectItem>
                    <SelectItem value="busy">Em Rota</SelectItem>
                    <SelectItem value="maintenance">Manutenção</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleEditAmbulance} className="w-full">
                Salvar Alterações
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isViewAmbulanceModalOpen} onOpenChange={setIsViewAmbulanceModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da Ambulância</DialogTitle>
          </DialogHeader>
          {selectedAmbulance && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>ID</Label>
                  <p className="font-medium">{selectedAmbulance.id}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p className="font-medium">{selectedAmbulance.status}</p>
                </div>
                <div>
                  <Label>Localização</Label>
                  <p className="font-medium">{selectedAmbulance.location}</p>
                </div>
                <div>
                  <Label>Motorista</Label>
                  <p className="font-medium">{selectedAmbulance.driver}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isTrackingModalOpen} onOpenChange={setIsTrackingModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Acompanhar Rota</DialogTitle>
          </DialogHeader>
          {selectedRoute && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">{selectedRoute.ambulance}</h3>
                <p className="text-muted-foreground">
                  {selectedRoute.origin} → {selectedRoute.destination}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Paciente</Label>
                  <p className="font-medium">{selectedRoute.patient}</p>
                </div>
                <div>
                  <Label>ETA</Label>
                  <p className="font-medium">{selectedRoute.eta}</p>
                </div>
                <div>
                  <Label>Prioridade</Label>
                  <Badge variant={selectedRoute.priority === 'high' ? 'destructive' : 'default'}>
                    {selectedRoute.priority === 'high' ? 'Urgente' : 'Normal'}
                  </Badge>
                </div>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg">
                <p className="text-sm text-center">
                  Ambulância em rota para o destino
                </p>
                <div className="w-full h-2 bg-muted rounded-full mt-2">
                  <div className="h-full bg-health-gradient rounded-full w-3/4 animate-pulse" />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

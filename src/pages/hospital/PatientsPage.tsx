import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Plus, UserPlus, FileText, Calendar, Phone, MapPin, Filter } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function PatientsPage() {
  const { patients, addPatient, getPatientsByHospital } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: 'male',
    disease: '',
    status: 'active',
    admissionDate: new Date().toISOString().split('T')[0],
    hospitalId: 'HCL001', // Default hospital ID
    department: '',
    phone: '',
    address: ''
  });

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.age || !newPatient.disease || !newPatient.department) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    addPatient({
      ...newPatient,
      age: parseInt(newPatient.age),
    });

    setNewPatient({
      name: '',
      age: '',
      gender: 'male',
      disease: '',
      status: 'active',
      admissionDate: new Date().toISOString().split('T')[0],
      hospitalId: 'HCL001',
      department: '',
      phone: '',
      address: ''
    });
    setIsAddingPatient(false);
    toast.success('Paciente adicionado com sucesso!');
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || patient.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-danger-red text-white';
      case 'recovered': return 'bg-health-secondary text-white';
      case 'critical': return 'bg-warning-amber text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Gestão de Pacientes</h1>
          <p className="text-muted-foreground mt-2">
            Administração de pacientes e registros médicos
          </p>
        </div>
        <Dialog open={isAddingPatient} onOpenChange={setIsAddingPatient}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-health-gradient">
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Paciente</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome*
                </Label>
                <Input
                  id="name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Idade*
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Gênero*
                </Label>
                <Select
                  value={newPatient.gender}
                  onValueChange={(value) => setNewPatient({ ...newPatient, gender: value as 'male' | 'female' })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="disease" className="text-right">
                  Doença*
                </Label>
                <Input
                  id="disease"
                  value={newPatient.disease}
                  onChange={(e) => setNewPatient({ ...newPatient, disease: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Departamento*
                </Label>
                <Input
                  id="department"
                  value={newPatient.department}
                  onChange={(e) => setNewPatient({ ...newPatient, department: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Endereço
                </Label>
                <Input
                  id="address"
                  value={newPatient.address}
                  onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsAddingPatient(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddPatient}>
                Adicionar Paciente
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar pacientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="recovered">Recuperados</SelectItem>
            <SelectItem value="critical">Críticos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Patients List */}
      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="health-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} anos • {patient.gender === 'male' ? 'Masculino' : 'Feminino'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status === 'active' ? 'Ativo' : 
                         patient.status === 'recovered' ? 'Recuperado' : 'Crítico'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {patient.disease}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.phone || 'Não informado'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.address || 'Não informado'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

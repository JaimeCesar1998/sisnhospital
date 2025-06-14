import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Clock, UserPlus, Calendar, Phone } from 'lucide-react';
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
import { Input } from "@/components/ui/input";

export function StaffPage() {
  const { staff, addStaff, getStaffByHospital } = useData();
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    department: '',
    shift: 'morning',
    phone: '',
    email: '',
    status: 'active',
    hospitalId: 'HCL001', // Default hospital ID
    specialization: '',
    experience: ''
  });

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.role || !newStaff.department || !newStaff.specialization) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    addStaff({
      ...newStaff,
      experience: parseInt(newStaff.experience) || 0
    });

    setNewStaff({
      name: '',
      role: '',
      department: '',
      shift: 'morning',
      phone: '',
      email: '',
      status: 'active',
      hospitalId: 'HCL001',
      specialization: '',
      experience: ''
    });
    setIsAddingStaff(false);
    toast.success('Funcionário adicionado com sucesso!');
  };

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'morning': return 'bg-health-secondary text-white';
      case 'afternoon': return 'bg-warning-amber text-white';
      case 'night': return 'bg-danger-red text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getShiftLabel = (shift: string) => {
    switch (shift) {
      case 'morning': return 'Manhã';
      case 'afternoon': return 'Tarde';
      case 'night': return 'Noite';
      default: return shift;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Gestão de Funcionários</h1>
          <p className="text-muted-foreground mt-2">
            Administração de pessoal e escalas de trabalho
          </p>
        </div>
        <Dialog open={isAddingStaff} onOpenChange={setIsAddingStaff}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-health-gradient">
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Funcionário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Funcionário</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome*
                </Label>
                <Input
                  id="name"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Cargo*
                </Label>
                <Select
                  value={newStaff.role}
                  onValueChange={(value) => setNewStaff({ ...newStaff, role: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">Médico</SelectItem>
                    <SelectItem value="nurse">Enfermeiro</SelectItem>
                    <SelectItem value="technician">Técnico</SelectItem>
                    <SelectItem value="administrative">Administrativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Departamento*
                </Label>
                <Input
                  id="department"
                  value={newStaff.department}
                  onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="specialization" className="text-right">
                  Especialização*
                </Label>
                <Input
                  id="specialization"
                  value={newStaff.specialization}
                  onChange={(e) => setNewStaff({ ...newStaff, specialization: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="experience" className="text-right">
                  Anos de Experiência
                </Label>
                <Input
                  id="experience"
                  type="number"
                  value={newStaff.experience}
                  onChange={(e) => setNewStaff({ ...newStaff, experience: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shift" className="text-right">
                  Turno*
                </Label>
                <Select
                  value={newStaff.shift}
                  onValueChange={(value) => setNewStaff({ ...newStaff, shift: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o turno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Manhã</SelectItem>
                    <SelectItem value="afternoon">Tarde</SelectItem>
                    <SelectItem value="night">Noite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsAddingStaff(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddStaff}>
                Adicionar Funcionário
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-health-primary" />
              <div>
                <h3 className="text-2xl font-bold">234</h3>
                <p className="text-sm text-muted-foreground">Total Funcionários</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-health-secondary" />
              <div>
                <h3 className="text-2xl font-bold">89</h3>
                <p className="text-sm text-muted-foreground">Em Serviço</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-sm text-muted-foreground">De Férias</p>
            </div>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold">5</h3>
              <p className="text-sm text-muted-foreground">Ausentes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff on Duty */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle>Funcionários em Serviço</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {staff.map((member) => (
              <div key={member.id} className="flex items-start justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role === 'doctor' ? 'Médico' :
                       member.role === 'nurse' ? 'Enfermeiro' :
                       member.role === 'technician' ? 'Técnico' : 'Administrativo'} • {member.department}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getShiftColor(member.shift)}>
                        {getShiftLabel(member.shift)}
                      </Badge>
                      {member.specialization && (
                        <span className="text-sm text-muted-foreground">
                          {member.specialization}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Escala da Semana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
              <div key={index} className="font-semibold p-2 bg-muted rounded">
                {day}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {['Manhã (6h-14h)', 'Tarde (14h-22h)', 'Noite (22h-6h)'].map((shift, index) => (
              <div key={index} className="grid grid-cols-8 gap-2 items-center">
                <div className="font-medium text-sm">{shift}</div>
                {[1,2,3,4,5,6,7].map((day) => (
                  <div key={day} className="p-1 text-xs border rounded text-center">
                    {Math.floor(Math.random() * 10) + 5}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

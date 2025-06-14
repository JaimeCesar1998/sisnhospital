
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/context/DataContext';
import { toast } from '@/hooks/use-toast';
import { Building2, Plus, Edit, Trash2, MapPin, Phone, User, Mail, Key } from 'lucide-react';
import { ConfirmationModal } from '@/components/ConfirmationModal';

export function HospitalManagementPage() {
  const { hospitals, addHospital, updateHospital, deleteHospital } = useData();
  const [isAddingHospital, setIsAddingHospital] = useState(false);
  const [editingHospital, setEditingHospital] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; hospitalId: string | null }>({
    isOpen: false,
    hospitalId: null
  });
  
  const [formData, setFormData] = useState({
    name: '',
    province: '',
    status: 'active' as 'active' | 'maintenance' | 'inactive',
    patients: 0,
    capacity: 50,
    contact: '',
    address: '',
    director: '',
    email: '',
    password: 'hospital123'
  });

  const provinces = [
    'Luanda', 'Benguela', 'Huambo', 'Huíla', 'Malanje', 'Uíge', 
    'Cuanza Norte', 'Cuanza Sul', 'Lunda Norte', 'Lunda Sul',
    'Moxico', 'Cuando Cubango', 'Namibe', 'Zaire', 'Cabinda',
    'Cunene', 'Bengo', 'Bié'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.province) {
      toast({
        title: "Erro",
        description: "Nome e província são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    // Gerar email automático se não fornecido
    const hospitalEmail = formData.email || 
      `hospital.${formData.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}@saude.gov.ao`;

    const hospitalData = {
      ...formData,
      email: hospitalEmail,
      password: formData.password || 'hospital123'
    };

    console.log('Cadastrando/atualizando hospital:', hospitalData);

    if (editingHospital) {
      updateHospital(editingHospital, hospitalData);
      toast({
        title: "Sucesso",
        description: "Hospital atualizado com sucesso"
      });
      setEditingHospital(null);
    } else {
      addHospital(hospitalData);
      toast({
        title: "Sucesso",
        description: `Hospital cadastrado com sucesso! Email: ${hospitalEmail}, Senha: ${hospitalData.password}`
      });
      setIsAddingHospital(false);
    }

    setFormData({
      name: '',
      province: '',
      status: 'active',
      patients: 0,
      capacity: 50,
      contact: '',
      address: '',
      director: '',
      email: '',
      password: 'hospital123'
    });
  };

  const handleEdit = (hospital: any) => {
    setFormData({
      name: hospital.name,
      province: hospital.province,
      status: hospital.status,
      patients: hospital.patients,
      capacity: hospital.capacity,
      contact: hospital.contact || '',
      address: hospital.address || '',
      director: hospital.director || '',
      email: hospital.email || '',
      password: hospital.password || 'hospital123'
    });
    setEditingHospital(hospital.id);
    setIsAddingHospital(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmation({ isOpen: true, hospitalId: id });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmation.hospitalId) {
      deleteHospital(deleteConfirmation.hospitalId);
      toast({
        title: "Hospital excluído",
        description: "Hospital removido do sistema"
      });
    }
    setDeleteConfirmation({ isOpen: false, hospitalId: null });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'maintenance': return 'Manutenção';
      case 'inactive': return 'Inativo';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Gestão de Hospitais</h1>
          <p className="text-muted-foreground mt-2">
            Cadastre e gerencie hospitais do sistema nacional
          </p>
        </div>
        <Button 
          onClick={() => setIsAddingHospital(true)}
          className="bg-health-gradient"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Hospital
        </Button>
      </div>

      {/* Form for adding/editing hospital */}
      {isAddingHospital && (
        <Card className="health-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {editingHospital ? 'Editar Hospital' : 'Cadastrar Novo Hospital'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Hospital *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ex: Hospital Central de..."
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="province">Província *</Label>
                  <Select value={formData.province} onValueChange={(value) => setFormData({...formData, province: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a província" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province} value={province}>{province}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="maintenance">Manutenção</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacidade (%)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value) || 0})}
                    min="0"
                    max="100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="director">Diretor</Label>
                  <Input
                    id="director"
                    value={formData.director}
                    onChange={(e) => setFormData({...formData, director: e.target.value})}
                    placeholder="Nome do diretor"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contacto</Label>
                  <Input
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    placeholder="+244 222 123 456"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Endereço completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (Login)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="hospital.nome@saude.gov.ao"
                  />
                  <p className="text-xs text-muted-foreground">
                    Se deixar vazio, será gerado automaticamente
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha (Login)</Label>
                  <Input
                    id="password"
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Senha padrão: hospital123"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-health-gradient">
                  {editingHospital ? 'Atualizar' : 'Cadastrar'} Hospital
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingHospital(false);
                    setEditingHospital(null);
                    setFormData({
                      name: '',
                      province: '',
                      status: 'active',
                      patients: 0,
                      capacity: 50,
                      contact: '',
                      address: '',
                      director: '',
                      email: '',
                      password: 'hospital123'
                    });
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Hospitals list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <Card key={hospital.id} className="health-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{hospital.name}</CardTitle>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {hospital.province}
                  </p>
                </div>
                <Badge className={`${getStatusColor(hospital.status)} text-white`}>
                  {getStatusText(hospital.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Pacientes</p>
                  <p className="font-semibold">{hospital.patients}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Capacidade</p>
                  <p className="font-semibold">{hospital.capacity}%</p>
                </div>
              </div>

              {hospital.director && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{hospital.director}</span>
                </div>
              )}

              {hospital.contact && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{hospital.contact}</span>
                </div>
              )}

              {hospital.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{hospital.email}</span>
                </div>
              )}

              {hospital.password && (
                <div className="flex items-center gap-2 text-sm">
                  <Key className="w-4 h-4 text-muted-foreground" />
                  <span className="font-mono bg-muted px-2 py-1 rounded text-xs">
                    {hospital.password}
                  </span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleEdit(hospital)}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Editar
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDeleteClick(hospital.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, hospitalId: null })}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão do Hospital"
        description="Tem certeza que deseja eliminar este hospital? Esta ação não pode ser desfeita e removerá todos os dados associados."
        confirmText="Eliminar Hospital"
        cancelText="Cancelar"
      />
    </div>
  );
}

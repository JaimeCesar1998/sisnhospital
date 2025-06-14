import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pill, Wrench, Package, AlertTriangle, Plus, Download } from 'lucide-react';
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

export function ResourcesPage() {
  const { resources, addResource, getResourcesByHospital } = useData();
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [selectedType, setSelectedType] = useState<'medicines' | 'equipment' | 'materials'>('medicines');
  const [newResource, setNewResource] = useState<{
    name: string;
    type: 'medicine' | 'equipment' | 'material';
    quantity: number;
    unit: string;
    location: string;
    status: 'active' | 'low' | 'critical';
    minimumQuantity: number;
    expiryDate: string;
    supplier: string;
  }>({
    name: '',
    type: 'medicine',
    quantity: 0,
    unit: '',
    location: '',
    status: 'active',
    minimumQuantity: 0,
    expiryDate: '',
    supplier: ''
  });

  const handleAddResource = () => {
    if (!newResource.name || !newResource.unit || !newResource.location || !newResource.minimumQuantity) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (newResource.quantity < 0 || newResource.minimumQuantity < 0) {
      toast.error('Quantidades não podem ser negativas');
      return;
    }

    if (newResource.type === 'medicine' && !newResource.expiryDate) {
      toast.error('Data de validade é obrigatória para medicamentos');
      return;
    }

    addResource({
      ...newResource,
      hospitalId: 'HCL001' // TODO: Get from context
    });

    toast.success('Recurso adicionado com sucesso');
    setIsAddingResource(false);
    setNewResource({
      name: '',
      type: 'medicine',
      quantity: 0,
      unit: '',
      location: '',
      status: 'active',
      minimumQuantity: 0,
      expiryDate: '',
      supplier: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-health-secondary text-white';
      case 'low': return 'bg-warning-amber text-white';
      case 'critical': return 'bg-danger-red text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Normal';
      case 'low': return 'Baixo';
      case 'critical': return 'Crítico';
      default: return status;
    }
  };

  const filteredResources = resources.filter(resource => {
    switch (selectedType) {
      case 'medicines':
        return resource.type === 'medicine';
      case 'equipment':
        return resource.type === 'equipment';
      case 'materials':
        return resource.type === 'material';
      default:
        return true;
    }
  });

  const criticalResources = filteredResources.filter(r => r.status === 'critical');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Controlo de Recursos</h1>
          <p className="text-muted-foreground mt-2">
            Gestão de medicamentos, equipamentos e materiais
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Relatório
          </Button>
          <Dialog open={isAddingResource} onOpenChange={setIsAddingResource}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-health-gradient">
                <Plus className="w-4 h-4 mr-2" />
                Requisição
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Recurso</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Tipo*
                  </Label>
                  <Select
                    value={newResource.type}
                    onValueChange={(value) => {
                      setNewResource({ ...newResource, type: value as 'medicine' | 'equipment' | 'material' });
                      setSelectedType(value as 'medicines' | 'equipment' | 'materials');
                    }}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medicine">Medicamento</SelectItem>
                      <SelectItem value="equipment">Equipamento</SelectItem>
                      <SelectItem value="material">Material</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome*
                  </Label>
                  <Input
                    id="name"
                    value={newResource.name}
                    onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantidade*
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newResource.quantity}
                    onChange={(e) => setNewResource({ ...newResource, quantity: parseInt(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">
                    Unidade*
                  </Label>
                  <Input
                    id="unit"
                    value={newResource.unit}
                    onChange={(e) => setNewResource({ ...newResource, unit: e.target.value })}
                    className="col-span-3"
                    placeholder="ex: caixas, unidades, kg"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Localização*
                  </Label>
                  <Input
                    id="location"
                    value={newResource.location}
                    onChange={(e) => setNewResource({ ...newResource, location: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="minimumQuantity" className="text-right">
                    Qtd. Mínima
                  </Label>
                  <Input
                    id="minimumQuantity"
                    type="number"
                    value={newResource.minimumQuantity}
                    onChange={(e) => setNewResource({ ...newResource, minimumQuantity: parseInt(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                {newResource.type === 'medicine' && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="expiryDate" className="text-right">
                      Data de Validade
                    </Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={newResource.expiryDate}
                      onChange={(e) => setNewResource({ ...newResource, expiryDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier" className="text-right">
                    Fornecedor
                  </Label>
                  <Input
                    id="supplier"
                    value={newResource.supplier}
                    onChange={(e) => setNewResource({ ...newResource, supplier: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsAddingResource(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddResource}>
                  Adicionar Recurso
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as 'medicines' | 'equipment' | 'materials')} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="medicines" className="flex items-center gap-2">
            <Pill className="w-4 h-4" />
            Medicamentos
          </TabsTrigger>
          <TabsTrigger value="equipment" className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Equipamentos
          </TabsTrigger>
          <TabsTrigger value="materials" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Materiais
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedType} className="space-y-6">
          {criticalResources.length > 0 && (
            <Card className="border-l-4 border-l-danger-red health-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-danger-red" />
                  <div>
                    <h3 className="font-semibold text-danger-red">
                      {criticalResources.length} {selectedType === 'medicines' ? 'medicamentos' : 
                       selectedType === 'equipment' ? 'equipamentos' : 'materiais'} em stock crítico
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Necessária reposição urgente
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="health-card">
            <CardHeader>
              <CardTitle>
                {selectedType === 'medicines' ? 'Medicamentos' : 
                 selectedType === 'equipment' ? 'Equipamentos' : 'Materiais'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredResources.map((resource) => (
                  <div key={resource.id} className="flex items-start justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div>
                        <h3 className="font-semibold">{resource.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {resource.quantity} {resource.unit} • {resource.location}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getStatusColor(resource.status)}>
                            {getStatusLabel(resource.status)}
                          </Badge>
                          {resource.supplier && (
                            <span className="text-sm text-muted-foreground">
                              Fornecedor: {resource.supplier}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
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

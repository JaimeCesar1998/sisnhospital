
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Users, Activity, AlertTriangle, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Hospital {
  id: string;
  name: string;
  location: string;
  patients: number;
  activeCases: number;
  status: 'operational' | 'overloaded' | 'critical' | 'maintenance';
  alerts: number;
}

const hospitals: Hospital[] = [
  {
    id: 'hospital-luanda',
    name: 'Hospital Central de Luanda',
    location: 'Luanda',
    patients: 1250,
    activeCases: 85,
    status: 'operational',
    alerts: 2
  },
  {
    id: 'hospital-benguela',
    name: 'Hospital de Benguela',
    location: 'Benguela',
    patients: 850,
    activeCases: 63,
    status: 'overloaded',
    alerts: 5
  },
  {
    id: 'hospital-huambo',
    name: 'Hospital do Huambo',
    location: 'Huambo',
    patients: 720,
    activeCases: 42,
    status: 'operational',
    alerts: 1
  },
  {
    id: 'hospital-lobito',
    name: 'Hospital do Lobito',
    location: 'Lobito',
    patients: 650,
    activeCases: 38,
    status: 'critical',
    alerts: 8
  },
  {
    id: 'hospital-cabinda',
    name: 'Hospital de Cabinda',
    location: 'Cabinda',
    patients: 580,
    activeCases: 29,
    status: 'maintenance',
    alerts: 3
  }
];

const statusColors = {
  operational: 'bg-green-500',
  overloaded: 'bg-yellow-500',
  critical: 'bg-red-500',
  maintenance: 'bg-gray-500'
};

const statusLabels = {
  operational: 'Operacional',
  overloaded: 'Sobrecarga',
  critical: 'Crítico',
  maintenance: 'Manutenção'
};

export function HospitalNavigator() {
  const navigate = useNavigate();

  const handleViewHospital = (hospitalId: string) => {
    // For now, navigate to hospital dashboard
    navigate('/hospital');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Hospitais do Sistema Nacional</h2>
        <Button variant="outline" size="sm">
          <MapPin className="w-4 h-4 mr-2" />
          Ver no Mapa
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <Card key={hospital.id} className="health-card shadow-lg hover-scale">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-health-primary" />
                  <div>
                    <CardTitle className="text-lg">{hospital.name}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {hospital.location}
                    </p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${statusColors[hospital.status]}`} />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    Pacientes
                  </div>
                  <p className="text-2xl font-bold">{hospital.patients}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Activity className="w-4 h-4" />
                    Casos Ativos
                  </div>
                  <p className="text-2xl font-bold">{hospital.activeCases}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant={hospital.status === 'operational' ? 'default' : 
                              hospital.status === 'overloaded' ? 'secondary' :
                              hospital.status === 'critical' ? 'destructive' : 'outline'}>
                  {statusLabels[hospital.status]}
                </Badge>
                {hospital.alerts > 0 && (
                  <div className="flex items-center gap-1 text-sm text-warning-amber">
                    <AlertTriangle className="w-4 h-4" />
                    {hospital.alerts} alertas
                  </div>
                )}
              </div>

              <Button 
                onClick={() => handleViewHospital(hospital.id)} 
                className="w-full bg-health-gradient"
                size="sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

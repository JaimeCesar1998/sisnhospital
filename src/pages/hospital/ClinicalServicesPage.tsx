
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Baby, Stethoscope, Pill, Calendar, Users } from 'lucide-react';

export function ClinicalServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Serviços Clínicos</h1>
        <p className="text-muted-foreground mt-2">
          Gestão de todos os serviços médicos do hospital
        </p>
      </div>

      <Tabs defaultValue="emergency" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="emergency">Urgência</TabsTrigger>
          <TabsTrigger value="surgery">Cirurgia</TabsTrigger>
          <TabsTrigger value="maternity">Maternidade</TabsTrigger>
          <TabsTrigger value="consultations">Consultas</TabsTrigger>
        </TabsList>

        <TabsContent value="emergency" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="health-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Heart className="w-8 h-8 text-danger-red" />
                  <div>
                    <h3 className="text-2xl font-bold text-danger-red">23</h3>
                    <p className="text-sm text-muted-foreground">Pacientes em Urgência</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="health-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Stethoscope className="w-8 h-8 text-warning-amber" />
                  <div>
                    <h3 className="text-2xl font-bold text-warning-amber">8</h3>
                    <p className="text-sm text-muted-foreground">Casos Críticos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="health-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-health-secondary" />
                  <div>
                    <h3 className="text-2xl font-bold text-health-secondary">12</h3>
                    <p className="text-sm text-muted-foreground">Médicos de Plantão</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="surgery" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Bloco Operatório</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="font-semibold">Cirurgias Agendadas Hoje</h3>
                  {[
                    { time: '08:00', patient: 'João Silva', procedure: 'Apendicectomia', room: 'SO1' },
                    { time: '10:30', patient: 'Maria Costa', procedure: 'Cesariana', room: 'SO2' },
                    { time: '14:00', patient: 'Pedro Santos', procedure: 'Herniorrafia', room: 'SO1' }
                  ].map((surgery, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{surgery.time} - {surgery.patient}</p>
                          <p className="text-sm text-muted-foreground">{surgery.procedure}</p>
                        </div>
                        <span className="text-sm bg-health-primary/10 text-health-primary px-2 py-1 rounded">
                          {surgery.room}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Status das Salas</h3>
                  {[
                    { room: 'SO1', status: 'occupied', procedure: 'Em cirurgia' },
                    { room: 'SO2', status: 'available', procedure: 'Disponível' },
                    { room: 'SO3', status: 'cleaning', procedure: 'Limpeza' }
                  ].map((room, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{room.room}</span>
                        <span className={`px-2 py-1 rounded text-sm ${
                          room.status === 'occupied' ? 'bg-danger-red/10 text-danger-red' :
                          room.status === 'available' ? 'bg-health-secondary/10 text-health-secondary' :
                          'bg-warning-amber/10 text-warning-amber'
                        }`}>
                          {room.procedure}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maternity" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="health-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Baby className="w-8 h-8 text-health-primary" />
                  <div>
                    <h3 className="text-2xl font-bold">15</h3>
                    <p className="text-sm text-muted-foreground">Partos este mês</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="health-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-health-secondary" />
                  <div>
                    <h3 className="text-2xl font-bold">3</h3>
                    <p className="text-sm text-muted-foreground">Partos hoje</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="health-card">
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold">85%</h3>
                  <p className="text-sm text-muted-foreground">Ocupação</p>
                </div>
              </CardContent>
            </Card>
            <Card className="health-card">
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold">12</h3>
                  <p className="text-sm text-muted-foreground">Leitos disponíveis</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="consultations" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Consultas Externas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Consultas de Hoje</h3>
                  <div className="space-y-3">
                    {[
                      { time: '09:00', doctor: 'Dr. Silva', specialty: 'Cardiologia', patients: 8 },
                      { time: '10:00', doctor: 'Dra. Costa', specialty: 'Pediatria', patients: 12 },
                      { time: '14:00', doctor: 'Dr. Santos', specialty: 'Ortopedia', patients: 6 }
                    ].map((consultation, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{consultation.time} - {consultation.doctor}</p>
                            <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                          </div>
                          <span className="text-sm">{consultation.patients} pacientes</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Estatísticas</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <span>Total consultas hoje</span>
                        <span className="font-bold">156</span>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <span>Pacientes aguardando</span>
                        <span className="font-bold text-warning-amber">23</span>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between">
                        <span>Tempo médio de espera</span>
                        <span className="font-bold">25 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

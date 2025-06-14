
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartCard } from '@/components/ChartCard';
import { FileText, Download, Printer, Calendar, Filter, TrendingUp, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ReportsPage() {
  const { toast } = useToast();

  const handleExportPDF = () => {
    toast({
      title: "Exportando PDF",
      description: "Relatório sendo gerado em PDF...",
    });
  };

  const handleExportExcel = () => {
    toast({
      title: "Exportando Excel",
      description: "Dados sendo exportados para Excel...",
    });
  };

  const handleScheduleReport = () => {
    toast({
      title: "Agendar Relatório",
      description: "Agendamento de relatório configurado com sucesso!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Relatórios e Análises</h1>
          <p className="text-muted-foreground mt-2">
            Relatórios detalhados do sistema nacional de saúde
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => toast({ title: "Filtros", description: "Configurando filtros avançados..." })}>
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button size="sm" className="bg-health-gradient" onClick={() => toast({ title: "Novo Relatório", description: "Criando novo relatório personalizado..." })}>
            <FileText className="w-4 h-4 mr-2" />
            Novo Relatório
          </Button>
        </div>
      </div>

      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Resumo</TabsTrigger>
          <TabsTrigger value="hospitals">Hospitais</TabsTrigger>
          <TabsTrigger value="diseases">Doenças</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="health-card animate-fade-in">
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold gradient-text">50</h3>
                  <p className="text-sm text-muted-foreground">Hospitais Ativos</p>
                  <Badge variant="default" className="mt-2 bg-health-secondary">+2 este mês</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="health-card animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold gradient-text">18,500</h3>
                  <p className="text-sm text-muted-foreground">Pacientes Atendidos</p>
                  <Badge variant="default" className="mt-2 bg-health-primary">+12% vs mês anterior</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="health-card animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold gradient-text">2,456</h3>
                  <p className="text-sm text-muted-foreground">Casos de Doenças</p>
                  <Badge variant="destructive" className="mt-2">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    +8% tendência
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="health-card animate-fade-in" style={{ animationDelay: '300ms' }}>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold gradient-text">89%</h3>
                  <p className="text-sm text-muted-foreground">Cobertura Nacional</p>
                  <Badge variant="outline" className="mt-2">Meta: 95%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Overview Chart */}
          <ChartCard
            title="Panorama Nacional - Evolução Mensal (Pacientes, Hospitais, Doenças)"
            data={[
              { name: 'Jan', pacientes: 15200, hospitais: 47, doencas: 1890, cobertura: 85 },
              { name: 'Fev', pacientes: 16100, hospitais: 48, doencas: 2010, cobertura: 86 },
              { name: 'Mar', pacientes: 16800, hospitais: 48, doencas: 2150, cobertura: 87 },
              { name: 'Abr', pacientes: 17200, hospitais: 49, doencas: 2280, cobertura: 88 },
              { name: 'Mai', pacientes: 17900, hospitais: 49, doencas: 2350, cobertura: 88 },
              { name: 'Jun', pacientes: 18500, hospitais: 50, doencas: 2456, cobertura: 89 }
            ]}
            type="area"
            dataKey="pacientes"
            xAxisKey="name"
            height={350}
            animated={true}
            colors={['#06b6d4']}
          />

          {/* Recent Reports */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Relatórios Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: 'Relatório Mensal - Junho 2024',
                    type: 'Mensal',
                    date: '2024-06-30',
                    size: '2.3 MB',
                    status: 'ready'
                  },
                  {
                    title: 'Análise Epidemiológica - Surto Dengue',
                    type: 'Especial',
                    date: '2024-06-28',
                    size: '1.8 MB',
                    status: 'ready'
                  },
                  {
                    title: 'Relatório de Recursos - Q2 2024',
                    type: 'Trimestral',
                    date: '2024-06-25',
                    size: '3.1 MB',
                    status: 'ready'
                  },
                  {
                    title: 'Avaliação Hospitalar Nacional',
                    type: 'Anual',
                    date: '2024-06-20',
                    size: '4.5 MB',
                    status: 'processing'
                  }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <FileText className="w-6 h-6 text-health-primary" />
                      <div>
                        <h3 className="font-semibold">{report.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{report.type}</span>
                          <span>{report.date}</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={report.status === 'ready' ? 'default' : 'secondary'}>
                        {report.status === 'ready' ? 'Pronto' : 'Processando'}
                      </Badge>
                      {report.status === 'ready' && (
                        <>
                          <Button size="sm" variant="outline">
                            <Printer className="w-3 h-3 mr-1" />
                            Imprimir
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hospitals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Performance dos Hospitais por Província"
              data={[
                { name: 'Luanda', hospitais: 12, pacientes: 8500, eficiencia: 85 },
                { name: 'Benguela', hospitais: 8, pacientes: 3200, eficiencia: 78 },
                { name: 'Huambo', hospitais: 6, pacientes: 2100, eficiencia: 82 },
                { name: 'Cabinda', hospitais: 4, pacientes: 1200, eficiencia: 90 },
                { name: 'Huíla', hospitais: 5, pacientes: 1800, eficiencia: 76 },
                { name: 'Namibe', hospitais: 3, pacientes: 900, eficiencia: 88 }
              ]}
              type="bar"
              dataKey="pacientes"
              xAxisKey="name"
              height={350}
              animated={true}
              colors={['#22c55e']}
            />
            <ChartCard
              title="Eficiência Hospitalar por Região"
              data={[
                { name: 'Norte', eficiencia: 82, capacidade: 85 },
                { name: 'Centro', eficiencia: 78, capacidade: 92 },
                { name: 'Sul', eficiencia: 85, capacidade: 88 },
                { name: 'Leste', eficiencia: 80, capacidade: 90 },
                { name: 'Oeste', eficiencia: 88, capacidade: 95 }
              ]}
              type="line"
              dataKey="eficiencia"
              xAxisKey="name"
              height={350}
              animated={true}
              colors={['#8b5cf6']}
            />
          </div>
        </TabsContent>

        <TabsContent value="diseases" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Principais Doenças - Distribuição Nacional"
              data={[
                { name: 'Malária', value: 2456, tipo: 'endêmica' },
                { name: 'Cólera', value: 567, tipo: 'epidêmica' },
                { name: 'Dengue', value: 876, tipo: 'endêmica' },
                { name: 'COVID-19', value: 432, tipo: 'pandêmica' },
                { name: 'Sarampo', value: 289, tipo: 'epidêmica' },
                { name: 'Febre Amarela', value: 123, tipo: 'endêmica' }
              ]}
              type="pie"
              dataKey="value"
              height={350}
              animated={true}
              colors={['#ef4444', '#dc2626', '#f97316', '#06b6d4', '#ea580c', '#eab308']}
            />
            <ChartCard
              title="Evolução Temporal - Surtos e Epidemias"
              data={[
                { name: 'Jan', malaria: 1800, colera: 320, dengue: 180, covid: 580, sarampo: 240 },
                { name: 'Fev', malaria: 2100, colera: 380, dengue: 200, covid: 520, sarampo: 255 },
                { name: 'Mar', malaria: 2300, colera: 420, dengue: 220, covid: 480, sarampo: 270 },
                { name: 'Abr', malaria: 2200, colera: 480, dengue: 210, covid: 450, sarampo: 280 },
                { name: 'Mai', malaria: 2400, colera: 520, dengue: 230, covid: 435, sarampo: 285 },
                { name: 'Jun', malaria: 2456, colera: 567, dengue: 234, covid: 432, sarampo: 289 }
              ]}
              type="line"
              dataKey="malaria"
              xAxisKey="name"
              height={350}
              animated={true}
              colors={['#ef4444']}
            />
          </div>
          
          <ChartCard
            title="Análise de Gravidade - Classificação por Risco"
            data={[
              { name: 'Crítico', value: 15, descricao: 'Ação imediata necessária' },
              { name: 'Alto', value: 35, descricao: 'Monitoramento intensivo' },
              { name: 'Médio', value: 30, descricao: 'Acompanhamento regular' },
              { name: 'Baixo', value: 20, descricao: 'Controle preventivo' }
            ]}
            type="bar"
            dataKey="value"
            xAxisKey="name"
            height={300}
            animated={true}
            colors={['#dc2626', '#ea580c', '#eab308', '#22c55e']}
          />
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Distribuição Nacional de Recursos"
              data={[
                { name: 'Jan', medicamentos: 1200, equipamentos: 45, materiais: 2800 },
                { name: 'Fev', medicamentos: 1450, equipamentos: 52, materiais: 3200 },
                { name: 'Mar', medicamentos: 1680, equipamentos: 48, materiais: 3600 },
                { name: 'Abr', medicamentos: 1890, equipamentos: 65, materiais: 4100 },
                { name: 'Mai', medicamentos: 2100, equipamentos: 78, materiais: 4500 },
                { name: 'Jun', medicamentos: 2450, equipamentos: 89, materiais: 5200 }
              ]}
              type="area"
              dataKey="medicamentos"
              xAxisKey="name"
              height={350}
              animated={true}
              colors={['#10b981']}
            />
            <ChartCard
              title="Investimento em Saúde por Categoria"
              data={[
                { name: 'Medicamentos', value: 45, orcamento: 'Alto' },
                { name: 'Equipamentos', value: 25, orcamento: 'Médio' },
                { name: 'Infraestrutura', value: 20, orcamento: 'Alto' },
                { name: 'Formação', value: 10, orcamento: 'Baixo' }
              ]}
              type="pie"
              dataKey="value"
              height={350}
              animated={true}
              colors={['#10b981', '#06b6d4', '#8b5cf6', '#ec4899']}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Export Options */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Opções de Exportação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col hover-scale" onClick={handleExportPDF}>
              <FileText className="w-6 h-6 mb-2" />
              Exportar PDF
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-scale" onClick={handleExportExcel}>
              <Download className="w-6 h-6 mb-2" />
              Exportar Excel
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-scale" onClick={handleScheduleReport}>
              <Calendar className="w-6 h-6 mb-2" />
              Agendar Relatório
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

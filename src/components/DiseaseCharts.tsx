import React from 'react';
import { ChartCard } from '@/components/ChartCard';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';

interface DiseaseChartsProps {
  scope: 'hospital' | 'national';
}

export function DiseaseCharts({ scope }: DiseaseChartsProps) {
  const { getChartData } = useData();
  const { user } = useAuth();

  const diseaseData = getChartData(scope, user?.hospitalId);
  
  // Calculate severity distribution
  const severityData = diseaseData.reduce((acc: any[], disease: any) => {
    const existing = acc.find(item => item.name === disease.severity);
    if (existing) {
      existing.value += disease.value;
    } else {
      acc.push({
        name: disease.severity,
        value: disease.value
      });
    }
    return acc;
  }, []);

  // Calculate outbreak type distribution using real disease data
  const outbreakData = diseaseData.reduce((acc: any[], disease: any) => {
    const existing = acc.find(item => item.name === disease.type);
    if (existing) {
      existing.value += disease.value;
    } else {
      acc.push({
        name: disease.type,
        value: disease.value
      });
    }
    return acc;
  }, []);

  // Get the main diseases (top 6 by cases)
  const mainDiseases = [...diseaseData]
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Get emergent diseases (high severity)
  const emergentDiseases = diseaseData
    .filter((d: any) => d.severity === 'high')
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Main disease distribution chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard
          title={`Distribuição de Doenças por Casos - ${scope === 'hospital' ? 'Hospital' : 'Nacional'}`}
          data={diseaseData}
          type="pie"
          dataKey="value"
          colors={['#ef4444', '#dc2626', '#f97316', '#ea580c', '#eab308', '#ca8a04']}
          height={350}
          animated={true}
        />
        <ChartCard
          title="Classificação por Severidade"
          data={severityData}
          type="pie"
          dataKey="value"
          colors={['#dc2626', '#eab308', '#22c55e']}
          height={350}
          animated={true}
        />
        <div className="relative">
          <ChartCard
            title="Surtos, Epidemias e Pandemias"
            data={outbreakData}
            type="pie"
            dataKey="value"
            xAxisKey="name"
            colors={['#ef4444', '#f97316', '#dc2626', '#22c55e']}
            height={350}
            animated={true}
          />
          <img 
            src="https://lovable-uploads.s3.amazonaws.com/821cf028-a6df-4257-bea2-b4ff6ddba86d.png" 
            alt="Classificação de Surtos" 
            className="absolute bottom-4 right-4 w-24 h-24 opacity-50"
          />
        </div>
      </div>

      {/* Top diseases comparison */}
      {mainDiseases.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Top 3 Doenças por Casos"
            data={mainDiseases.slice(0, 3)}
            type="bar"
            dataKey="value"
            xAxisKey="name"
            colors={['#ef4444']}
            height={300}
            animated={true}
          />
          <ChartCard
            title="Surtos de Alta Severidade"
            data={emergentDiseases}
            type="bar"
            dataKey="value"
            xAxisKey="name"
            colors={['#dc2626']}
            height={300}
            animated={true}
          />
        </div>
      )}

      {/* Detailed disease information */}
      {mainDiseases.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Distribuição por Departamento"
            data={diseaseData.reduce((acc: any[], disease: any) => {
              const existing = acc.find(item => item.name === disease.department);
              if (existing) {
                existing.value += disease.value;
              } else {
                acc.push({
                  name: disease.department,
                  value: disease.value
                });
              }
              return acc;
            }, [])}
            type="pie"
            dataKey="value"
            colors={['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6']}
            height={300}
            animated={true}
          />
          <ChartCard
            title="Tendência de Casos"
            data={diseaseData.map(disease => ({
              name: disease.name,
              value: disease.value,
              trend: disease.trend
            }))}
            type="bar"
            dataKey="value"
            xAxisKey="name"
            colors={['#ef4444']}
            height={300}
            animated={true}
          />
        </div>
      )}
    </div>
  );
}

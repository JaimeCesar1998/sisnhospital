
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend, Area, AreaChart } from 'recharts';

interface ChartCardProps {
  title: string;
  data: any[];
  type: 'line' | 'bar' | 'pie' | 'area';
  dataKey?: string;
  xAxisKey?: string;
  colors?: string[];
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  animated?: boolean;
  className?: string;
}

const defaultColors = [
  '#dc2626', // Red
  '#ea580c', // Orange
  '#f59e0b', // Amber
  '#84cc16', // Lime
  '#06b6d4', // Cyan
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#10b981', // Emerald
  '#f97316', // Orange variant
  '#0891b2', // Cyan variant
  '#9333ea', // Purple variant
  '#ca8a04'  // Yellow variant
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg p-3">
        <p className="font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg p-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: data.payload.fill }}
          />
          <span className="font-medium text-foreground">{data.name}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Valor: <span className="font-medium text-foreground">{data.value}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Percentual: <span className="font-medium text-foreground">{((data.value / data.payload.total) * 100).toFixed(1)}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export function ChartCard({ 
  title, 
  data, 
  type, 
  dataKey = 'value', 
  xAxisKey = 'name',
  colors = defaultColors,
  height = 300,
  showLegend = true,
  showGrid = true,
  animated = true,
  className
}: ChartCardProps) {
  
  // Calculate total for pie charts
  const dataWithTotal = data.map(item => ({
    ...item,
    total: data.reduce((sum, d) => sum + (d[dataKey] || 0), 0)
  }));

  const renderChart = () => {
    const commonProps = {
      data: type === 'pie' ? dataWithTotal : data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                opacity={0.3}
              />
            )}
            <XAxis 
              dataKey={xAxisKey} 
              fontSize={12} 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              fontSize={12} 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={colors[0]} 
              strokeWidth={3}
              dot={{ 
                fill: colors[0], 
                strokeWidth: 2, 
                r: 5,
                stroke: 'hsl(var(--background))'
              }}
              activeDot={{ 
                r: 7, 
                stroke: colors[0], 
                strokeWidth: 2,
                fill: 'hsl(var(--background))'
              }}
              animationDuration={animated ? 1500 : 0}
            />
          </LineChart>
        );
      
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                opacity={0.3}
              />
            )}
            <XAxis 
              dataKey={xAxisKey} 
              fontSize={12} 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              fontSize={12} 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={colors[0]}
              strokeWidth={2}
              fill={colors[0]}
              fillOpacity={0.3}
              animationDuration={animated ? 1500 : 0}
            />
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                opacity={0.3}
              />
            )}
            <XAxis 
              dataKey={xAxisKey} 
              fontSize={12} 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              fontSize={12} 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Bar 
              dataKey={dataKey} 
              radius={[4, 4, 0, 0]}
              animationDuration={animated ? 1000 : 0}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color || colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        );
      
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={dataWithTotal}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={30}
              fill="#8884d8"
              dataKey={dataKey}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              animationDuration={animated ? 1000 : 0}
              animationBegin={0}
            >
              {dataWithTotal.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color || colors[index % colors.length]}
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            {showLegend && (
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => (
                  <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>
                )}
              />
            )}
          </PieChart>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className={`health-card hover-scale animate-fade-in ${className || ''}`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold gradient-text flex items-center gap-2">
          {title}
          <div className="w-2 h-2 bg-health-primary rounded-full animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

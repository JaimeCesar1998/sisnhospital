
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
  gradient?: string;
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon, 
  gradient = 'bg-health-gradient',
  className 
}: StatCardProps) {
  return (
    <Card className={cn("health-card card-hover overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change && (
              <p className={cn(
                "text-sm font-medium",
                changeType === 'positive' && "text-health-secondary",
                changeType === 'negative' && "text-danger-red",
                changeType === 'neutral' && "text-muted-foreground"
              )}>
                {change}
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-xl shadow-lg", gradient)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Truck, 
  Settings, 
  Hospital, 
  UserCheck,
  BarChart3,
  MapPin,
  Pill,
  Calendar,
  FileText,
  ChevronDown,
  ChevronRight,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ElementType;
  path?: string;
  children?: MenuItem[];
}

const hospitalMenuItems: MenuItem[] = [
  { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard, path: '/hospital' },
  { id: 'patients', title: 'Gestão de Pacientes', icon: Users, path: '/hospital/patients' },
  { id: 'diseases', title: 'Gestão de Doenças', icon: Activity, path: '/hospital/diseases' },
  { id: 'resources', title: 'Recursos', icon: Pill, path: '/hospital/resources' },
  { id: 'mobility', title: 'Mobilidade', icon: Truck, path: '/hospital/mobility' },
  { id: 'services', title: 'Serviços Clínicos', icon: Hospital, path: '/hospital/clinical-services' },
  { id: 'staff', title: 'Funcionários', icon: UserCheck, path: '/hospital/staff' }
];

const nationalMenuItems: MenuItem[] = [
  { id: 'dashboard', title: 'Dashboard Nacional', icon: LayoutDashboard, path: '/national' },
  { id: 'supervision', title: 'Supervisão Geral', icon: Hospital, path: '/national/supervision' },
  { id: 'epidemiology', title: 'Vigilância Epidemiológica', icon: Activity, path: '/national/epidemiology' },
  { id: 'resources', title: 'Recursos Nacionais', icon: Pill, path: '/national/resources' },
  { id: 'planning', title: 'Planejamento Estratégico', icon: BarChart3, path: '/national/planning' },
  { id: 'reports', title: 'Relatórios', icon: FileText, path: '/national/reports' }
];

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const menuItems = user?.role === 'hospital' ? hospitalMenuItems : nationalMenuItems;

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isActive = item.path === location.pathname;
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} className="space-y-1">
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start h-12 px-4 py-2 transition-all duration-200",
            level > 0 && "ml-4 w-[calc(100%-1rem)]",
            isActive && "bg-health-primary/20 text-health-primary border-r-2 border-health-primary",
            !isActive && "hover:bg-muted/50 text-foreground/80 hover:text-foreground"
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else if (item.path) {
              navigate(item.path);
            }
          }}
        >
          <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
          <span className="flex-1 text-left text-sm font-medium">{item.title}</span>
          {hasChildren && (
            isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
          )}
        </Button>

        {hasChildren && isExpanded && (
          <div className="space-y-1 animate-accordion-down">
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-64 bg-slate-800 text-white shadow-2xl">
      <div className="p-6 border-b border-slate-700 bg-slate-900">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full p-1">
              <img 
                src="/lovable-uploads/821cf028-a6df-4257-bea2-b4ff6ddba86d.png" 
                alt="Angola Health Ministry Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-6 h-6">
              <img 
                src="/lovable-uploads/87a764b3-02d9-4d4e-95c3-13b82542d3ff.png" 
                alt="Angola Flag" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">
              {user?.role === 'hospital' ? user?.hospitalName : 'Ministério da Saúde'}
            </h1>
            <p className="text-xs text-slate-300">
              {user?.role === 'hospital' ? 'Sistema Hospitalar' : 'Sistema Nacional de Saúde'}
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-4">
        <nav className="space-y-2">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          {user?.role === 'hospital' ? (
            <Hospital className="h-4 w-4" />
          ) : (
            <Globe className="h-4 w-4" />
          )}
          <span>Sistema Nacional de Saúde - Angola</span>
        </div>
      </div>
    </aside>
  );
}

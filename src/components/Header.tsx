
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, LogOut, User, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-white/20 dark:border-slate-700/50 shadow-sm">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Bem-vindo, {user?.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('pt-AO', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-danger-red">
              3
            </Badge>
          </Button>

          <ThemeToggle />

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-health-gradient text-white font-semibold">
                    {user?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 glass border-white/20" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                  <Badge variant="outline" className="w-fit text-xs">
                    {user?.role === 'hospital' ? 'Hospital' : 'Nacional'}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-danger-red">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

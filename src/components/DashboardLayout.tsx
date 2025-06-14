
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useAuth } from '@/context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-green-900/20">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-6 space-y-6">
            <div className="animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

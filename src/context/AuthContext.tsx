
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from './DataContext';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'hospital' | 'national';
  hospitalId?: string;
  hospitalName?: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'hospital' | 'national') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuários nacionais pré-definidos
const nationalUsers = [
  {
    id: 'nat_001',
    email: 'admin@minsa.gov.ao',
    password: 'admin123',
    name: 'Administrador Nacional',
    role: 'national' as const,
    permissions: ['view_all', 'manage_all', 'reports', 'analytics']
  },
  {
    id: 'nat_002',
    email: 'supervisor@minsa.gov.ao',
    password: 'super123',
    name: 'Supervisor Nacional',
    role: 'national' as const,
    permissions: ['view_all', 'reports', 'analytics']
  }
];

// Hospitais pré-definidos com credenciais
const defaultHospitals = [
  {
    id: 'HCL001',
    name: 'Hospital Central de Luanda',
    email: 'hospital.luanda@saude.gov.ao',
    password: 'hospital123'
  },
  {
    id: 'HBG001',
    name: 'Hospital de Benguela',
    email: 'hospital.benguela@saude.gov.ao',
    password: 'hospital123'
  },
  {
    id: 'HHB001',
    name: 'Hospital do Huambo',
    email: 'hospital.huambo@saude.gov.ao',
    password: 'hospital123'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('angola-health-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { hospitals } = useData();

  useEffect(() => {
    if (user) {
      localStorage.setItem('angola-health-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('angola-health-user');
    }
  }, [user]);

  const login = async (email: string, password: string, type: 'hospital' | 'national'): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simular delay de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Tentativa de login:', { email, password, type });
      
      if (type === 'national') {
        // Verificar usuários nacionais
        const nationalUser = nationalUsers.find(u => u.email === email && u.password === password);
        if (nationalUser) {
          const userData: User = {
            id: nationalUser.id,
            email: nationalUser.email,
            name: nationalUser.name,
            role: 'national',
            permissions: nationalUser.permissions
          };
          setUser(userData);
          navigate('/national');
          return true;
        }
      } else if (type === 'hospital') {
        // Primeiro verificar hospitais pré-definidos
        const defaultHospital = defaultHospitals.find(h => h.email === email && h.password === password);
        if (defaultHospital) {
          const userData: User = {
            id: defaultHospital.id,
            email: defaultHospital.email,
            name: `Gestor - ${defaultHospital.name}`,
            role: 'hospital',
            hospitalId: defaultHospital.id,
            hospitalName: defaultHospital.name,
            permissions: ['view_hospital', 'manage_hospital']
          };
          console.log('Login do hospital pré-definido bem-sucedido:', userData);
          setUser(userData);
          navigate('/hospital');
          return true;
        }

        // Depois verificar hospitais criados dinamicamente
        console.log('Hospitais disponíveis:', hospitals);
        const hospital = hospitals.find(h => {
          console.log('Comparando hospital:', { 
            hospitalEmail: h.email, 
            hospitalPassword: h.password, 
            inputEmail: email, 
            inputPassword: password 
          });
          return h.email === email && h.password === password;
        });
        
        if (hospital) {
          const userData: User = {
            id: hospital.id,
            email: hospital.email!,
            name: `Gestor - ${hospital.name}`,
            role: 'hospital',
            hospitalId: hospital.id,
            hospitalName: hospital.name,
            permissions: ['view_hospital', 'manage_hospital']
          };
          console.log('Login do hospital criado dinamicamente bem-sucedido:', userData);
          setUser(userData);
          navigate('/hospital');
          return true;
        } else {
          console.log('Hospital não encontrado ou credenciais incorretas');
        }
      }
      
      console.log('Login falhou');
      return false;
    } catch (error) {
      console.error('Erro de login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

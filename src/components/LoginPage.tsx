import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Loader2, Eye, EyeOff, Shield, Heart, Activity } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function LoginPage() {
  const [email, setEmail] = useState('hospital.luanda@saude.gov.ao');
  const [password, setPassword] = useState('hospital123');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    const success = await login(email, password, 'hospital');
    
    if (!success) {
      toast({
        title: "Erro de Autenticação",
        description: "Email ou senha incorretos",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[32rem] h-[32rem] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: '0',
              right: '0',
              animation: `slide ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Theme toggle with animation */}
      <div className="absolute top-6 right-6 z-50">
        <div className="transform hover:scale-110 transition-transform duration-300">
          <ThemeToggle />
        </div>
      </div>

      {/* Main login card with enhanced animations */}
      <Card className="w-full max-w-md border-slate-700/30 shadow-2xl bg-slate-800/20 backdrop-blur-2xl relative z-10 rounded-3xl overflow-hidden animate-fade-in glass card-hover card-glow">
        {/* Card shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        
        {/* Card border glow */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
        
        {/* Card hover effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <CardHeader className="space-y-6 text-center pb-8 relative">
          {/* Header with logos and enhanced animations */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="w-28 h-28 rounded-3xl p-3 shadow-lg glass glass-hover card-hover card-glow">
              <img 
                src="/lovable-uploads/75204e93-4ead-4bc7-9198-59feb48321bf.png" 
                alt="Angola Coat of Arms" 
                className="w-full h-full object-contain transform hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="w-28 h-28 rounded-3xl p-3 shadow-lg glass glass-hover card-hover card-glow">
              <img 
                src="/lovable-uploads/87a764b3-02d9-4d4e-95c3-13b82542d3ff.png" 
                alt="Angola Flag" 
                className="w-full h-full object-contain transform hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
          
          <div className="transform hover:scale-105 transition-transform duration-300">
            <CardTitle className="text-4xl font-bold text-white mb-3 tracking-tight text-gradient text-glow">
              Sistema Integrado de Saúde
            </CardTitle>
            <CardDescription className="text-slate-300 text-lg font-medium">
              Painel Hospitalar
            </CardDescription>
          </div>

          {/* Feature icons with enhanced animations */}
          <div className="flex justify-center space-x-8 mt-6">
            <div className="flex flex-col items-center text-slate-300 group">
              <div className="w-12 h-12 rounded-full glass glass-hover flex items-center justify-center mb-2 transform group-hover:scale-110 transition-all duration-300">
                <Shield className="w-6 h-6 text-blue-400 transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm transform group-hover:translate-y-1 transition-transform duration-300">Segurança</span>
            </div>
            <div className="flex flex-col items-center text-slate-300 group">
              <div className="w-12 h-12 rounded-full glass glass-hover flex items-center justify-center mb-2 transform group-hover:scale-110 transition-all duration-300">
                <Heart className="w-6 h-6 text-red-400 transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm transform group-hover:translate-y-1 transition-transform duration-300">Cuidado</span>
            </div>
            <div className="flex flex-col items-center text-slate-300 group">
              <div className="w-12 h-12 rounded-full glass glass-hover flex items-center justify-center mb-2 transform group-hover:scale-110 transition-all duration-300">
                <Activity className="w-6 h-6 text-green-400 transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm transform group-hover:translate-y-1 transition-transform duration-300">Monitoramento</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm font-medium flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                Usuário
              </Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 input-glass input-hover rounded-2xl pl-12"
                  placeholder="hospital.nome@saude.gov.ao"
                  disabled={isLoading}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-400 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-sm font-medium flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                Senha
              </Label>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 input-glass input-hover rounded-2xl pl-12 pr-12"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-400 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400 hover:text-blue-400 transition-colors duration-300"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 btn-gradient rounded-2xl font-medium text-lg relative overflow-hidden group"
              disabled={isLoading}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                'ENTRAR'
              )}
            </Button>
          </form>

          {/* Footer text with enhanced gradient */}
          <div className="text-center">
            <p className="text-slate-400 text-sm text-gradient animate-gradient">
              © 2024 Ministério da Saúde de Angola
            </p>
            <p className="mt-1 text-slate-500 text-xs">
              Todos os direitos reservados
            </p>
          </div>
        </CardContent>
      </Card>

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slide {
          animation: slide 8s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .glass-hover:hover {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: scale(1.02);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .card-glow:hover {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
        }

        .btn-gradient {
          background: linear-gradient(to right, #2563eb, #1d4ed8);
          transition: all 0.3s ease;
        }

        .btn-gradient:hover {
          background: linear-gradient(to right, #1d4ed8, #1e40af);
        }

        .btn-glass {
          background: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .btn-glass:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .input-glass {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .input-hover:hover,
        .input-hover:focus {
          background: rgba(255, 255, 255, 0.1);
        }

        .text-gradient {
          background: linear-gradient(to right, #ffffff, #cbd5e1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .text-glow {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
}

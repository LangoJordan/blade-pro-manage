
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Utilisateurs de démonstration
  const demoUsers = [
    { email: 'admin@promanage.com', password: 'admin123', role: 'admin', name: 'Jean Dupont' },
    { email: 'chef.projet@promanage.com', password: 'chef123', role: 'chef_projet', name: 'Marie Martin' },
    { email: 'chef.equipe@promanage.com', password: 'equipe123', role: 'chef_equipe', name: 'Pierre Dubois' },
    { email: 'employe@promanage.com', password: 'employe123', role: 'employe', name: 'Sophie Leroy' },
    { email: 'client@promanage.com', password: 'client123', role: 'client', name: 'Client TechCorp' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation d'authentification
    setTimeout(() => {
      const user = demoUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Stockage des données utilisateur
        localStorage.setItem('currentUser', JSON.stringify({
          id: Math.floor(Math.random() * 1000),
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.name.split(' ').map(n => n[0]).join('')
        }));
        
        // Redirection vers le dashboard
        navigate('/dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ProManage
            </h1>
          </div>
          <p className="text-gray-600">Connectez-vous à votre compte</p>
        </div>

        <Card className="p-8 border-0 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Mot de passe
              </Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
              disabled={isLoading}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          {/* Comptes de démonstration */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Comptes de démonstration :</p>
            <div className="space-y-2 text-xs">
              {demoUsers.map((user, index) => (
                <div key={index} className="flex justify-between bg-gray-50 p-2 rounded">
                  <span className="font-medium">{user.role.replace('_', ' ')}</span>
                  <span className="text-gray-600">{user.email}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/')}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

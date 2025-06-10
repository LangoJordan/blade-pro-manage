
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <Card className="p-8 text-center max-w-md border-0 shadow-lg">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="h-8 w-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Accès non autorisé
        </h1>
        
        <p className="text-gray-600 mb-6">
          Désolé, vous n'avez pas les permissions nécessaires pour accéder à cette page.
          {user && (
            <span className="block mt-2 text-sm">
              Votre rôle actuel : <span className="font-medium capitalize">{user.role.replace('_', ' ')}</span>
            </span>
          )}
        </p>
        
        <Button 
          onClick={() => navigate('/dashboard')}
          className="bg-gradient-to-r from-purple-600 to-blue-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au tableau de bord
        </Button>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;

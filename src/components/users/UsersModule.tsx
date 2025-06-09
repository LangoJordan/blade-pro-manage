
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Mail, Phone, Shield } from 'lucide-react';

interface UsersModuleProps {
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

const UsersModule = ({ currentUser }: UsersModuleProps) => {
  const [view, setView] = useState('list');

  // Données statiques des utilisateurs
  const users = [
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '06.12.34.56.78',
      role: 'admin',
      status: 'Actif',
      projects: ['Site E-commerce TechCorp', 'App Mobile StartupXYZ'],
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Marie Martin',
      email: 'marie.martin@email.com',
      phone: '06.23.45.67.89',
      role: 'chef_projet',
      status: 'Actif',
      projects: ['Site E-commerce TechCorp'],
      joinDate: '2023-03-01'
    },
    {
      id: 3,
      name: 'Pierre Dubois',
      email: 'pierre.dubois@email.com',
      phone: '06.34.56.78.90',
      role: 'chef_equipe',
      status: 'Actif',
      projects: ['Site E-commerce TechCorp', 'Refonte UI DesignCo'],
      joinDate: '2023-04-15'
    },
    {
      id: 4,
      name: 'Sophie Leroy',
      email: 'sophie.leroy@email.com',
      phone: '06.45.67.89.01',
      role: 'employe',
      status: 'Actif',
      projects: ['Refonte UI DesignCo'],
      joinDate: '2023-06-01'
    },
    {
      id: 5,
      name: 'Lucas Bernard',
      email: 'lucas.bernard@email.com',
      phone: '06.56.78.90.12',
      role: 'employe',
      status: 'Inactif',
      projects: ['Site E-commerce TechCorp'],
      joinDate: '2023-05-15'
    },
    {
      id: 6,
      name: 'Client TechCorp',
      email: 'contact@techcorp.com',
      phone: '01.23.45.67.89',
      role: 'client',
      status: 'Actif',
      projects: ['Site E-commerce TechCorp'],
      joinDate: '2024-01-10'
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'chef_projet': return 'bg-purple-100 text-purple-800';
      case 'chef_equipe': return 'bg-blue-100 text-blue-800';
      case 'employe': return 'bg-green-100 text-green-800';
      case 'client': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'chef_projet': return 'Chef de projet';
      case 'chef_equipe': return 'Chef d\'équipe';
      case 'employe': return 'Employé';
      case 'client': return 'Client';
      default: return role;
    }
  };

  if (view === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <Button onClick={() => setView('create')} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouvel Utilisateur
          </Button>
        </div>

        {/* Filtres */}
        <Card className="p-4">
          <div className="flex gap-4 flex-wrap">
            <select className="px-3 py-2 border rounded-md">
              <option value="">Tous les rôles</option>
              <option value="admin">Administrateur</option>
              <option value="chef_projet">Chef de projet</option>
              <option value="chef_equipe">Chef d'équipe</option>
              <option value="employe">Employé</option>
              <option value="client">Client</option>
            </select>
            <select className="px-3 py-2 border rounded-md">
              <option value="">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
        </Card>

        {/* Liste des utilisateurs */}
        <div className="grid gap-6">
          {users.map(user => (
            <Card key={user.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Phone className="h-4 w-4" />
                      {user.phone}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getRoleColor(user.role)}>
                    <Shield className="h-3 w-3 mr-1" />
                    {getRoleLabel(user.role)}
                  </Badge>
                  <Badge className={user.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {user.status}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => setView('edit')}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Projets assignés</p>
                  <div className="space-y-1">
                    {user.projects.map((project, index) => (
                      <div key={index} className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        {project}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date d'inscription</p>
                  <p className="font-medium">{user.joinDate}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'create') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setView('list')}>
            ← Retour
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Nouvel Utilisateur</h1>
        </div>

        <Card className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nom complet</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Nom complet"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Téléphone</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="06.12.34.56.78"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rôle</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option value="">Sélectionner un rôle</option>
                  <option value="admin">Administrateur</option>
                  <option value="chef_projet">Chef de projet</option>
                  <option value="chef_equipe">Chef d'équipe</option>
                  <option value="employe">Employé</option>
                  <option value="client">Client</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Projets assignés</label>
              <div className="space-y-2">
                {['Site E-commerce TechCorp', 'App Mobile StartupXYZ', 'Refonte UI DesignCo'].map(project => (
                  <label key={project} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>{project}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit">Créer l'utilisateur</Button>
              <Button variant="outline" onClick={() => setView('list')}>
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setView('list')}>
          ← Retour
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Modifier l'Utilisateur</h1>
      </div>
      <Card className="p-6">
        <p className="text-gray-600">Vue d'édition en cours de développement...</p>
      </Card>
    </div>
  );
};

export default UsersModule;

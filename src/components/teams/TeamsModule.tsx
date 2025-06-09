
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Mail, Phone } from 'lucide-react';

interface TeamsModuleProps {
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

const TeamsModule = ({ currentUser }: TeamsModuleProps) => {
  const [view, setView] = useState('list');

  // Données statiques des équipes
  const teams = [
    {
      id: 1,
      name: 'Équipe Frontend',
      project: 'Site E-commerce TechCorp',
      leader: 'Marie Martin',
      members: [
        { id: 1, name: 'Marie Martin', role: 'Chef d\'équipe', email: 'marie.martin@email.com', phone: '06.12.34.56.78' },
        { id: 2, name: 'Pierre Dubois', role: 'Développeur Frontend', email: 'pierre.dubois@email.com', phone: '06.23.45.67.89' },
        { id: 3, name: 'Sophie Leroy', role: 'UI/UX Designer', email: 'sophie.leroy@email.com', phone: '06.34.56.78.90' }
      ]
    },
    {
      id: 2,
      name: 'Équipe Backend',
      project: 'Site E-commerce TechCorp',
      leader: 'Jean Dupont',
      members: [
        { id: 4, name: 'Jean Dupont', role: 'Chef d\'équipe', email: 'jean.dupont@email.com', phone: '06.45.67.89.01' },
        { id: 5, name: 'Lucas Bernard', role: 'Développeur Backend', email: 'lucas.bernard@email.com', phone: '06.56.78.90.12' },
        { id: 6, name: 'Emma Rousseau', role: 'DevOps', email: 'emma.rousseau@email.com', phone: '06.67.89.01.23' }
      ]
    },
    {
      id: 3,
      name: 'Équipe Mobile',
      project: 'App Mobile StartupXYZ',
      leader: 'Thomas Petit',
      members: [
        { id: 7, name: 'Thomas Petit', role: 'Chef d\'équipe', email: 'thomas.petit@email.com', phone: '06.78.90.12.34' },
        { id: 8, name: 'Camille Moreau', role: 'Développeur Mobile', email: 'camille.moreau@email.com', phone: '06.89.01.23.45' },
        { id: 9, name: 'Nicolas Simon', role: 'Testeur QA', email: 'nicolas.simon@email.com', phone: '06.90.12.34.56' }
      ]
    }
  ];

  if (view === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Équipes</h1>
          {(currentUser.role === 'admin' || currentUser.role === 'chef_projet') && (
            <Button onClick={() => setView('create')} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nouvelle Équipe
            </Button>
          )}
        </div>

        {/* Liste des équipes */}
        <div className="grid gap-6">
          {teams.map(team => (
            <Card key={team.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {team.name}
                  </h3>
                  <p className="text-gray-600">Projet: {team.project}</p>
                  <p className="text-sm text-gray-500">Chef d'équipe: {team.leader}</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  {team.members.length} membres
                </Badge>
              </div>

              {/* Membres de l'équipe */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Membres de l'équipe</h4>
                <div className="grid gap-3">
                  {team.members.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium">{member.name}</h5>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {member.phone}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {(currentUser.role === 'admin' || currentUser.role === 'chef_projet') && (
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    Modifier l'équipe
                  </Button>
                  <Button variant="outline" size="sm">
                    Ajouter un membre
                  </Button>
                </div>
              )}
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
          <h1 className="text-3xl font-bold text-gray-900">Nouvelle Équipe</h1>
        </div>

        <Card className="p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nom de l'équipe</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Nom de l'équipe"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Projet associé</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option value="">Sélectionner un projet</option>
                  <option value="1">Site E-commerce TechCorp</option>
                  <option value="2">App Mobile StartupXYZ</option>
                  <option value="3">Refonte UI DesignCo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Chef d'équipe</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option value="">Sélectionner un chef d'équipe</option>
                  <option value="1">Marie Martin</option>
                  <option value="2">Jean Dupont</option>
                  <option value="3">Thomas Petit</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Membres de l'équipe</label>
              <div className="space-y-2">
                {['Pierre Dubois', 'Sophie Leroy', 'Lucas Bernard', 'Emma Rousseau'].map(name => (
                  <label key={name} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>{name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit">Créer l'équipe</Button>
              <Button variant="outline" onClick={() => setView('list')}>
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return null;
};

export default TeamsModule;

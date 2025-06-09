
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, Edit, Plus } from 'lucide-react';

interface ProjectsModuleProps {
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

const ProjectsModule = ({ currentUser }: ProjectsModuleProps) => {
  const [view, setView] = useState('list'); // list, create, edit, show

  // Données statiques des projets
  const projects = [
    {
      id: 1,
      name: 'Site E-commerce TechCorp',
      client: 'TechCorp',
      status: 'En cours',
      progress: 75,
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      budget: 50000,
      description: 'Développement d\'un site e-commerce moderne avec paiement en ligne',
      teamSize: 5
    },
    {
      id: 2,
      name: 'Application Mobile StartupXYZ',
      client: 'StartupXYZ',
      status: 'En cours',
      progress: 45,
      startDate: '2024-02-01',
      endDate: '2024-08-01',
      budget: 75000,
      description: 'Application mobile iOS/Android pour la gestion de tâches',
      teamSize: 7
    },
    {
      id: 3,
      name: 'Refonte UI DesignCo',
      client: 'DesignCo',
      status: 'Terminé',
      progress: 100,
      startDate: '2023-11-01',
      endDate: '2024-03-01',
      budget: 25000,
      description: 'Refonte complète de l\'interface utilisateur',
      teamSize: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'Terminé': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Annulé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (view === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Projets</h1>
          {(currentUser.role === 'admin' || currentUser.role === 'chef_projet') && (
            <Button onClick={() => setView('create')} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nouveau Projet
            </Button>
          )}
        </div>

        {/* Filtres */}
        <Card className="p-4">
          <div className="flex gap-4">
            <select className="px-3 py-2 border rounded-md">
              <option value="">Tous les clients</option>
              <option value="techcorp">TechCorp</option>
              <option value="startupxyz">StartupXYZ</option>
              <option value="designco">DesignCo</option>
            </select>
            <select className="px-3 py-2 border rounded-md">
              <option value="">Tous les statuts</option>
              <option value="en_cours">En cours</option>
              <option value="termine">Terminé</option>
              <option value="en_attente">En attente</option>
            </select>
          </div>
        </Card>

        {/* Liste des projets */}
        <div className="grid gap-6">
          {projects.map(project => (
            <Card key={project.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p className="text-gray-600">Client: {project.client}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setView('show')}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {(currentUser.role === 'admin' || currentUser.role === 'chef_projet') && (
                      <Button variant="outline" size="sm" onClick={() => setView('edit')}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{project.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Début</p>
                  <p className="font-medium">{project.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fin prévue</p>
                  <p className="font-medium">{project.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium">{project.budget.toLocaleString()} €</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Équipe</p>
                  <p className="font-medium">{project.teamSize} membres</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progression</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
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
          <h1 className="text-3xl font-bold text-gray-900">Nouveau Projet</h1>
        </div>

        <Card className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nom du projet</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Nom du projet"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Client</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option value="">Sélectionner un client</option>
                  <option value="techcorp">TechCorp</option>
                  <option value="startupxyz">StartupXYZ</option>
                  <option value="designco">DesignCo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea 
                className="w-full px-3 py-2 border rounded-md h-24"
                placeholder="Description du projet"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Date de début</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date de fin prévue</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Budget (€)</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit">Créer le projet</Button>
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
        <h1 className="text-3xl font-bold text-gray-900">
          {view === 'show' ? 'Détails du Projet' : 'Modifier le Projet'}
        </h1>
      </div>
      <Card className="p-6">
        <p className="text-gray-600">Vue {view} en cours de développement...</p>
      </Card>
    </div>
  );
};

export default ProjectsModule;


import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

interface DashboardProps {
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

const Dashboard = ({ currentUser }: DashboardProps) => {
  // Données statiques
  const stats = {
    projets: { total: 12, actifs: 8, termines: 4 },
    taches: { total: 45, completees: 32, en_cours: 13 },
    equipes: { total: 5, membres: 23 },
    notifications: { non_lues: 7 }
  };

  const recentProjects = [
    { id: 1, name: 'Site E-commerce', progress: 75, status: 'En cours', client: 'TechCorp' },
    { id: 2, name: 'App Mobile', progress: 45, status: 'En cours', client: 'StartupXYZ' },
    { id: 3, name: 'Refonte UI', progress: 90, status: 'En cours', client: 'DesignCo' },
  ];

  const recentTasks = [
    { id: 1, title: 'Intégration API paiement', project: 'Site E-commerce', due: '2024-06-15' },
    { id: 2, title: 'Tests utilisateurs', project: 'App Mobile', due: '2024-06-12' },
    { id: 3, title: 'Validation design', project: 'Refonte UI', due: '2024-06-10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Tableau de bord - {currentUser.name}
        </h1>
        <div className="text-sm text-gray-500">
          Rôle: <span className="capitalize font-medium">{currentUser.role.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-700">Projets</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.projets.total}</p>
          <p className="text-sm text-gray-500">{stats.projets.actifs} actifs</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-700">Tâches</h3>
          <p className="text-3xl font-bold text-green-600">{stats.taches.total}</p>
          <p className="text-sm text-gray-500">{stats.taches.completees} terminées</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-700">Équipes</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.equipes.total}</p>
          <p className="text-sm text-gray-500">{stats.equipes.membres} membres</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-700">Notifications</h3>
          <p className="text-3xl font-bold text-red-600">{stats.notifications.non_lues}</p>
          <p className="text-sm text-gray-500">non lues</p>
        </Card>
      </div>

      {/* Projets récents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Projets récents</h2>
          <div className="space-y-4">
            {recentProjects.map(project => (
              <div key={project.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{project.name}</h3>
                  <span className="text-sm text-gray-500">{project.client}</span>
                </div>
                <div className="mb-2">
                  <Progress value={project.progress} className="h-2" />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{project.progress}% complété</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Tâches à venir</h2>
          <div className="space-y-4">
            {recentTasks.map(task => (
              <div key={task.id} className="border-b pb-4 last:border-b-0">
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.project}</p>
                <p className="text-xs text-gray-500 mt-1">Échéance: {task.due}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

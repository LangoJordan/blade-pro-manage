
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Clock, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';

interface DashboardProps {
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

const Dashboard = ({ currentUser }: DashboardProps) => {
  // Données dynamiques selon le rôle
  const getStatsForRole = (role: string) => {
    switch (role) {
      case 'admin':
        return {
          projets: { total: 15, actifs: 10, termines: 5, en_attente: 2 },
          taches: { total: 89, completees: 65, en_cours: 18, en_retard: 6 },
          equipes: { total: 8, membres: 45 },
          notifications: { non_lues: 12 }
        };
      case 'chef_projet':
        return {
          projets: { total: 5, actifs: 3, termines: 2, en_attente: 1 },
          taches: { total: 34, completees: 25, en_cours: 7, en_retard: 2 },
          equipes: { total: 3, membres: 15 },
          notifications: { non_lues: 7 }
        };
      case 'chef_equipe':
        return {
          projets: { total: 2, actifs: 2, termines: 0, en_attente: 0 },
          taches: { total: 18, completees: 12, en_cours: 5, en_retard: 1 },
          equipes: { total: 1, membres: 6 },
          notifications: { non_lues: 4 }
        };
      case 'employe':
        return {
          projets: { total: 3, actifs: 2, termines: 1, en_attente: 0 },
          taches: { total: 12, completees: 8, en_cours: 3, en_retard: 1 },
          equipes: { total: 2, membres: 8 },
          notifications: { non_lues: 3 }
        };
      case 'client':
        return {
          projets: { total: 2, actifs: 1, termines: 1, en_attente: 0 },
          taches: { total: 0, completees: 0, en_cours: 0, en_retard: 0 },
          equipes: { total: 0, membres: 0 },
          notifications: { non_lues: 2 }
        };
      default:
        return {
          projets: { total: 0, actifs: 0, termines: 0, en_attente: 0 },
          taches: { total: 0, completees: 0, en_cours: 0, en_retard: 0 },
          equipes: { total: 0, membres: 0 },
          notifications: { non_lues: 0 }
        };
    }
  };

  const stats = getStatsForRole(currentUser.role);

  const recentProjects = [
    { id: 1, name: 'Site E-commerce', progress: 75, status: 'En cours', client: 'TechCorp', priority: 'haute' },
    { id: 2, name: 'App Mobile', progress: 45, status: 'En cours', client: 'StartupXYZ', priority: 'moyenne' },
    { id: 3, name: 'Refonte UI', progress: 90, status: 'En cours', client: 'DesignCo', priority: 'basse' },
  ];

  const recentTasks = [
    { id: 1, title: 'Intégration API paiement', project: 'Site E-commerce', due: '2024-06-15', priority: 'haute' },
    { id: 2, title: 'Tests utilisateurs', project: 'App Mobile', due: '2024-06-12', priority: 'moyenne' },
    { id: 3, title: 'Validation design', project: 'Refonte UI', due: '2024-06-10', priority: 'basse' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'haute': return 'bg-red-100 text-red-800 border-red-200';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'basse': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec informations utilisateur */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Bonjour, {currentUser.name} 👋
            </h1>
            <p className="text-purple-100 capitalize">
              {currentUser.role.replace('_', ' ')} - Tableau de bord personnel
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-purple-100">Aujourd'hui</div>
            <div className="text-lg font-semibold">{new Date().toLocaleDateString('fr-FR')}</div>
          </div>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Projets</p>
              <p className="text-2xl font-bold text-gray-900">{stats.projets.total}</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {stats.projets.actifs} actifs
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tâches</p>
              <p className="text-2xl font-bold text-gray-900">{stats.taches.total}</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                {stats.taches.completees} terminées
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
        
        {currentUser.role !== 'client' && (
          <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Équipes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.equipes.total}</p>
                <p className="text-xs text-purple-600 flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {stats.equipes.membres} membres
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>
        )}
        
        <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Notifications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.notifications.non_lues}</p>
              <p className="text-xs text-orange-600 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                non lues
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Projets et tâches récents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Projets récents</h2>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {stats.projets.actifs} actifs
            </Badge>
          </div>
          <div className="space-y-4">
            {recentProjects.slice(0, currentUser.role === 'client' ? 2 : 3).map(project => (
              <div key={project.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.client}</p>
                  </div>
                  <Badge className={getPriorityColor(project.priority)} variant="outline">
                    {project.priority}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progression</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {currentUser.role !== 'client' && (
          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Tâches à venir</h2>
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                {stats.taches.en_cours} en cours
              </Badge>
            </div>
            <div className="space-y-4">
              {recentTasks.map(task => (
                <div key={task.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <Badge className={getPriorityColor(task.priority)} variant="outline">
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.project}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    Échéance: {task.due}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {currentUser.role === 'client' && (
          <Card className="p-6 border-0 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Mes projets</h2>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Accès client
              </Badge>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-gray-900 mb-2">Site E-commerce TechCorp</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progression globale</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-gray-600">Phase actuelle: Développement backend</p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h3 className="font-medium text-gray-900 mb-2">Refonte identité visuelle</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progression globale</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <p className="text-xs text-green-600">✓ Projet terminé</p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Calendar, User } from 'lucide-react';

interface TasksModuleProps {
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

const TasksModule = ({ currentUser }: TasksModuleProps) => {
  const [view, setView] = useState('list');
  const [filter, setFilter] = useState('all');

  // Données statiques des tâches
  const tasks = [
    {
      id: 1,
      title: 'Intégration API de paiement',
      description: 'Intégrer Stripe pour les paiements en ligne',
      project: 'Site E-commerce TechCorp',
      assignee: 'Marie Martin',
      status: 'En cours',
      priority: 'Haute',
      dueDate: '2024-06-15',
      completed: false,
      dependencies: []
    },
    {
      id: 2,
      title: 'Tests utilisateurs interface mobile',
      description: 'Effectuer les tests d\'utilisabilité sur l\'app mobile',
      project: 'App Mobile StartupXYZ',
      assignee: 'Pierre Dubois',
      status: 'À faire',
      priority: 'Moyenne',
      dueDate: '2024-06-20',
      completed: false,
      dependencies: [1]
    },
    {
      id: 3,
      title: 'Validation design homepage',
      description: 'Valider les maquettes de la page d\'accueil',
      project: 'Refonte UI DesignCo',
      assignee: 'Sophie Leroy',
      status: 'Terminé',
      priority: 'Basse',
      dueDate: '2024-06-01',
      completed: true,
      dependencies: []
    },
    {
      id: 4,
      title: 'Documentation technique API',
      description: 'Rédiger la documentation complète de l\'API',
      project: 'Site E-commerce TechCorp',
      assignee: 'Jean Dupont',
      status: 'En cours',
      priority: 'Moyenne',
      dueDate: '2024-06-18',
      completed: false,
      dependencies: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'À faire': return 'bg-gray-100 text-gray-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'Terminé': return 'bg-green-100 text-green-800';
      case 'Bloqué': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute': return 'bg-red-100 text-red-800';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'Basse': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'my') return task.assignee === currentUser.name;
    if (filter === 'todo') return task.status === 'À faire';
    if (filter === 'progress') return task.status === 'En cours';
    if (filter === 'done') return task.status === 'Terminé';
    return true;
  });

  if (view === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Tâches</h1>
          <Button onClick={() => setView('create')} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle Tâche
          </Button>
        </div>

        {/* Filtres */}
        <Card className="p-4">
          <div className="flex gap-4 flex-wrap">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Toutes ({tasks.length})
            </Button>
            <Button 
              variant={filter === 'my' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('my')}
            >
              Mes tâches ({tasks.filter(t => t.assignee === currentUser.name).length})
            </Button>
            <Button 
              variant={filter === 'todo' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('todo')}
            >
              À faire ({tasks.filter(t => t.status === 'À faire').length})
            </Button>
            <Button 
              variant={filter === 'progress' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('progress')}
            >
              En cours ({tasks.filter(t => t.status === 'En cours').length})
            </Button>
            <Button 
              variant={filter === 'done' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('done')}
            >
              Terminées ({tasks.filter(t => t.status === 'Terminé').length})
            </Button>
          </div>
        </Card>

        {/* Liste des tâches */}
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <Card key={task.id} className={`p-6 ${task.completed ? 'opacity-75' : ''}`}>
              <div className="flex items-start gap-4">
                <Checkbox 
                  checked={task.completed}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-lg font-semibold ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </h3>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{task.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {task.assignee}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {task.dueDate}
                    </div>
                    <span>Projet: {task.project}</span>
                  </div>
                  
                  {task.dependencies.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-orange-600">
                        Dépend de: Tâche #{task.dependencies.join(', #')}
                      </span>
                    </div>
                  )}
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
          <h1 className="text-3xl font-bold text-gray-900">Nouvelle Tâche</h1>
        </div>

        <Card className="p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Titre de la tâche</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Titre de la tâche"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea 
                className="w-full px-3 py-2 border rounded-md h-24"
                placeholder="Description détaillée de la tâche"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Projet</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option value="">Sélectionner un projet</option>
                  <option value="1">Site E-commerce TechCorp</option>
                  <option value="2">App Mobile StartupXYZ</option>
                  <option value="3">Refonte UI DesignCo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Assigné à</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option value="">Sélectionner une personne</option>
                  <option value="1">Jean Dupont</option>
                  <option value="2">Marie Martin</option>
                  <option value="3">Pierre Dubois</option>
                  <option value="4">Sophie Leroy</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Priorité</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option value="basse">Basse</option>
                  <option value="moyenne">Moyenne</option>
                  <option value="haute">Haute</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Statut</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option value="a_faire">À faire</option>
                  <option value="en_cours">En cours</option>
                  <option value="termine">Terminé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date d'échéance</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit">Créer la tâche</Button>
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

export default TasksModule;

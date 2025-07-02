import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, LayoutGrid, Calendar, List, Filter } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { useProjects } from '@/hooks/useProjects';
import TaskKanban from './TaskKanban';
import TaskGantt from './TaskGantt';
import TaskForm from './TaskForm';

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
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const { tasks, loading, createTask, updateTask } = useTasks();
  const { projects } = useProjects();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'a_faire': return 'bg-gray-100 text-gray-800';
      case 'en_cours': return 'bg-blue-100 text-blue-800';
      case 'termine': return 'bg-green-100 text-green-800';
      case 'bloquee': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'faible': return 'bg-green-100 text-green-800';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'haute': return 'bg-orange-100 text-orange-800';
      case 'critique': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (selectedProject && task.project_id !== selectedProject) return false;
    if (selectedStatus && task.status !== selectedStatus) return false;
    return true;
  });

  if (loading) {
    return <div className="flex items-center justify-center h-64">Chargement des tâches...</div>;
  }

  if (showCreateForm) {
    return (
      <TaskForm
        onSubmit={createTask}
        onCancel={() => setShowCreateForm(false)}
        projects={projects}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Tâches</h1>
        {(currentUser.role === 'admin' || currentUser.role === 'chef_projet' || currentUser.role === 'chef_equipe') && (
          <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle Tâche
          </Button>
        )}
      </div>

      <Tabs value={view} onValueChange={setView} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Liste
          </TabsTrigger>
          <TabsTrigger value="kanban" className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            Kanban
          </TabsTrigger>
          <TabsTrigger value="gantt" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Gantt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">Aucune tâche trouvée</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredTasks.map(task => (
                <Card key={task.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <p className="text-gray-600">{task.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace('_', ' ')}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  {task.progress && (
                    <Progress value={task.progress} className="h-2" />
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="kanban">
          <TaskKanban
            tasks={filteredTasks}
            onUpdateTask={updateTask}
            getStatusColor={getStatusColor}
            getPriorityColor={getPriorityColor}
            getStatusLabel={(s) => s.replace('_', ' ')}
            getPriorityLabel={(p) => p}
          />
        </TabsContent>

        <TabsContent value="gantt">
          <TaskGantt tasks={filteredTasks} projects={projects} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TasksModule;
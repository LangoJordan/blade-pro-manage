import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, User, Clock } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  progress?: number;
  end_date?: string;
  estimated_hours?: number;
  actual_hours?: number;
  assignee?: { name: string };
  projects?: { name: string };
}

interface TaskKanbanProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  getStatusLabel: (status: string) => string;
  getPriorityLabel: (priority: string) => string;
}

const TaskKanban = ({ 
  tasks, 
  onUpdateTask, 
  getStatusColor, 
  getPriorityColor, 
  getStatusLabel, 
  getPriorityLabel 
}: TaskKanbanProps) => {
  const columns = [
    { id: 'a_faire', title: 'À faire', color: 'border-t-gray-400' },
    { id: 'en_cours', title: 'En cours', color: 'border-t-blue-400' },
    { id: 'termine', title: 'Terminé', color: 'border-t-green-400' },
    { id: 'bloquee', title: 'Bloqué', color: 'border-t-red-400' }
  ];

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    await onUpdateTask(taskId, { status: newStatus as any });
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map(column => {
        const columnTasks = getTasksByStatus(column.id);
        
        return (
          <div key={column.id} className="space-y-4">
            <div className={`border-t-4 ${column.color} bg-white rounded-lg p-4 shadow-sm`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <Badge variant="outline" className="bg-gray-50">
                  {columnTasks.length}
                </Badge>
              </div>
              
              <div
                className="space-y-3 min-h-[500px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {columnTasks.map(task => (
                  <Card
                    key={task.id}
                    className="p-4 cursor-move hover:shadow-md transition-shadow border-l-4 border-l-purple-200"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight">
                          {task.title}
                        </h4>
                        <Badge className={getPriorityColor(task.priority)} variant="outline">
                          {getPriorityLabel(task.priority)}
                        </Badge>
                      </div>
                      
                      {task.description && (
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {task.description}
                        </p>
                      )}
                      
                      <div className="space-y-2">
                        {task.projects && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>📁</span>
                            <span className="truncate">{task.projects.name}</span>
                          </div>
                        )}
                        
                        {task.assignee && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <User className="h-3 w-3" />
                            <span className="truncate">{task.assignee.name}</span>
                          </div>
                        )}
                        
                        {task.end_date && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(task.end_date).toLocaleDateString('fr-FR')}</span>
                          </div>
                        )}
                        
                        {task.estimated_hours && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{task.estimated_hours}h estimé</span>
                            {task.actual_hours && <span>/ {task.actual_hours}h réalisé</span>}
                          </div>
                        )}
                      </div>
                      
                      {task.progress !== undefined && task.progress > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Progression</span>
                            <span className="font-medium">{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-1" />
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
                
                {columnTasks.length === 0 && (
                  <div className="flex items-center justify-center h-32 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                    Glissez une tâche ici
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskKanban;
import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  start_date?: string;
  end_date?: string;
  progress?: number;
  projects?: { name: string };
  assignee?: { name: string };
}

interface Project {
  id: string;
  name: string;
}

interface TaskGanttProps {
  tasks: Task[];
  projects: Project[];
}

const TaskGantt = ({ tasks, projects }: TaskGanttProps) => {
  const ganttData = useMemo(() => {
    if (tasks.length === 0) return { tasksWithDates: [], timespan: { start: new Date(), end: new Date() } };

    // Filtrer les tâches qui ont des dates
    const tasksWithDates = tasks.filter(task => task.start_date && task.end_date);
    
    if (tasksWithDates.length === 0) {
      return { tasksWithDates: [], timespan: { start: new Date(), end: new Date() } };
    }

    // Calculer la période totale
    const dates = tasksWithDates.flatMap(task => [
      new Date(task.start_date!),
      new Date(task.end_date!)
    ]);
    
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    
    // Ajouter une marge
    minDate.setDate(minDate.getDate() - 7);
    maxDate.setDate(maxDate.getDate() + 7);

    return {
      tasksWithDates,
      timespan: { start: minDate, end: maxDate }
    };
  }, [tasks]);

  const { tasksWithDates, timespan } = ganttData;

  if (tasksWithDates.length === 0) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Diagramme de Gantt</h3>
        <p className="text-gray-500">
          Aucune tâche avec des dates de début et de fin trouvée.
          <br />
          Ajoutez des dates aux tâches pour voir le diagramme de Gantt.
        </p>
      </Card>
    );
  }

  const totalDays = Math.ceil((timespan.end.getTime() - timespan.start.getTime()) / (1000 * 60 * 60 * 24));
  
  const getTaskPosition = (task: Task) => {
    const startDate = new Date(task.start_date!);
    const endDate = new Date(task.end_date!);
    const taskStart = Math.ceil((startDate.getTime() - timespan.start.getTime()) / (1000 * 60 * 60 * 24));
    const taskDuration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    return {
      left: `${(taskStart / totalDays) * 100}%`,
      width: `${(taskDuration / totalDays) * 100}%`
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'a_faire': return 'bg-gray-400';
      case 'en_cours': return 'bg-blue-500';
      case 'termine': return 'bg-green-500';
      case 'bloquee': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'faible': return 'border-green-400';
      case 'moyenne': return 'border-yellow-400';
      case 'haute': return 'border-orange-400';
      case 'critique': return 'border-red-400';
      default: return 'border-gray-400';
    }
  };

  // Générer les colonnes de dates (par semaines)
  const dateColumns = [];
  const currentDate = new Date(timespan.start);
  
  while (currentDate <= timespan.end) {
    dateColumns.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 7);
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Diagramme de Gantt</h3>
        <p className="text-sm text-gray-600">
          Période: {timespan.start.toLocaleDateString('fr-FR')} - {timespan.end.toLocaleDateString('fr-FR')}
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* En-tête avec les dates */}
          <div className="grid grid-cols-12 gap-px mb-4 bg-gray-100 p-3 rounded-lg">
            <div className="col-span-4 font-semibold text-sm text-gray-700">Tâche</div>
            <div className="col-span-8">
              <div className="grid grid-cols-8 gap-1 text-xs text-gray-600">
                {dateColumns.slice(0, 8).map((date, index) => (
                  <div key={index} className="text-center">
                    {date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tâches */}
          <div className="space-y-3">
            {tasksWithDates.map(task => {
              const position = getTaskPosition(task);
              
              return (
                <div key={task.id} className="grid grid-cols-12 gap-px items-center min-h-[60px] p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  {/* Informations de la tâche */}
                  <div className="col-span-4 pr-4">
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{task.title}</h4>
                    <div className="flex flex-wrap gap-1 mb-1">
                      <Badge className={`text-xs ${getStatusColor(task.status)} text-white`}>
                        {task.status.replace('_', ' ')}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500">
                      {task.projects?.name}
                      {task.assignee && ` • ${task.assignee.name}`}
                    </div>
                  </div>
                  
                  {/* Barre de Gantt */}
                  <div className="col-span-8 relative h-8">
                    <div className="absolute inset-0 bg-gray-100 rounded"></div>
                    <div
                      className={`absolute h-6 top-1 rounded ${getStatusColor(task.status)} ${getPriorityColor(task.priority)} border-l-4 shadow-sm`}
                      style={position}
                    >
                      <div className="h-full relative">
                        {task.progress && task.progress > 0 && (
                          <div
                            className="h-full bg-white/30 rounded-r"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-white font-medium">
                            {task.progress || 0}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Dates */}
                    <div className="absolute -bottom-4 left-0 text-xs text-gray-500">
                      {new Date(task.start_date!).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                    </div>
                    <div className="absolute -bottom-4 right-0 text-xs text-gray-500">
                      {new Date(task.end_date!).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Légende */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-medium text-sm text-gray-900 mb-3">Légende</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span>À faire</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>En cours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Terminé</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Bloqué</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskGantt;
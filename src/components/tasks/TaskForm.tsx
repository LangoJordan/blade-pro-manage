import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft } from 'lucide-react';

interface Project {
  id: string;
  name: string;
}

interface TaskFormProps {
  onSubmit: (data: any) => Promise<any>;
  onCancel: () => void;
  projects: Project[];
}

const TaskForm = ({ onSubmit, onCancel, projects }: TaskFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_id: '',
    priority: 'moyenne',
    start_date: '',
    end_date: '',
    estimated_hours: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        estimated_hours: formData.estimated_hours ? parseInt(formData.estimated_hours) : undefined
      };

      const { error } = await onSubmit(submitData);
      
      if (error) {
        setError(error.message || 'Une erreur est survenue');
      } else {
        onCancel(); // Retour à la liste
      }
    } catch (err: any) {
      setError('Une erreur est survenue lors de la création de la tâche');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Nouvelle Tâche</h1>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Titre de la tâche *
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Développer la nouvelle fonctionnalité..."
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="project_id" className="text-sm font-medium text-gray-700">
                Projet *
              </Label>
              <select
                id="project_id"
                name="project_id"
                value={formData.project_id}
                onChange={handleInputChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Sélectionner un projet</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description détaillée de la tâche..."
              className="mt-1 h-24"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                Priorité
              </Label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="faible">Faible</option>
                <option value="moyenne">Moyenne</option>
                <option value="haute">Haute</option>
                <option value="critique">Critique</option>
              </select>
            </div>

            <div>
              <Label htmlFor="start_date" className="text-sm font-medium text-gray-700">
                Date de début
              </Label>
              <Input
                id="start_date"
                name="start_date"
                type="date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="end_date" className="text-sm font-medium text-gray-700">
                Date de fin
              </Label>
              <Input
                id="end_date"
                name="end_date"
                type="date"
                value={formData.end_date}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="estimated_hours" className="text-sm font-medium text-gray-700">
              Heures estimées
            </Label>
            <Input
              id="estimated_hours"
              name="estimated_hours"
              type="number"
              value={formData.estimated_hours}
              onChange={handleInputChange}
              placeholder="40"
              min="1"
              className="mt-1 max-w-xs"
            />
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600"
            >
              {isLoading ? 'Création...' : 'Créer la tâche'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TaskForm;
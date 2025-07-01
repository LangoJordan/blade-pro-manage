import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, Edit, Plus, Trash2 } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { useAuth } from '@/hooks/useAuth';
import ProjectForm from './ProjectForm';

interface ProjectsModuleNewProps {
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

const ProjectsModuleNew = ({ currentUser }: ProjectsModuleNewProps) => {
  const [view, setView] = useState('list');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { projects, loading, createProject, updateProject, deleteProject } = useProjects();
  const { user } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_cours': return 'bg-blue-100 text-blue-800';
      case 'termine': return 'bg-green-100 text-green-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'annule': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'en_cours': return 'En cours';
      case 'termine': return 'Terminé';
      case 'en_attente': return 'En attente';
      case 'annule': return 'Annulé';
      default: return status;
    }
  };

  const canManageProjects = currentUser.role === 'admin' || currentUser.role === 'chef_projet';

  const handleCreateProject = async (data: any) => {
    const result = await createProject(data);
    if (!result.error) {
      setView('list');
    }
  };

  const handleUpdateProject = async (data: any) => {
    if (selectedProject) {
      await updateProject(selectedProject.id, data);
      setView('list');
      setSelectedProject(null);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      await deleteProject(projectId);
    }
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'Non défini';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non définie';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Chargement des projets...</div>
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
        <ProjectForm onSubmit={handleCreateProject} onCancel={() => setView('list')} />
      </div>
    );
  }

  if (view === 'edit' && selectedProject) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setView('list')}>
            ← Retour
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Modifier le Projet</h1>
        </div>
        <ProjectForm 
          onSubmit={handleUpdateProject} 
          onCancel={() => setView('list')}
          initialData={selectedProject}
        />
      </div>
    );
  }

  if (view === 'show' && selectedProject) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setView('list')}>
            ← Retour
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Détails du Projet</h1>
        </div>
        
        <Card className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{selectedProject.name}</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-600">Client:</span>
                  <p>{selectedProject.clients?.name || 'Non assigné'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Manager:</span>
                  <p>{selectedProject.profiles?.name || 'Non assigné'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Équipe:</span>
                  <p>{selectedProject.teams?.name || 'Non assignée'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Description:</span>
                  <p>{selectedProject.description || 'Aucune description'}</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="space-y-4">
                <div>
                  <span className="font-medium text-gray-600">Statut:</span>
                  <Badge className={`ml-2 ${getStatusColor(selectedProject.status)}`}>
                    {getStatusLabel(selectedProject.status)}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Budget:</span>
                  <p className="text-lg font-semibold">{formatCurrency(selectedProject.budget)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Date de début:</span>
                  <p>{formatDate(selectedProject.start_date)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Date de fin:</span>
                  <p>{formatDate(selectedProject.end_date)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Progression:</span>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Avancement</span>
                      <span>{selectedProject.progress}%</span>
                    </div>
                    <Progress value={selectedProject.progress} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {canManageProjects && (
            <div className="mt-6 flex gap-3">
              <Button onClick={() => setView('edit')}>
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteProject(selectedProject.id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Projets</h1>
        {canManageProjects && (
          <Button onClick={() => setView('create')} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouveau Projet
          </Button>
        )}
      </div>

      {projects.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 text-lg">Aucun projet trouvé</p>
          {canManageProjects && (
            <Button onClick={() => setView('create')} className="mt-4">
              Créer le premier projet
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid gap-6">
          {projects.map(project => (
            <Card key={project.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p className="text-gray-600">
                    Client: {project.clients?.name || 'Non assigné'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Manager: {project.profiles?.name || 'Non assigné'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusLabel(project.status)}
                  </Badge>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedProject(project);
                        setView('show');
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {canManageProjects && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setSelectedProject(project);
                          setView('edit');
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {project.description && (
                <p className="text-gray-700 mb-4">{project.description}</p>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Début</p>
                  <p className="font-medium">{formatDate(project.start_date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fin prévue</p>
                  <p className="font-medium">{formatDate(project.end_date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium">{formatCurrency(project.budget)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Équipe</p>
                  <p className="font-medium">{project.teams?.name || 'Non assignée'}</p>
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
      )}
    </div>
  );
};

export default ProjectsModuleNew;
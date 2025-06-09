
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, Eye } from 'lucide-react';

interface ClientModuleProps {
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

const ClientModule = ({ currentUser }: ClientModuleProps) => {
  const [view, setView] = useState('projects'); // projects, project_detail, comments

  // Données statiques pour l'espace client
  const clientProjects = [
    {
      id: 1,
      name: 'Site E-commerce TechCorp',
      description: 'Développement d\'un site e-commerce moderne avec paiement en ligne',
      status: 'En cours',
      progress: 75,
      startDate: '2024-01-15',
      estimatedEndDate: '2024-07-15',
      budget: 50000,
      spent: 37500,
      phases: [
        { name: 'Analyse et conception', progress: 100, status: 'Terminé' },
        { name: 'Développement Frontend', progress: 85, status: 'En cours' },
        { name: 'Développement Backend', progress: 70, status: 'En cours' },
        { name: 'Tests et intégration', progress: 20, status: 'À faire' },
        { name: 'Déploiement', progress: 0, status: 'À faire' }
      ],
      lastUpdate: '2024-06-09',
      nextMilestone: 'Livraison version bêta - 2024-06-20'
    }
  ];

  const comments = [
    {
      id: 1,
      author: 'Client TechCorp',
      content: 'Très satisfait de l\'avancement du projet. La nouvelle interface est très moderne.',
      date: '2024-06-08 14:30',
      response: {
        author: 'Marie Martin',
        content: 'Merci pour votre retour positif ! Nous continuons sur cette lancée.',
        date: '2024-06-08 15:45'
      }
    },
    {
      id: 2,
      author: 'Client TechCorp',
      content: 'Pourriez-vous ajouter une fonctionnalité de wishlist sur le site ?',
      date: '2024-06-07 10:15',
      response: {
        author: 'Jean Dupont',
        content: 'Nous ajoutons cette fonctionnalité à la liste. Elle sera intégrée dans la prochaine phase.',
        date: '2024-06-07 11:30'
      }
    }
  ];

  if (view === 'projects') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Mes Projets</h1>
          <Badge className="bg-blue-100 text-blue-800">
            {clientProjects.length} projet(s) actif(s)
          </Badge>
        </div>

        {/* Liste des projets du client */}
        <div className="space-y-6">
          {clientProjects.map(project => (
            <Card key={project.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold">{project.name}</h3>
                  <p className="text-gray-600 mt-2">{project.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    {project.status}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setView('project_detail')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Détails
                  </Button>
                </div>
              </div>

              {/* Progression globale */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Progression globale</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>

              {/* Informations projet */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Début</p>
                  <p className="font-medium">{project.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fin prévue</p>
                  <p className="font-medium">{project.estimatedEndDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium">{project.budget.toLocaleString()} €</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dépensé</p>
                  <p className="font-medium">{project.spent.toLocaleString()} €</p>
                </div>
              </div>

              {/* Dernière mise à jour */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-900">Dernière mise à jour</p>
                <p className="text-blue-700">{project.lastUpdate}</p>
                <p className="text-sm text-blue-600 mt-2">
                  <strong>Prochain jalon :</strong> {project.nextMilestone}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-4">
                <Button 
                  variant="outline"
                  onClick={() => setView('comments')}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Commentaires
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'project_detail') {
    const project = clientProjects[0];
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setView('projects')}>
            ← Retour aux projets
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
        </div>

        {/* Détail des phases */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Progression par phase</h2>
          <div className="space-y-4">
            {project.phases.map((phase, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{phase.name}</h3>
                  <Badge className={
                    phase.status === 'Terminé' ? 'bg-green-100 text-green-800' :
                    phase.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {phase.status}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progression</span>
                  <span>{phase.progress}%</span>
                </div>
                <Progress value={phase.progress} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Budget détaillé */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Suivi budgétaire</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{project.budget.toLocaleString()} €</p>
              <p className="text-sm text-gray-600">Budget total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{project.spent.toLocaleString()} €</p>
              <p className="text-sm text-gray-600">Dépensé</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{(project.budget - project.spent).toLocaleString()} €</p>
              <p className="text-sm text-gray-600">Restant</p>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={(project.spent / project.budget) * 100} className="h-3" />
          </div>
        </Card>
      </div>
    );
  }

  if (view === 'comments') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setView('projects')}>
            ← Retour aux projets
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Commentaires et échanges</h1>
        </div>

        {/* Formulaire nouveau commentaire */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Nouveau commentaire</h2>
          <form className="space-y-4">
            <textarea 
              className="w-full px-3 py-2 border rounded-md h-24"
              placeholder="Votre commentaire ou question..."
            ></textarea>
            <Button type="submit">Envoyer le commentaire</Button>
          </form>
        </Card>

        {/* Historique des commentaires */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Historique des échanges</h2>
          {comments.map(comment => (
            <Card key={comment.id} className="p-6">
              <div className="space-y-4">
                {/* Commentaire initial */}
                <div className="border-l-4 border-l-blue-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{comment.author}</h4>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>

                {/* Réponse */}
                {comment.response && (
                  <div className="border-l-4 border-l-green-500 pl-4 ml-8 bg-green-50 p-3 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-green-800">{comment.response.author}</h4>
                      <span className="text-sm text-green-600">{comment.response.date}</span>
                    </div>
                    <p className="text-green-700">{comment.response.content}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default ClientModule;

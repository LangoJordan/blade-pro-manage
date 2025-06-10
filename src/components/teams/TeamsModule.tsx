
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Users, Edit, Trash2, UserPlus, Mail, Phone, MapPin } from 'lucide-react';

interface TeamsModuleProps {
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

const TeamsModule = ({ currentUser }: TeamsModuleProps) => {
  const [view, setView] = useState('list');
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  const teams = [
    {
      id: 1,
      name: "Équipe Frontend",
      project: "Site E-commerce TechCorp",
      leader: "Pierre Dubois",
      members: [
        { id: 1, name: "Sophie Leroy", role: "Développeur Frontend", email: "sophie.leroy@email.com", phone: "06.45.67.89.01", status: "Actif" },
        { id: 2, name: "Lucas Bernard", role: "Designer UI/UX", email: "lucas.bernard@email.com", phone: "06.56.78.90.12", status: "Actif" },
        { id: 3, name: "Emma Petit", role: "Développeur React", email: "emma.petit@email.com", phone: "06.67.89.01.23", status: "Actif" }
      ],
      description: "Équipe responsable du développement de l'interface utilisateur",
      createdAt: "2024-01-15",
      skills: ["React", "TypeScript", "Tailwind CSS", "Figma"]
    },
    {
      id: 2,
      name: "Équipe Backend",
      project: "Site E-commerce TechCorp",
      leader: "Marie Martin",
      members: [
        { id: 4, name: "Thomas Moreau", role: "Développeur Backend", email: "thomas.moreau@email.com", phone: "06.78.90.12.34", status: "Actif" },
        { id: 5, name: "Julie Roux", role: "DevOps", email: "julie.roux@email.com", phone: "06.89.01.23.45", status: "Inactif" }
      ],
      description: "Équipe en charge de l'architecture backend et de l'infrastructure",
      createdAt: "2024-01-20",
      skills: ["Node.js", "PostgreSQL", "Docker", "AWS"]
    },
    {
      id: 3,
      name: "Équipe Mobile",
      project: "App Mobile StartupXYZ",
      leader: "Pierre Dubois",
      members: [
        { id: 6, name: "Alex Durand", role: "Développeur Mobile", email: "alex.durand@email.com", phone: "06.90.12.34.56", status: "Actif" },
        { id: 7, name: "Chloe Martin", role: "QA Tester", email: "chloe.martin@email.com", phone: "06.01.23.45.67", status: "Actif" }
      ],
      description: "Équipe dédiée au développement de l'application mobile",
      createdAt: "2024-02-01",
      skills: ["React Native", "Swift", "Kotlin", "Firebase"]
    }
  ];

  const getAccessLevel = (role: string) => {
    if (role === 'admin' || role === 'chef_projet') return 'full';
    if (role === 'chef_equipe') return 'limited';
    return 'read';
  };

  const accessLevel = getAccessLevel(currentUser.role);
  const filteredTeams = currentUser.role === 'client' ? [] : teams;

  if (view === 'create' && accessLevel === 'full') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setView('list')}>
            ← Retour
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Créer une nouvelle équipe</h1>
        </div>

        <Card className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="teamName">Nom de l'équipe</Label>
                <Input id="teamName" placeholder="Ex: Équipe Frontend" />
              </div>
              <div>
                <Label htmlFor="project">Projet associé</Label>
                <select id="project" className="w-full px-3 py-2 border rounded-md">
                  <option value="">Sélectionner un projet</option>
                  <option value="1">Site E-commerce TechCorp</option>
                  <option value="2">App Mobile StartupXYZ</option>
                  <option value="3">Refonte UI DesignCo</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="leader">Chef d'équipe</Label>
              <select id="leader" className="w-full px-3 py-2 border rounded-md">
                <option value="">Sélectionner un chef d'équipe</option>
                <option value="1">Pierre Dubois</option>
                <option value="2">Marie Martin</option>
                <option value="3">Sophie Leroy</option>
              </select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea 
                id="description" 
                className="w-full px-3 py-2 border rounded-md h-24"
                placeholder="Description de l'équipe et de ses responsabilités..."
              />
            </div>

            <div>
              <Label>Compétences requises</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {['React', 'Node.js', 'Python', 'Docker', 'AWS', 'Figma', 'TypeScript'].map(skill => (
                  <label key={skill} className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit">Créer l'équipe</Button>
              <Button variant="outline" onClick={() => setView('list')}>
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  if (view === 'details' && selectedTeam) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setView('list')}>
              ← Retour
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">{selectedTeam.name}</h1>
          </div>
          {accessLevel === 'full' && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
              <Button variant="outline" size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Ajouter membre
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Membres de l'équipe</h2>
              <div className="space-y-4">
                {selectedTeam.members.map((member: any) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
                        {member.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {member.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={member.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {member.status}
                      </Badge>
                      {accessLevel === 'full' && (
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Informations générales</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Projet</p>
                  <p className="font-medium">{selectedTeam.project}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Chef d'équipe</p>
                  <p className="font-medium">{selectedTeam.leader}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Créée le</p>
                  <p className="font-medium">{selectedTeam.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Membres</p>
                  <p className="font-medium">{selectedTeam.members.length} personnes</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Compétences</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTeam.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Description</h3>
              <p className="text-gray-600">{selectedTeam.description}</p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Équipes</h1>
        {accessLevel === 'full' && (
          <Button onClick={() => setView('create')} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle Équipe
          </Button>
        )}
      </div>

      {currentUser.role === 'client' ? (
        <Card className="p-8 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Accès limité</h3>
          <p className="text-gray-600">En tant que client, vous n'avez pas accès à la gestion des équipes.</p>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredTeams.map(team => (
            <Card key={team.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{team.name}</h3>
                  <p className="text-gray-600 mt-1">{team.project}</p>
                  <p className="text-sm text-gray-500 mt-2">{team.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedTeam(team);
                      setView('details');
                    }}
                  >
                    Voir détails
                  </Button>
                  {accessLevel === 'full' && (
                    <>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Chef d'équipe</p>
                  <p className="font-medium">{team.leader}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Membres</p>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{team.members.length} personnes</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Compétences principales</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {team.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {team.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{team.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamsModule;

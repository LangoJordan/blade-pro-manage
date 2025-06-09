
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Dashboard from '@/components/dashboard/Dashboard';
import ProjectsModule from '@/components/projects/ProjectsModule';
import TeamsModule from '@/components/teams/TeamsModule';
import TasksModule from '@/components/tasks/TasksModule';
import MessagesModule from '@/components/messages/MessagesModule';
import UsersModule from '@/components/users/UsersModule';
import NotificationsModule from '@/components/notifications/NotificationsModule';
import ClientModule from '@/components/client/ClientModule';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, ChevronDown } from 'lucide-react';

const Index = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  
  // Utilisateurs prédéfinis pour explorer différents rôles
  const predefinedUsers = [
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      role: 'admin',
      avatar: 'JD'
    },
    {
      id: 2,
      name: 'Marie Martin',
      email: 'marie.martin@email.com',
      role: 'chef_projet',
      avatar: 'MM'
    },
    {
      id: 3,
      name: 'Pierre Dubois',
      email: 'pierre.dubois@email.com',
      role: 'chef_equipe',
      avatar: 'PD'
    },
    {
      id: 4,
      name: 'Sophie Leroy',
      email: 'sophie.leroy@email.com',
      role: 'employe',
      avatar: 'SL'
    },
    {
      id: 5,
      name: 'Client TechCorp',
      email: 'contact@techcorp.com',
      role: 'client',
      avatar: 'CT'
    }
  ];

  const [currentUser, setCurrentUser] = useState(predefinedUsers[0]);

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'chef_projet': return 'Chef de projet';
      case 'chef_equipe': return 'Chef d\'équipe';
      case 'employe': return 'Employé';
      case 'client': return 'Client';
      default: return role;
    }
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard currentUser={currentUser} />;
      case 'projects':
        return <ProjectsModule currentUser={currentUser} />;
      case 'teams':
        return <TeamsModule currentUser={currentUser} />;
      case 'tasks':
        return <TasksModule currentUser={currentUser} />;
      case 'messages':
        return <MessagesModule currentUser={currentUser} />;
      case 'users':
        return <UsersModule currentUser={currentUser} />;
      case 'notifications':
        return <NotificationsModule currentUser={currentUser} />;
      case 'client':
        return <ClientModule currentUser={currentUser} />;
      default:
        return <Dashboard currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule}
        currentUser={currentUser}
      />
      <main className="flex-1 flex flex-col">
        {/* Header avec sélecteur de rôle */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">ProManage</h2>
              <p className="text-sm text-gray-500">Système de gestion de projets</p>
            </div>
            
            {/* Sélecteur de rôle pour démonstration */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowRoleSelector(!showRoleSelector)}
                className="flex items-center gap-2 border-purple-200 hover:border-purple-300"
              >
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {currentUser.avatar}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">{currentUser.name}</div>
                  <div className="text-xs text-gray-500">{getRoleLabel(currentUser.role)}</div>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {showRoleSelector && (
                <Card className="absolute right-0 top-full mt-2 w-64 p-2 shadow-lg z-50">
                  <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-2">
                    Changer de rôle pour explorer l'interface
                  </div>
                  {predefinedUsers.map(user => (
                    <button
                      key={user.id}
                      onClick={() => {
                        setCurrentUser(user);
                        setActiveModule('dashboard');
                        setShowRoleSelector(false);
                      }}
                      className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-left hover:bg-gray-50 ${
                        currentUser.id === user.id ? 'bg-purple-50 border border-purple-200' : ''
                      }`}
                    >
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">{getRoleLabel(user.role)}</div>
                      </div>
                    </button>
                  ))}
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 p-6">
          {renderActiveModule()}
        </div>
      </main>
    </div>
  );
};

export default Index;

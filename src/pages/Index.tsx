
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Dashboard from '@/components/dashboard/Dashboard';
import ProjectsModule from '@/components/projects/ProjectsModule';
import TeamsModule from '@/components/teams/TeamsModule';
import TasksModule from '@/components/tasks/TasksModule';
import MessagesModule from '@/components/messages/MessagesModule';
import UsersModule from '@/components/users/UsersModule';
import NotificationsModule from '@/components/notifications/NotificationsModule';
import ClientModule from '@/components/client/ClientModule';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
    if (!user) return null;

    switch (activeModule) {
      case 'dashboard':
        return <Dashboard currentUser={user} />;
      case 'projects':
        return <ProjectsModule currentUser={user} />;
      case 'teams':
        return <TeamsModule currentUser={user} />;
      case 'tasks':
        return <TasksModule currentUser={user} />;
      case 'messages':
        return <MessagesModule currentUser={user} />;
      case 'users':
        return <UsersModule currentUser={user} />;
      case 'notifications':
        return <NotificationsModule currentUser={user} />;
      case 'client':
        return <ClientModule currentUser={user} />;
      default:
        return <Dashboard currentUser={user} />;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule}
        currentUser={user}
      />
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">ProManage</h2>
              <p className="text-sm text-gray-500">Système de gestion de projets</p>
            </div>
            
            {/* User info and logout */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {user.avatar}
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-gray-500">{getRoleLabel(user.role)}</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {renderActiveModule()}
        </div>
      </main>
    </div>
  );
};

export default Index;

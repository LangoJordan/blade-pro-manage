
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

const Index = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [currentUser] = useState({
    id: 1,
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    role: 'admin' // admin, chef_projet, chef_equipe, employe, client
  });

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
      <main className="flex-1 p-6">
        {renderActiveModule()}
      </main>
    </div>
  );
};

export default Index;

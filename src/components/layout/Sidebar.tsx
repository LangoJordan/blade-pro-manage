
import React from 'react';
import { Home, FolderOpen, Users, CheckSquare, MessageCircle, UserCog, Bell, User } from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

const Sidebar = ({ activeModule, setActiveModule, currentUser }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home, roles: ['admin', 'chef_projet', 'chef_equipe', 'employe', 'client'] },
    { id: 'projects', label: 'Projets', icon: FolderOpen, roles: ['admin', 'chef_projet', 'chef_equipe', 'employe'] },
    { id: 'teams', label: 'Équipes', icon: Users, roles: ['admin', 'chef_projet', 'chef_equipe'] },
    { id: 'tasks', label: 'Tâches', icon: CheckSquare, roles: ['admin', 'chef_projet', 'chef_equipe', 'employe'] },
    { id: 'messages', label: 'Messages', icon: MessageCircle, roles: ['admin', 'chef_projet', 'chef_equipe', 'employe', 'client'] },
    { id: 'users', label: 'Utilisateurs', icon: UserCog, roles: ['admin'] },
    { id: 'notifications', label: 'Notifications', icon: Bell, roles: ['admin', 'chef_projet', 'chef_equipe', 'employe', 'client'] },
    { id: 'client', label: 'Espace Client', icon: User, roles: ['client'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(currentUser.role));

  return (
    <div className="w-64 bg-slate-800 text-white h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-400">ProManage</h1>
        <div className="mt-4 text-sm text-gray-300">
          <p>{currentUser.name}</p>
          <p className="capitalize">{currentUser.role.replace('_', ' ')}</p>
        </div>
      </div>
      
      <nav className="mt-8">
        {filteredItems.map(item => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-slate-700 transition-colors ${
                activeModule === item.id ? 'bg-blue-600 border-r-4 border-blue-400' : ''
              }`}
            >
              <IconComponent className="mr-3 h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;


import React from 'react';
import { Home, FolderOpen, Users, CheckSquare, MessageCircle, UserCog, Bell, User, Settings } from 'lucide-react';

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
    <div className="w-64 bg-white border-r border-gray-200 h-screen shadow-sm">
      {/* Logo et titre */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ProManage
            </h1>
            <p className="text-xs text-gray-500">Gestion de projets</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="py-4">
        <div className="px-3 mb-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu Principal</p>
        </div>
        
        {filteredItems.map(item => {
          const IconComponent = item.icon;
          const isActive = activeModule === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-r-3 border-purple-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className={`mr-3 p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-100 to-blue-100' 
                  : 'group-hover:bg-gray-100'
              }`}>
                <IconComponent className={`h-4 w-4 ${
                  isActive ? 'text-purple-600' : 'text-gray-500 group-hover:text-gray-700'
                }`} />
              </div>
              <span className="font-medium">{item.label}</span>
              
              {isActive && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-600 to-blue-600 rounded-l-full"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Informations utilisateur en bas */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
            <p className="text-xs text-gray-500 capitalize truncate">
              {currentUser.role.replace('_', ' ')}
            </p>
          </div>
          <button className="p-1 hover:bg-gray-200 rounded-md transition-colors">
            <Settings className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

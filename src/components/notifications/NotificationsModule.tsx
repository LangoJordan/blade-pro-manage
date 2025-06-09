
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, CheckCheck, AlertCircle, Info, Calendar } from 'lucide-react';

interface NotificationsModuleProps {
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

const NotificationsModule = ({ currentUser }: NotificationsModuleProps) => {
  const [filter, setFilter] = useState('all');

  // Données statiques des notifications
  const notifications = [
    {
      id: 1,
      title: 'Nouvelle tâche assignée',
      message: 'Marie Martin vous a assigné la tâche "Intégration API paiement"',
      type: 'task',
      read: false,
      timestamp: '2024-06-09 15:30',
      project: 'Site E-commerce TechCorp'
    },
    {
      id: 2,
      title: 'Échéance proche',
      message: 'La tâche "Tests utilisateurs" arrive à échéance demain',
      type: 'deadline',
      read: false,
      timestamp: '2024-06-09 14:15',
      project: 'App Mobile StartupXYZ'
    },
    {
      id: 3,
      title: 'Projet mis à jour',
      message: 'Le statut du projet "Refonte UI DesignCo" a été mis à jour',
      type: 'project',
      read: true,
      timestamp: '2024-06-09 11:20',
      project: 'Refonte UI DesignCo'
    },
    {
      id: 4,
      title: 'Nouveau message',
      message: 'Sophie Leroy a envoyé un message dans le groupe "Équipe Frontend"',
      type: 'message',
      read: false,
      timestamp: '2024-06-09 10:45',
      project: 'Site E-commerce TechCorp'
    },
    {
      id: 5,
      title: 'Réunion programmée',
      message: 'Réunion de suivi projet prévue demain à 14h',
      type: 'meeting',
      read: true,
      timestamp: '2024-06-08 16:30',
      project: 'App Mobile StartupXYZ'
    },
    {
      id: 6,
      title: 'Tâche terminée',
      message: 'Pierre Dubois a marqué la tâche "Validation design" comme terminée',
      type: 'task',
      read: true,
      timestamp: '2024-06-08 14:20',
      project: 'Refonte UI DesignCo'
    },
    {
      id: 7,
      title: 'Commentaire client',
      message: 'Le client TechCorp a ajouté un commentaire sur le projet',
      type: 'comment',
      read: false,
      timestamp: '2024-06-08 09:15',
      project: 'Site E-commerce TechCorp'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task': return <CheckCheck className="h-5 w-5" />;
      case 'deadline': return <AlertCircle className="h-5 w-5" />;
      case 'project': return <Info className="h-5 w-5" />;
      case 'message': return <Bell className="h-5 w-5" />;
      case 'meeting': return <Calendar className="h-5 w-5" />;
      case 'comment': return <Info className="h-5 w-5" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'task': return 'text-green-600 bg-green-100';
      case 'deadline': return 'text-red-600 bg-red-100';
      case 'project': return 'text-blue-600 bg-blue-100';
      case 'message': return 'text-purple-600 bg-purple-100';
      case 'meeting': return 'text-orange-600 bg-orange-100';
      case 'comment': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <div className="flex items-center gap-4">
          <Badge className="bg-red-100 text-red-800">
            {unreadCount} non lues
          </Badge>
          <Button variant="outline" size="sm">
            <Check className="h-4 w-4 mr-2" />
            Marquer tout comme lu
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <Card className="p-4">
        <div className="flex gap-4 flex-wrap">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Toutes ({notifications.length})
          </Button>
          <Button 
            variant={filter === 'unread' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Non lues ({unreadCount})
          </Button>
          <Button 
            variant={filter === 'read' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('read')}
          >
            Lues ({notifications.length - unreadCount})
          </Button>
          <Button 
            variant={filter === 'task' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('task')}
          >
            Tâches
          </Button>
          <Button 
            variant={filter === 'deadline' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('deadline')}
          >
            Échéances
          </Button>
          <Button 
            variant={filter === 'message' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('message')}
          >
            Messages
          </Button>
        </div>
      </Card>

      {/* Liste des notifications */}
      <div className="space-y-4">
        {filteredNotifications.map(notification => (
          <Card 
            key={notification.id} 
            className={`p-4 ${!notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''} cursor-pointer hover:bg-gray-50 transition-colors`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                {getTypeIcon(notification.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notification.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{notification.timestamp}</span>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-2">{notification.message}</p>
                
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-xs">
                    {notification.project}
                  </Badge>
                  
                  {!notification.read && (
                    <Button variant="ghost" size="sm">
                      <Check className="h-4 w-4 mr-1" />
                      Marquer comme lu
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationsModule;

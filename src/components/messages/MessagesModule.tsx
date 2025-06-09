
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Users } from 'lucide-react';

interface MessagesModuleProps {
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

const MessagesModule = ({ currentUser }: MessagesModuleProps) => {
  const [view, setView] = useState('inbox'); // inbox, conversation
  const [selectedConversation, setSelectedConversation] = useState(null);

  // Données statiques des conversations
  const conversations = [
    {
      id: 1,
      type: 'individual',
      name: 'Marie Martin',
      lastMessage: 'Peux-tu vérifier le design de la page produit ?',
      timestamp: '2024-06-09 14:30',
      unread: 2,
      avatar: 'MM'
    },
    {
      id: 2,
      type: 'group',
      name: 'Équipe Frontend - TechCorp',
      lastMessage: 'La nouvelle version est prête pour les tests',
      timestamp: '2024-06-09 11:15',
      unread: 0,
      avatar: 'EF',
      project: 'Site E-commerce TechCorp'
    },
    {
      id: 3,
      type: 'individual',
      name: 'Sophie Leroy',
      lastMessage: 'Les maquettes sont validées par le client',
      timestamp: '2024-06-08 16:45',
      unread: 1,
      avatar: 'SL'
    },
    {
      id: 4,
      type: 'group',
      name: 'Direction Projet - StartupXYZ',
      lastMessage: 'Réunion de suivi demain à 10h',
      timestamp: '2024-06-08 09:20',
      unread: 0,
      avatar: 'DP',
      project: 'App Mobile StartupXYZ'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Marie Martin',
      content: 'Salut Jean, peux-tu vérifier le design de la page produit ?',
      timestamp: '2024-06-09 14:25',
      isOwn: false
    },
    {
      id: 2,
      sender: 'Jean Dupont',
      content: 'Bien sûr, je regarde ça maintenant et je te fais un retour.',
      timestamp: '2024-06-09 14:27',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Marie Martin',
      content: 'Parfait, merci ! Il y a quelques détails sur le formulaire de commande qui me posent question.',
      timestamp: '2024-06-09 14:30',
      isOwn: false
    }
  ];

  if (view === 'inbox') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Messagerie</h1>
          <Badge className="bg-red-100 text-red-800">
            {conversations.reduce((acc, conv) => acc + conv.unread, 0)} non lus
          </Badge>
        </div>

        {/* Filtres */}
        <Card className="p-4">
          <div className="flex gap-4">
            <Button variant="default" size="sm">
              Toutes les conversations
            </Button>
            <Button variant="outline" size="sm">
              Messages individuels
            </Button>
            <Button variant="outline" size="sm">
              Groupes projet
            </Button>
            <Button variant="outline" size="sm">
              Non lus ({conversations.reduce((acc, conv) => acc + conv.unread, 0)})
            </Button>
          </div>
        </Card>

        {/* Liste des conversations */}
        <div className="space-y-4">
          {conversations.map(conversation => (
            <Card 
              key={conversation.id} 
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => {
                setSelectedConversation(conversation);
                setView('conversation');
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
                  {conversation.avatar}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold flex items-center gap-2">
                      {conversation.name}
                      {conversation.type === 'group' && <Users className="h-4 w-4" />}
                    </h3>
                    <span className="text-sm text-gray-500">{conversation.timestamp}</span>
                  </div>
                  
                  {conversation.project && (
                    <p className="text-xs text-blue-600 mb-1">Projet: {conversation.project}</p>
                  )}
                  
                  <p className="text-gray-600 text-sm">{conversation.lastMessage}</p>
                </div>
                
                {conversation.unread > 0 && (
                  <Badge className="bg-red-500 text-white">
                    {conversation.unread}
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'conversation') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setView('inbox')}>
            ← Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              {selectedConversation?.name}
            </h1>
            {selectedConversation?.project && (
              <p className="text-sm text-gray-600">Projet: {selectedConversation.project}</p>
            )}
          </div>
        </div>

        <Card className="h-96 flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isOwn 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {!message.isOwn && (
                    <p className="font-medium text-sm mb-1">{message.sender}</p>
                  )}
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.isOwn ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Zone de saisie */}
          <div className="border-t p-4">
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="Tapez votre message..."
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <Button className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Envoyer
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return null;
};

export default MessagesModule;

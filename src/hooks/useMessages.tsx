import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  subject?: string;
  content: string;
  project_id?: string;
  task_id?: string;
  is_read: boolean;
  created_at: string;
  sender?: {
    name: string;
  };
  receiver?: {
    name: string;
  };
  projects?: {
    name: string;
  };
}

interface CreateMessageData {
  receiver_id: string;
  subject?: string;
  content: string;
  project_id?: string;
  task_id?: string;
}

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey (name),
          receiver:profiles!messages_receiver_id_fkey (name),
          projects (name)
        `)
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);

      // Créer les conversations groupées
      const conversationMap = new Map();
      data?.forEach(message => {
        const otherUserId = message.sender_id === user.id ? message.receiver_id : message.sender_id;
        const otherUserName = message.sender_id === user.id ? message.receiver?.name : message.sender?.name;
        
        if (!conversationMap.has(otherUserId)) {
          conversationMap.set(otherUserId, {
            id: otherUserId,
            name: otherUserName,
            lastMessage: message.content,
            timestamp: message.created_at,
            unread: 0,
            messages: []
          });
        }
        
        const conversation = conversationMap.get(otherUserId);
        conversation.messages.push(message);
        
        if (!message.is_read && message.receiver_id === user.id) {
          conversation.unread++;
        }
      });

      setConversations(Array.from(conversationMap.values()));
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les messages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (messageData: CreateMessageData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utilisateur non connecté");

      const { data, error } = await supabase
        .from('messages')
        .insert([{
          ...messageData,
          sender_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Message envoyé"
      });
      
      fetchMessages();
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'envoyer le message",
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId);

      if (error) throw error;
      fetchMessages();
    } catch (error: any) {
      console.error('Erreur lors du marquage comme lu:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    conversations,
    loading,
    sendMessage,
    markAsRead,
    refetch: fetchMessages
  };
};
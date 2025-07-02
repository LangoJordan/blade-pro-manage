import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description?: string;
  project_id: string;
  created_by: string;
  assigned_to?: string;
  status: 'a_faire' | 'en_cours' | 'termine' | 'bloquee';
  priority: 'faible' | 'moyenne' | 'haute' | 'critique';
  start_date?: string;
  end_date?: string;
  estimated_hours?: number;
  actual_hours?: number;
  progress?: number;
  created_at: string;
  updated_at: string;
  projects?: {
    name: string;
  };
  assignee?: {
    name: string;
  };
  creator?: {
    name: string;
  };
}

interface CreateTaskData {
  title: string;
  description?: string;
  project_id: string;
  assigned_to?: string;
  priority?: 'faible' | 'moyenne' | 'haute' | 'critique';
  start_date?: string;
  end_date?: string;
  estimated_hours?: number;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          projects (name),
          assignee:profiles!tasks_assigned_to_fkey (name),
          creator:profiles!tasks_created_by_fkey (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les tâches",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: CreateTaskData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utilisateur non connecté");

      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          ...taskData,
          created_by: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Tâche créée avec succès"
      });
      
      fetchTasks();
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer la tâche",
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Tâche mise à jour"
      });
      
      fetchTasks();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour la tâche",
        variant: "destructive"
      });
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Tâche supprimée"
      });
      
      fetchTasks();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer la tâche",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks
  };
};
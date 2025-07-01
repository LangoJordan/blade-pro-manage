import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  name: string;
  description?: string;
  client_id?: string;
  manager_id?: string;
  team_id?: string;
  status: 'en_cours' | 'termine' | 'en_attente' | 'annule';
  budget?: number;
  start_date?: string;
  end_date?: string;
  progress: number;
  created_at: string;
  updated_at: string;
  clients?: {
    name: string;
    company?: string;
  };
  profiles?: {
    name: string;
  };
  teams?: {
    name: string;
  };
}

interface CreateProjectData {
  name: string;
  description?: string;
  client_id?: string;
  budget?: number;
  start_date?: string;
  end_date?: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          clients (name, company),
          profiles (name),
          teams (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les projets",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: CreateProjectData) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          ...projectData,
          manager_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Projet créé avec succès"
      });
      
      fetchProjects();
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer le projet",
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Projet mis à jour"
      });
      
      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le projet",
        variant: "destructive"
      });
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Projet supprimé"
      });
      
      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer le projet",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects
  };
};
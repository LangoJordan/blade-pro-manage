import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Team {
  id: string;
  name: string;
  description?: string;
  leader_id?: string;
  created_at: string;
  updated_at: string;
  leader?: {
    name: string;
  };
  team_members?: Array<{
    user_id: string;
    profiles: {
      name: string;
      role: string;
    };
  }>;
}

interface CreateTeamData {
  name: string;
  description?: string;
  leader_id?: string;
}

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTeams = async () => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select(`
          *,
          leader:profiles!teams_leader_id_fkey (name),
          team_members (
            user_id,
            profiles (name, role)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeams(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les équipes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createTeam = async (teamData: CreateTeamData) => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .insert([teamData])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Équipe créée avec succès"
      });
      
      fetchTeams();
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer l'équipe",
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const updateTeam = async (id: string, updates: Partial<Team>) => {
    try {
      const { error } = await supabase
        .from('teams')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Équipe mise à jour"
      });
      
      fetchTeams();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour l'équipe",
        variant: "destructive"
      });
    }
  };

  const addMemberToTeam = async (teamId: string, userId: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .insert([{ team_id: teamId, user_id: userId }]);

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Membre ajouté à l'équipe"
      });
      
      fetchTeams();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'ajouter le membre",
        variant: "destructive"
      });
    }
  };

  const removeMemberFromTeam = async (teamId: string, userId: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('team_id', teamId)
        .eq('user_id', userId);

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Membre retiré de l'équipe"
      });
      
      fetchTeams();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de retirer le membre",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return {
    teams,
    loading,
    createTeam,
    updateTeam,
    addMemberToTeam,
    removeMemberFromTeam,
    refetch: fetchTeams
  };
};
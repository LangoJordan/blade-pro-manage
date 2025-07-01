import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useClients } from '@/hooks/useClients';

interface ProjectFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
  isLoading?: boolean;
}

const ProjectForm = ({ onSubmit, onCancel, initialData, isLoading }: ProjectFormProps) => {
  const { clients } = useClients();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    client_id: initialData?.client_id || '',
    budget: initialData?.budget || '',
    start_date: initialData?.start_date || '',
    end_date: initialData?.end_date || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      budget: formData.budget ? parseFloat(formData.budget) : null
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Nom du projet *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Nom du projet"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="client">Client</Label>
            <Select value={formData.client_id} onValueChange={(value) => handleChange('client_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name} {client.company && `(${client.company})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Description du projet"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="start_date">Date de début</Label>
            <Input
              id="start_date"
              type="date"
              value={formData.start_date}
              onChange={(e) => handleChange('start_date', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="end_date">Date de fin prévue</Label>
            <Input
              id="end_date"
              type="date"
              value={formData.end_date}
              onChange={(e) => handleChange('end_date', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="budget">Budget (€)</Label>
            <Input
              id="budget"
              type="number"
              value={formData.budget}
              onChange={(e) => handleChange('budget', e.target.value)}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Enregistrement...' : (initialData ? 'Mettre à jour' : 'Créer le projet')}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProjectForm;
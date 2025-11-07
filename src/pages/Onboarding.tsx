import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Building2, Loader2 } from 'lucide-react';
import logoImage from '@/assets/lexsim-logo.png';

const Onboarding = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      // Generate slug from organization name
      const slug = organizationName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      // Create organization
      const { data: org, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: organizationName,
          slug,
        })
        .select()
        .single();

      if (orgError) throw orgError;

      // Update user profile with organization
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ organization_id: org.id })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Assign owner role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          organization_id: org.id,
          role: 'owner',
        });

      if (roleError) throw roleError;

      toast({
        title: 'Studio legale creato',
        description: `Benvenuto in ${organizationName}!`,
      });

      // Refresh profile and redirect
      await refreshProfile();
      navigate('/');
    } catch (error: any) {
      console.error('Error creating organization:', error);
      toast({
        title: 'Errore',
        description: error.message || 'Impossibile creare lo studio legale',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={logoImage} alt="LexSim" className="h-12 w-12" />
            <h1 className="text-4xl font-bold bg-gradient-neural bg-clip-text text-transparent">
              LexSim
            </h1>
          </div>
          <h2 className="text-2xl font-bold">Configura il tuo Studio Legale</h2>
          <p className="text-muted-foreground">
            Crea un'organizzazione per iniziare a usare LexSim
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleCreateOrganization} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="org-name" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Nome Studio Legale
              </Label>
              <Input
                id="org-name"
                type="text"
                placeholder="Studio Legale Rossi & Associati"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Il nome del tuo studio o organizzazione legale
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creazione in corso...
                </>
              ) : (
                'Crea Studio Legale'
              )}
            </Button>
          </form>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          Potrai invitare altri membri del team successivamente
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

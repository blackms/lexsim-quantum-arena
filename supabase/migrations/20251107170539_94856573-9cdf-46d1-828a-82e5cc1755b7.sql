-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE public.app_role AS ENUM ('owner', 'admin', 'lawyer', 'viewer');
CREATE TYPE public.case_status AS ENUM ('draft', 'active', 'closed', 'archived');
CREATE TYPE public.legal_role AS ENUM ('judge', 'prosecutor', 'defense_attorney', 'expert_witness', 'witness');
CREATE TYPE public.personality_type AS ENUM ('analytical', 'aggressive', 'diplomatic', 'cautious', 'creative');

-- Organizations (studi legali)
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profiles (profili utenti collegati a organizations)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User roles (ruoli separati per sicurezza)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, organization_id, role)
);

-- Cases (fascicoli/cause)
CREATE TABLE public.cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  case_number TEXT,
  description TEXT,
  case_type TEXT NOT NULL,
  jurisdiction TEXT NOT NULL,
  status public.case_status DEFAULT 'draft',
  case_value BIGINT,
  evidence_strength INTEGER CHECK (evidence_strength >= 0 AND evidence_strength <= 100),
  court_date TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Case documents (documenti caricati)
CREATE TABLE public.case_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  extracted_text TEXT,
  summary TEXT,
  metadata JSONB DEFAULT '{}',
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Legal profiles (profili psicologici di giudici/avvocati/PM)
CREATE TABLE public.legal_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  role public.legal_role NOT NULL,
  jurisdiction TEXT,
  personality_type public.personality_type,
  psychological_profile JSONB DEFAULT '{}',
  psychometric_data JSONB DEFAULT '{}',
  decision_patterns JSONB DEFAULT '{}',
  notable_cases TEXT[],
  success_rate INTEGER CHECK (success_rate >= 0 AND success_rate <= 100),
  bio TEXT,
  photo_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Simulations (simulazioni eseguite)
CREATE TABLE public.simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  judge_profile_id UUID REFERENCES public.legal_profiles(id),
  prosecutor_profile_id UUID REFERENCES public.legal_profiles(id),
  defense_profile_id UUID REFERENCES public.legal_profiles(id),
  expert_profile_id UUID REFERENCES public.legal_profiles(id),
  agent_models JSONB DEFAULT '{}',
  country TEXT DEFAULT 'IT',
  win_probability DECIMAL(5,2),
  scenarios_run INTEGER DEFAULT 0,
  duration_seconds INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft',
  results JSONB DEFAULT '{}',
  started_by UUID REFERENCES auth.users(id),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Simulation messages (argomenti/messaggi generati)
CREATE TABLE public.simulation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  simulation_id UUID REFERENCES public.simulations(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  agent_role TEXT NOT NULL,
  content TEXT NOT NULL,
  model_used TEXT,
  context_used TEXT[],
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulation_messages ENABLE ROW LEVEL SECURITY;

-- Function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _organization_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND organization_id = _organization_id
      AND role = _role
  )
$$;

-- Function to get user's organization
CREATE OR REPLACE FUNCTION public.get_user_organization(_user_id UUID)
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id
  FROM public.profiles
  WHERE id = _user_id
  LIMIT 1
$$;

-- RLS Policies for organizations
CREATE POLICY "Users can view their organization"
  ON public.organizations FOR SELECT
  TO authenticated
  USING (id = public.get_user_organization(auth.uid()));

CREATE POLICY "Owners can update their organization"
  ON public.organizations FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), id, 'owner'));

-- RLS Policies for profiles
CREATE POLICY "Users can view profiles in their organization"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

-- RLS Policies for user_roles
CREATE POLICY "Users can view roles in their organization"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), organization_id, 'owner') OR public.has_role(auth.uid(), organization_id, 'admin'));

-- RLS Policies for cases
CREATE POLICY "Users can view cases in their organization"
  ON public.cases FOR SELECT
  TO authenticated
  USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can create cases"
  ON public.cases FOR INSERT
  TO authenticated
  WITH CHECK (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can update cases in their organization"
  ON public.cases FOR UPDATE
  TO authenticated
  USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Admins can delete cases"
  ON public.cases FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), organization_id, 'owner') OR public.has_role(auth.uid(), organization_id, 'admin'));

-- RLS Policies for case_documents
CREATE POLICY "Users can view documents in their organization"
  ON public.case_documents FOR SELECT
  TO authenticated
  USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can create documents"
  ON public.case_documents FOR INSERT
  TO authenticated
  WITH CHECK (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Admins can delete documents"
  ON public.case_documents FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), organization_id, 'owner') OR public.has_role(auth.uid(), organization_id, 'admin'));

-- RLS Policies for legal_profiles
CREATE POLICY "Users can view legal profiles in their organization"
  ON public.legal_profiles FOR SELECT
  TO authenticated
  USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can create legal profiles"
  ON public.legal_profiles FOR INSERT
  TO authenticated
  WITH CHECK (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can update legal profiles in their organization"
  ON public.legal_profiles FOR UPDATE
  TO authenticated
  USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Admins can delete legal profiles"
  ON public.legal_profiles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), organization_id, 'owner') OR public.has_role(auth.uid(), organization_id, 'admin'));

-- RLS Policies for simulations
CREATE POLICY "Users can view simulations in their organization"
  ON public.simulations FOR SELECT
  TO authenticated
  USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can create simulations"
  ON public.simulations FOR INSERT
  TO authenticated
  WITH CHECK (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can update simulations in their organization"
  ON public.simulations FOR UPDATE
  TO authenticated
  USING (organization_id = public.get_user_organization(auth.uid()));

-- RLS Policies for simulation_messages
CREATE POLICY "Users can view simulation messages in their organization"
  ON public.simulation_messages FOR SELECT
  TO authenticated
  USING (organization_id = public.get_user_organization(auth.uid()));

CREATE POLICY "Users can create simulation messages"
  ON public.simulation_messages FOR INSERT
  TO authenticated
  WITH CHECK (organization_id = public.get_user_organization(auth.uid()));

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON public.cases
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_legal_profiles_updated_at BEFORE UPDATE ON public.legal_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for case documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'case-documents',
  'case-documents',
  false,
  52428800, -- 50MB
  ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain', 'image/jpeg', 'image/png']
);

-- Storage policies for case-documents bucket
CREATE POLICY "Users can view documents in their organization"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'case-documents' AND
    (storage.foldername(name))[1] IN (
      SELECT organization_id::text
      FROM public.profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can upload documents"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'case-documents' AND
    (storage.foldername(name))[1] IN (
      SELECT organization_id::text
      FROM public.profiles
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete documents"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'case-documents' AND
    (storage.foldername(name))[1] IN (
      SELECT ur.organization_id::text
      FROM public.user_roles ur
      WHERE ur.user_id = auth.uid()
        AND ur.role IN ('owner', 'admin')
    )
  );
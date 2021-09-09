SET check_function_bodies = false;
CREATE TABLE public.channel (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    is_private boolean DEFAULT false NOT NULL,
    community_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.channel_member (
    channel_id uuid NOT NULL,
    user_id uuid NOT NULL
);
CREATE TABLE public.community (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL
);
CREATE TABLE public.community_member (
    community_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role text NOT NULL,
    status text,
    plan_id uuid
);
CREATE TABLE public.community_member_status (
    name text NOT NULL
);
CREATE TABLE public.community_skill (
    community_id uuid NOT NULL,
    skill_name text NOT NULL
);
CREATE TABLE public.plan (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    trial_period text NOT NULL,
    price_per_month integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    community_id uuid NOT NULL
);
CREATE TABLE public.skill (
    name text NOT NULL,
    icon text NOT NULL
);
CREATE TABLE public.user_role (
    name text NOT NULL
);
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    auth_id text NOT NULL,
    email text NOT NULL
);
ALTER TABLE ONLY public.channel_member
    ADD CONSTRAINT channel_member_pkey PRIMARY KEY (user_id, channel_id);
ALTER TABLE ONLY public.channel
    ADD CONSTRAINT channel_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.community_member
    ADD CONSTRAINT community_member_pkey PRIMARY KEY (community_id, user_id);
ALTER TABLE ONLY public.community_member_status
    ADD CONSTRAINT community_member_status_pkey PRIMARY KEY (name);
ALTER TABLE ONLY public.community
    ADD CONSTRAINT community_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.community_skill
    ADD CONSTRAINT community_skill_pkey PRIMARY KEY (community_id, skill_name);
ALTER TABLE ONLY public.community
    ADD CONSTRAINT community_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.skill
    ADD CONSTRAINT skill_pkey PRIMARY KEY (name);
ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (name);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_auth_id_key UNIQUE (auth_id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.channel
    ADD CONSTRAINT channel_community_id_fkey FOREIGN KEY (community_id) REFERENCES public.community(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.community_member
    ADD CONSTRAINT community_member_community_id_fkey FOREIGN KEY (community_id) REFERENCES public.community(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.community_member
    ADD CONSTRAINT community_member_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plan(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.community_member
    ADD CONSTRAINT community_member_role_fkey FOREIGN KEY (role) REFERENCES public.user_role(name) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.community_member
    ADD CONSTRAINT community_member_status_fkey FOREIGN KEY (status) REFERENCES public.community_member_status(name) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.community_member
    ADD CONSTRAINT community_member_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.community_skill
    ADD CONSTRAINT community_skill_community_id_fkey FOREIGN KEY (community_id) REFERENCES public.community(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.community_skill
    ADD CONSTRAINT community_skill_skill_name_fkey FOREIGN KEY (skill_name) REFERENCES public.skill(name) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_community_id_fkey FOREIGN KEY (community_id) REFERENCES public.community(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

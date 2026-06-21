/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY são obrigatórias."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface ContactMessageRow extends ContactMessage {
  id: string;
  created_at: string;
  is_read: boolean;
}

export interface ProjectRow {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  demo_link: string | null;
  github_link: string | null;
  youtube_url?: string | null;
  icon: string;
  featured: boolean;
  order_idx: number;
  created_at?: string;
}

export interface ClientRow {
  id: string;
  name: string;
  subs: string;
  category: string;
  avatar: string;
  order_idx: number;
  created_at?: string;
}

export interface SiteSettingsRow {
  id: number;
  about_text: string;
  updated_at: string;
}

/**
 * Envia uma mensagem de contato para a tabela `contacts` no Supabase.
 */
export async function sendContactMessage(data: ContactMessage): Promise<void> {
  const { error } = await supabase.from("contacts").insert([data]);

  if (error) {
    console.error("Erro ao enviar mensagem:", error);
    throw new Error(error.message);
  }
}

/**
 * Busca todas as mensagens de contato (requer autenticação).
 */
export async function fetchContactMessages(): Promise<ContactMessageRow[]> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar mensagens:", error);
    throw new Error(error.message);
  }

  return data as ContactMessageRow[];
}

/**
 * Marca uma mensagem como lida.
 */
export async function markMessageAsRead(id: string): Promise<void> {
  const { error } = await supabase
    .from("contacts")
    .update({ is_read: true })
    .eq("id", id);

  if (error) {
    console.error("Erro ao marcar como lida:", error);
    throw new Error(error.message);
  }
}

/**
 * PROJECT FUNCTIONS
 */

export async function fetchProjects(): Promise<ProjectRow[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("order_idx", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as ProjectRow[];
}

export async function createProject(project: Omit<ProjectRow, "id" | "created_at">): Promise<void> {
  const { error } = await supabase.from("projects").insert([project]);
  if (error) throw new Error(error.message);
}

export async function updateProject(id: string, updates: Partial<ProjectRow>): Promise<void> {
  const { error } = await supabase.from("projects").update(updates).eq("id", id);
  if (error) throw new Error(error.message);
}

/**
 * Exclui um projeto
 */
export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) {
    console.error("Erro ao excluir projeto:", error);
    throw error;
  }
}

/**
 * CLIENT FUNCTIONS
 */

export async function fetchClients(): Promise<ClientRow[]> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("order_idx", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as ClientRow[];
}

export async function createClientRow(client: Omit<ClientRow, "id" | "created_at">): Promise<void> {
  const { error } = await supabase.from("clients").insert([client]);
  if (error) throw new Error(error.message);
}

export async function updateClientRow(id: string, updates: Partial<ClientRow>): Promise<void> {
  const { error } = await supabase.from("clients").update(updates).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteClientRow(id: string): Promise<void> {
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) {
    console.error("Erro ao excluir cliente:", error);
    throw error;
  }
}

/**
 * Busca as configurações do site (como o texto 'Sobre mim')
 */
export async function fetchSiteSettings(): Promise<SiteSettingsRow | null> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    // Return null if table doesn't exist yet or row not found
    console.error("Erro ao buscar configurações (tabela pode não existir ainda):", error.message);
    return null;
  }
  return data;
}

/**
 * Atualiza o texto do 'Sobre mim'
 */
export async function updateAboutText(text: string): Promise<void> {
  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: 1, about_text: text, updated_at: new Date().toISOString() });

  if (error) {
    console.error("Erro ao atualizar texto sobre mim:", error);
    throw error;
  }
}

/**
 * AUTH FUNCTIONS
 */
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Faz logout do Supabase.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

/**
 * Retorna a sessão atual.
 */
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

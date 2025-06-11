import { supabase } from '../lib/supabase';
import { FormData } from '../types';

export interface MiniSite {
  id: string;
  page_title: string;
  message: string | null;
  start_date: string | null;
  photos: string[];
  youtube_url: string | null;
  animation: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  site_url: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

export const generateSiteUrl = (pageTitle: string): string => {
  const slug = pageTitle
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
  
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${slug}-${randomSuffix}`;
};

export const saveMiniSite = async (formData: FormData): Promise<{ success: boolean; siteUrl?: string; error?: string }> => {
  try {
    const siteUrl = generateSiteUrl(formData.pageTitle);
    
    const { data, error } = await supabase
      .from('mini_sites')
      .insert({
        page_title: formData.pageTitle,
        message: formData.message || null,
        start_date: formData.startDate || null,
        photos: formData.photos,
        youtube_url: formData.youtubeUrl || null,
        animation: formData.animation || null,
        contact_name: formData.contact.name,
        contact_email: formData.contact.email,
        contact_phone: formData.contact.phone || null,
        site_url: siteUrl,
        payment_status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving mini site:', error);
      return { success: false, error: error.message };
    }

    return { success: true, siteUrl };
  } catch (error) {
    console.error('Error saving mini site:', error);
    return { success: false, error: 'Erro interno do servidor' };
  }
};

export const getMiniSiteByUrl = async (siteUrl: string): Promise<{ success: boolean; data?: MiniSite; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('mini_sites')
      .select('*')
      .eq('site_url', siteUrl)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching mini site:', error);
    return { success: false, error: 'Erro interno do servidor' };
  }
};

export const searchMiniSites = async (searchTerm: string): Promise<{ success: boolean; data?: MiniSite[]; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('mini_sites')
      .select('*')
      .or(`contact_email.ilike.%${searchTerm}%,contact_phone.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error searching mini sites:', error);
    return { success: false, error: 'Erro interno do servidor' };
  }
};

export const getAllMiniSites = async (): Promise<{ success: boolean; data?: MiniSite[]; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('mini_sites')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error fetching all mini sites:', error);
    return { success: false, error: 'Erro interno do servidor' };
  }
};
import { createClient } from '@supabase/supabase-js';
import { WeddingCard, RsvpSubmission } from '@/types/wedding';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xwfttbdowexyxpmhvvfs.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Safe build fallback key for static generation
const buildFallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.build_fallback_key';
export const supabase = createClient(supabaseUrl, supabaseAnonKey || buildFallbackKey);

export { getPublicStorageUrl } from './storage';

export async function getWeddingCardBySlug(slug: string): Promise<WeddingCard | null> {
  try {
    const { data, error } = await supabase
      .from('wedding_cards')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) {
      console.warn(`Error fetching wedding card for slug "${slug}":`, error.message);
      return null;
    }

    return data as WeddingCard;
  } catch (err) {
    console.error('Failed to get wedding card:', err);
    return null;
  }
}

export async function submitRsvp(rsvp: RsvpSubmission) {
  const { data, error } = await supabase
    .from('rsvp_responses')
    .insert([
      {
        card_id: rsvp.card_id,
        guest_name: rsvp.guest_name,
        attending: rsvp.attending,
        attendee_side: rsvp.attendee_side || 'both',
        guest_count: rsvp.guest_count || 1,
        phone: rsvp.phone || null,
        message: rsvp.message || null,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

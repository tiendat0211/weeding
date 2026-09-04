'use server';

import { submitRsvp as submitRsvpDb } from '@/lib/supabase';
import { RsvpSubmission } from '@/types/wedding';

export async function submitRsvp(rsvp: RsvpSubmission) {
  return await submitRsvpDb(rsvp);
}

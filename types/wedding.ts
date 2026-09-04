export interface WeddingCard {
  id: string;
  slug: string;
  groom_name: string;
  bride_name: string;
  groom_title?: string;
  bride_title?: string;
  groom_parents?: string;
  bride_parents?: string;
  wedding_date: string;
  ceremony_time?: string;
  ceremony_date_text?: string;
  ceremony_venue?: string;
  ceremony_address?: string;
  ceremony_map_url?: string;
  reception_time?: string;
  reception_date_text?: string;
  reception_venue?: string;
  reception_address?: string;
  reception_map_url?: string;
  hero_image_url?: string;
  groom_image_url?: string;
  bride_image_url?: string;
  couple_image_url?: string;
  gallery_urls?: string[];
  love_story?: string;
  audio_url?: string;
  bank_groom_name?: string;
  bank_groom_number?: string;
  bank_groom_bank?: string;
  bank_groom_qr?: string;
  bank_bride_name?: string;
  bank_bride_number?: string;
  bank_bride_bank?: string;
  bank_bride_qr?: string;
  theme_color?: string;
  is_published?: boolean;
}

export interface RsvpSubmission {
  card_id: string;
  guest_name: string;
  attending: string;
  attendee_side?: string;
  guest_count?: number;
  phone?: string;
  message?: string;
}

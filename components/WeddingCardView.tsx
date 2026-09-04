'use client';

import React, { useState, useEffect, useRef } from 'react';
import { WeddingCard } from '@/types/wedding';
import HeroSection from './HeroSection';
import CoupleSection from './CoupleSection';
import InvitationCardSection from './InvitationCardSection';
import CalendarSection from './CalendarSection';
import EventLocationsSection from './EventLocationsSection';
import GallerySection from './GallerySection';
import FooterSection from './FooterSection';
import MusicPlayer from './MusicPlayer';
import RsvpModal from './RsvpModal';
import EnvelopeCover from './EnvelopeCover';
import { CalendarCheck } from 'lucide-react';

interface WeddingCardViewProps {
  card: WeddingCard;
  guestName?: string;
}

export default function WeddingCardView({ card, guestName }: WeddingCardViewProps) {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#ebe8e1] py-0 sm:py-8">
      {/* 0. Envelope Cover with Wax Seal & Image Preloader */}
      <EnvelopeCover card={card} guestName={guestName} />

      {/* Mobile-sized container centered on larger screens */}
      <div className="wedding-viewport relative shadow-2xl">
        {/* Background Music Player */}
        <MusicPlayer audioUrl={card.audio_url} />

        {/* 1. Hero Section */}
        <HeroSection card={card} guestName={guestName} />

        {/* 2. Bride & Groom Profiles with Romantic Quote (like THIEPMAUCOBAN) */}
        <CoupleSection card={card} />

        {/* 4. Formal Invitation & Event Schedule */}
        <InvitationCardSection card={card} />

        {/* 5. Calendar with Heart & Countdown Timer */}
        <CalendarSection weddingDate={card.wedding_date} cardSlug={card.slug} />

        {/* 6. Event Locations & Map */}
        <EventLocationsSection card={card} />

        {/* 7. Photo Gallery */}
        <GallerySection card={card} />

        {/* 8. Footer Section with RSVP Button */}
        <div ref={footerRef}>
          <FooterSection
            card={card}
            onOpenRsvp={() => setRsvpOpen(true)}
          />
        </div>

        {/* Sticky Mobile Floating Bottom Bar - hides when footer section is in view */}
        <div
          className={`fixed bottom-4 right-4 z-40 flex items-center transition-all duration-300 ${
            isFooterVisible
              ? 'opacity-0 pointer-events-none translate-y-4 scale-95'
              : 'opacity-100 pointer-events-auto translate-y-0 scale-100'
          }`}
        >
          <button
            onClick={() => setRsvpOpen(true)}
            className="flex items-center space-x-2 rounded-full bg-neutral-900/95 px-4 py-2.5 text-xs font-bold text-white shadow-2xl backdrop-blur-md hover:bg-black active:scale-95 transition-all border border-wedding-gold/60 hover:border-wedding-gold"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wedding-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-wedding-gold"></span>
            </span>
            <CalendarCheck className="h-4 w-4 text-wedding-gold" />
            <span>Xác nhận tham dự</span>
          </button>
        </div>

        {/* RSVP Modal */}
        <RsvpModal
          cardId={card.id}
          isOpen={rsvpOpen}
          onClose={() => setRsvpOpen(false)}
          defaultGuestName={guestName ? decodeURIComponent(guestName) : ''}
        />
      </div>
    </main>
  );
}

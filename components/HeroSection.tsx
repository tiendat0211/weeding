'use client';

import React from 'react';
import Image from 'next/image';
import { WeddingCard } from '@/types/wedding';
import { getPublicStorageUrl } from '@/lib/storage';
import PetalEffect from './PetalEffect';

interface HeroSectionProps {
  card: WeddingCard;
  guestName?: string;
}

export default function HeroSection({ card, guestName }: HeroSectionProps) {
  const heroImage = getPublicStorageUrl(card.hero_image_url) ||
    'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2309.jpg';

  const guest = guestName ? decodeURIComponent(guestName) : 'Quý Khách';
  const isNhaGai = card.slug === 'nhagai';
  const firstName = isNhaGai ? card.bride_name : card.groom_name;
  const secondName = isNhaGai ? card.groom_name : card.bride_name;

  return (
    <section className="relative h-[800px] w-full overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={`${card.groom_name} & ${card.bride_name}`}
          fill
          priority
          sizes="(max-width: 430px) 100vw, 430px"
          className="object-cover object-center"
        />
        {/* Soft elegant gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />
      </div>

      {/* Romantic Falling Petals */}
      <PetalEffect />

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col justify-between p-6 text-center">
        {/* Couple Names on the same line */}
        <div className="mt-8 animate-fade-in-up flex items-center justify-center gap-2.5 flex-nowrap">
          <h1 className="font-azkia text-[36px] sm:text-[44px] font-normal tracking-wide text-neutral-900 drop-shadow-[0_2px_4px_rgba(255,255,255,0.85)] whitespace-nowrap">
            {firstName}
          </h1>
          <span className="font-ephesis text-3xl sm:text-4xl text-neutral-900 drop-shadow-[0_2px_4px_rgba(255,255,255,0.85)] px-1">
            &
          </span>
          <h1 className="font-azkia text-[36px] sm:text-[44px] font-normal tracking-wide text-neutral-900 drop-shadow-[0_2px_4px_rgba(255,255,255,0.85)] whitespace-nowrap">
            {secondName}
          </h1>
        </div>

        {/* Invitation & Details Card - Minimal Transparent Style */}
        <div className="mb-6 sm:mb-8 flex flex-col items-center space-y-4">
          {/* 1. Trân Trọng Kính Mời */}
          <div className="w-full max-w-[280px] text-center">
            <p className="font-montserrat text-xs tracking-widest uppercase text-neutral-800 font-semibold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              Trân Trọng Kính Mời
            </p>
            <div className="my-1.5 border-b border-dotted border-neutral-600 w-36 mx-auto" />
            <p className="font-alex text-2xl text-neutral-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              {guest}
            </p>
          </div>

          {/* 2. Thư Mời Tiệc Cưới & Lịch */}
          <div className="w-full max-w-[280px] text-center">
            <p className="font-barlow text-base font-semibold tracking-[4px] uppercase text-neutral-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              THƯ MỜI TIỆC CƯỚI
            </p>

            <div className="my-2 h-[1px] w-52 mx-auto bg-neutral-800/70" />

            <p className="font-montserrat text-xs font-bold uppercase tracking-wider text-neutral-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              {isNhaGai ? 'THỨ BẢY - 16H30' : 'CHỦ NHẬT - 16H30'}
            </p>

            <p className="mt-1 font-barlow text-2xl font-bold tracking-[6px] text-neutral-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              {isNhaGai ? '19.09.2026' : '20.09.2026'}
            </p>

            <div className="my-2 h-[1px] w-52 mx-auto bg-neutral-800/70" />
          </div>
        </div>
      </div>
    </section>
  );
}

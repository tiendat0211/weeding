'use client';

import React from 'react';
import Image from 'next/image';
import { WeddingCard } from '@/types/wedding';
import { getPublicStorageUrl } from '@/lib/storage';
import ScrollAnimation from './ScrollAnimation';

interface CoupleSectionProps {
  card: WeddingCard;
}

export default function CoupleSection({ card }: CoupleSectionProps) {
  const isNhaGai = card.slug === 'nhagai';

  const groomImg = getPublicStorageUrl(card.groom_image_url) ||
    'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2790.jpg';

  const brideImg = getPublicStorageUrl(card.bride_image_url) ||
    'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2475.jpg';

  const renderParents = (parentsText?: string | null, fallback = '') => {
    const raw = (parentsText || fallback)
      .replace(/\\n/g, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/:/g, ''); // Xóa tất cả dấu :
    const lines = raw
      .split('\n')
      .map((l) => l.trim().replace(/\s+/g, ' '))
      .filter(Boolean);

    return lines.map((line, idx) => (
      <span key={idx} className="block leading-relaxed tracking-wider">
        {line}
      </span>
    ));
  };

  // Profile block components
  const GroomBlock = (
    <div className="flex flex-col items-center text-center">
      <span className="mb-1 font-cafeta text-[16px] tracking-wider text-wedding-brown font-bold uppercase">
        NHÀ TRAI
      </span>
      <div className="min-h-[44px] text-wedding-brown font-cafeta text-[16px] uppercase leading-snug">
        {renderParents(card.groom_parents, 'ÔNG NGÔ DUY QUYNH\nBÀ NGÔ THỊ MAI')}
      </div>

      <div className="mt-4 flex flex-col items-center">
        <p className="font-cormorant text-[17px] text-neutral-800">
          {card.groom_title || 'Chú Rể'}
        </p>
        <h3 className="font-ephesis text-[28px] sm:text-[30px] font-normal text-neutral-900 leading-tight tracking-wide">
          {card.groom_name}
        </h3>
      </div>

      {/* Groom Portrait */}
      <div className="relative mt-3 h-64 w-full overflow-hidden rounded-2xl border border-neutral-200/80 shadow-sm">
        <Image
          src={groomImg}
          alt={card.groom_name}
          fill
          loading="eager"
          sizes="(max-width: 430px) 50vw, 200px"
          className="object-cover transition-transform duration-500 hover:scale-105"
          style={{ objectPosition: 'center 15%' }}
        />
      </div>
    </div>
  );

  const BrideBlock = (
    <div className="flex flex-col items-center text-center">
      <span className="mb-1 font-cafeta text-[16px] tracking-wider text-wedding-brown font-bold uppercase">
        NHÀ GÁI
      </span>
      <div className="min-h-[44px] text-wedding-brown font-cafeta text-[16px] uppercase leading-snug">
        {renderParents(card.bride_parents, 'ÔNG ĐẶNG VĂN ĐÁP\nBÀ LÊ THỊ HÀ')}
      </div>

      <div className="mt-4 flex flex-col items-center">
        <p className="font-cormorant text-[17px] text-neutral-800">
          {card.bride_title || 'Cô Dâu'}
        </p>
        <h3 className="font-ephesis text-[28px] sm:text-[30px] font-normal text-neutral-900 leading-tight tracking-wide">
          {card.bride_name}
        </h3>
      </div>

      {/* Bride Portrait */}
      <div className="relative mt-3 h-64 w-full overflow-hidden rounded-2xl border border-neutral-200/80 shadow-sm">
        <Image
          src={brideImg}
          alt={card.bride_name}
          fill
          loading="eager"
          sizes="(max-width: 430px) 50vw, 200px"
          className="object-cover transition-transform duration-500 hover:scale-105"
          style={{ objectPosition: 'center 15%' }}
        />
      </div>
    </div>
  );

  return (
    <section className="relative px-4 py-8 bg-white overflow-hidden">
      {/* Top Quote like THIEPMAUCOBAN */}
      <ScrollAnimation type="fade-up" duration={0.85}>
        <div className="text-center mb-6">
          <p className="font-pinyon text-[20px] sm:text-[22px] leading-relaxed text-wedding-brown">
            {card.love_story || '“Hôn nhân là chuyện cả đời,\nYêu người vừa ý, cưới người mình thương...”'}
          </p>
        </div>
      </ScrollAnimation>

      {/* Stylized Line Heart Emblem in the center between columns (like ewedinvite.site/THIEPMAUCOBAN) */}
      <div className="absolute left-1/2 top-[165px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
        <ScrollAnimation type="zoom-in" delay={0.1} duration={0.9}>
          <div className="relative h-24 w-24 opacity-90 animate-heartbeat origin-center">
            <Image
              src="/images/heart-stylized.png"
              alt="Heart line sketch"
              fill
              className="object-contain"
            />
          </div>
        </ScrollAnimation>
      </div>

      {/* Two columns: Order depends on isNhaGai */}
      <div className="grid grid-cols-2 gap-4 relative z-0">
        {isNhaGai ? (
          <>
            {/* Nhà Gái xuất hiện trước (bên trái) */}
            <ScrollAnimation type="fade-left" duration={0.85}>
              {BrideBlock}
            </ScrollAnimation>
            {/* Nhà Trai xuất hiện sau (bên phải) */}
            <ScrollAnimation type="fade-right" duration={0.85}>
              {GroomBlock}
            </ScrollAnimation>
          </>
        ) : (
          <>
            {/* Nhà Trai xuất hiện trước (bên trái) */}
            <ScrollAnimation type="fade-left" duration={0.85}>
              {GroomBlock}
            </ScrollAnimation>
            {/* Nhà Gái xuất hiện sau (bên phải) */}
            <ScrollAnimation type="fade-right" duration={0.85}>
              {BrideBlock}
            </ScrollAnimation>
          </>
        )}
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { Heart, CalendarCheck } from 'lucide-react';
import { WeddingCard } from '@/types/wedding';
import ScrollAnimation from './ScrollAnimation';

interface FooterSectionProps {
  card: WeddingCard;
  onOpenRsvp: () => void;
}

export default function FooterSection({
  card,
  onOpenRsvp,
}: FooterSectionProps) {
  const isNhaGai = card.slug === 'nhagai';
  const coupleTitle = isNhaGai
    ? `${card.bride_name} & ${card.groom_name}`
    : `${card.groom_name} & ${card.bride_name}`;

  const message = 'Sự hiện diện của Quý vị là niềm vinh hạnh cho Gia đình chúng tôi!';

  return (
    <footer className="relative px-6 pt-12 pb-24 sm:pb-28 text-center bg-white border-t border-wedding-border overflow-hidden">
      <ScrollAnimation type="zoom-in" duration={0.85}>
        <div className="mx-auto max-w-sm flex flex-col items-center">
          {/* Heart ornament */}
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-wedding-goldLight/70 border border-wedding-gold/30">
            <Heart className="h-5 w-5 fill-wedding-rose text-wedding-rose animate-pulse" />
          </div>

          <h3 className="font-pinyon text-3xl text-wedding-brown drop-shadow-sm">
            Rất Hân Hạnh Được Đón Tiếp!
          </h3>

          <div className="my-2 h-[1px] w-24 bg-wedding-gold/40" />

          <p className="font-azkia text-2xl text-neutral-800 mt-2">
            {coupleTitle}
          </p>

          <p className="mt-4 font-montserrat text-xs text-neutral-500 leading-relaxed max-w-xs">
            {message}
          </p>

          {/* Action button in final section */}
          <div className="mt-6 w-full flex justify-center">
            <button
              onClick={onOpenRsvp}
              className="group relative flex w-full max-w-[280px] items-center justify-center space-x-2 rounded-xl bg-neutral-900 px-4 py-3 text-white shadow-md transition-all duration-300 hover:bg-black hover:shadow-lg active:scale-[0.98] border border-wedding-gold/50"
            >
              <CalendarCheck className="h-4 w-4 text-wedding-gold transition-transform group-hover:scale-110" />
              <span className="font-montserrat text-xs font-bold tracking-wider uppercase text-white">
                Xác Nhận Tham Dự Lễ Cưới
              </span>
            </button>
          </div>

          <div className="mt-8 pt-4 border-t border-neutral-100 w-full">
            <p className="font-montserrat text-[10px] tracking-widest uppercase text-neutral-400">
              Forever & Always • {new Date(card.wedding_date).getFullYear()}
            </p>
          </div>
        </div>
      </ScrollAnimation>
    </footer>
  );
}

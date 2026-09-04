'use client';

import React from 'react';
import Link from 'next/link';

interface SideSwitcherProps {
  currentSlug: string;
  guestQuery?: string;
}

export default function SideSwitcher({ currentSlug, guestQuery }: SideSwitcherProps) {
  const isNhaGai = currentSlug === 'nhagai';
  const queryStr = guestQuery ? `?to=${encodeURIComponent(guestQuery)}` : '';

  return (
    <aside aria-label="Chọn xem thiệp" className="sticky top-0 z-40 flex justify-center py-2.5 bg-white/90 backdrop-blur-md border-b border-wedding-gold/25 shadow-xs transition-all">
      <div className="inline-flex items-center rounded-full p-1 bg-[#f4f1ea] border border-wedding-gold/30 shadow-inner">
        <Link
          href={`/nhatrai${queryStr}`}
          className={`rounded-full px-4 py-1.5 text-xs font-montserrat font-bold transition-all duration-300 ${
            !isNhaGai
              ? 'bg-wedding-brown text-white shadow-sm scale-100'
              : 'text-neutral-600 hover:text-wedding-brown active:scale-95'
          }`}
        >
          Thiệp Nhà Trai
        </Link>
        <Link
          href={`/nhagai${queryStr}`}
          className={`rounded-full px-4 py-1.5 text-xs font-montserrat font-bold transition-all duration-300 ${
            isNhaGai
              ? 'bg-wedding-brown text-white shadow-sm scale-100'
              : 'text-neutral-600 hover:text-wedding-brown active:scale-95'
          }`}
        >
          Thiệp Nhà Gái
        </Link>
      </div>
    </aside>
  );
}

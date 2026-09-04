'use client';

import React from 'react';
import { WeddingCard } from '@/types/wedding';
import { MapPin, Navigation } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

interface EventLocationsSectionProps {
  card: WeddingCard;
}

export default function EventLocationsSection({ card }: EventLocationsSectionProps) {
  const isNhaGai = card.slug === 'nhagai';

  const venue = isNhaGai
    ? {
        name: 'Nhà Văn Hóa Thôn Trung Thôn',
        address: card.reception_address || 'Thôn Trung Thôn, Xã Đông Anh, Thành Phố Hà Nội',
        query: 'Nhà văn hóa thôn Trung Thôn, Đông Anh, Hà Nội',
      }
    : {
        name: card.reception_venue || 'Nhà Văn Hóa Thôn Trà Phương',
        address: card.reception_address || 'Thôn Trà Phương, Xã Kiến Thụy, Thành Phố Hải Phòng',
        query: `${card.reception_venue || 'Nhà văn hóa thôn Trà Phương'} ${card.reception_address || 'Kiến Thụy Hải Phòng'}`,
      };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.query)}`;
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(venue.query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="px-4 py-8 bg-[#fdfbf7] overflow-hidden">
      <div className="mx-auto max-w-[390px] text-center">
        <ScrollAnimation type="fade-down" duration={0.8}>
          <h2 className="font-pinyon text-4xl text-wedding-brown drop-shadow-sm">
            Địa Điểm Tổ Chức
          </h2>
          <div className="my-2 h-[1px] w-24 mx-auto bg-wedding-brown/30" />
        </ScrollAnimation>

        <ScrollAnimation type="zoom-in" delay={0.15} duration={0.85}>
          <div className="mt-4 overflow-hidden rounded-3xl bg-white p-5 shadow-md border border-wedding-gold/35">
            {/* Venue Info */}
            <div className="mb-4">
              <div className="inline-flex items-center space-x-1.5 rounded-full bg-wedding-gold/15 px-3 py-1 mb-2">
                <MapPin className="h-3 w-3 text-wedding-brown" />
                <span className="font-montserrat text-[10px] font-bold uppercase tracking-wider text-wedding-brown">
                  Địa Điểm
                </span>
              </div>
              <h3 className="font-cormorant text-2xl sm:text-[26px] font-bold text-wedding-brown tracking-wide leading-tight">
                {venue.name}
              </h3>
              <p className="mt-1.5 font-montserrat text-xs sm:text-[13px] text-neutral-600 leading-relaxed max-w-xs mx-auto">
                {venue.address}
              </p>
            </div>

            {/* Embedded Google Maps */}
            <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-wedding-gold/25 shadow-inner">
              <iframe
                src={embedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Địa điểm đám cưới"
              />
            </div>

            {/* Button to open in Google Maps App */}
            <div className="mt-4 flex justify-center">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex w-full max-w-[280px] items-center justify-center space-x-2 rounded-xl bg-neutral-900 px-4 py-3 text-white shadow-md transition-all duration-300 hover:bg-black hover:shadow-lg active:scale-[0.98] border border-wedding-gold/50"
              >
                <Navigation className="h-4 w-4 text-wedding-gold transition-transform group-hover:scale-110" />
                <span className="font-montserrat text-xs font-bold tracking-wider uppercase text-white">
                  Mở Bản Đồ Chỉ Đường
                </span>
              </a>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

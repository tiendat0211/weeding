'use client';

import React, { useState } from 'react';
import { WeddingCard } from '@/types/wedding';
import { MapPin, Navigation, Clock } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

interface EventLocationsSectionProps {
  card: WeddingCard;
}

export default function EventLocationsSection({ card }: EventLocationsSectionProps) {
  const isNhaGai = card.slug === 'nhagai';
  const [activeTab, setActiveTab] = useState<'reception' | 'ceremony'>('reception');

  // Tab configurations for Nhà Gái
  const nhaGaiTabs = {
    reception: {
      tabLabel: 'Tiệc Cưới',
      badge: 'TIỆC CƯỚI',
      name: 'Nhà Văn Hóa Thôn Trung Thôn',
      address: card.reception_address || 'Thôn Trung Thôn, Xã Đông Anh, Thành Phố Hà Nội',
      time: '16:30 - Thứ Bảy, 19.09.2026',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Nh%C3%A0+v%C4%83n+h%C3%B3a+th%C3%B4n+Trung+Th%C3%B4n%2C+%C4%90%C3%B4ng+Anh%2C+H%C3%A0+N%E1%BB%99i',
      embedSrc:
        'https://maps.google.com/maps?q=Nh%C3%A0+v%C4%83n+h%C3%B3a+th%C3%B4n+Trung+Th%C3%B4n%2C+%C4%90%C3%B4ng+Anh%2C+H%C3%A0+N%E1%BB%99i&t=&z=15&ie=UTF8&iwloc=&output=embed',
    },
    ceremony: {
      tabLabel: 'Lễ Vu Quy',
      badge: 'LỄ VU QUY',
      name: card.ceremony_venue || 'Tư Gia Nhà Gái',
      address: card.ceremony_address || 'Số 3, Ngách 43/57 Đường Đông Hội, Thôn Trung Thôn, Đông Anh, Hà Nội',
      time: '09:30 - Chủ Nhật, 20.09.2026',
      mapUrl:
        'https://www.google.com/maps?q=21.0927470,105.8694060&entry=gps&shh=CAE&lucs=,94297699,100795621,94231188,94280568,47071704,94218641,94282134,94286869,100820247,100822499&g_ep=CAISEjI2LjMzLjEuOTYxODkxNDMyMBgAINeCAypdLDk0Mjk3Njk5LDEwMDc5NTYyMSw5NDIzMTE4OCw5NDI4MDU2OCw0NzA3MTcwNCw5NDIxODY0MSw5NDI4MjEzNCw5NDI4Njg2OSwxMDA4MjAyNDcsMTAwODIyNDk5QgJWTg%3D%3D&skid=a570c99c-7ed9-40ae-b981-cd4a445673c6&g_st=ic',
      embedSrc: 'https://maps.google.com/maps?q=21.0927470,105.8694060&t=&z=16&ie=UTF8&iwloc=&output=embed',
    },
  };

  // Single venue for Nhà Trai (không chia tab)
  const nhaTraiVenue = {
    badge: 'ĐỊA ĐIỂM',
    name: card.reception_venue || 'Nhà Văn Hóa Thôn Trà Phương',
    address: card.reception_address || 'Thôn Trà Phương, Xã Kiến Thụy, Thành Phố Hải Phòng',
    time: card.reception_time || '16:30 - Chủ Nhật, 20.09.2026',
    mapUrl:
      card.reception_map_url ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${card.reception_venue || 'Nhà văn hóa thôn Trà Phương'}, Kiến Thụy, Hải Phòng`
      )}`,
    embedSrc: `https://maps.google.com/maps?q=${encodeURIComponent(
      `${card.reception_venue || 'Nhà văn hóa thôn Trà Phương'} Kiến Thụy Hải Phòng`
    )}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
  };

  const currentVenue = isNhaGai ? nhaGaiTabs[activeTab] : nhaTraiVenue;

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
            {/* 2 Tabs Selector (Chỉ hiển thị cho Nhà Gái, tiêu đề nhỏ gọn thanh lịch) */}
            {isNhaGai && (
              <div className="flex rounded-xl bg-neutral-100 p-1 border border-wedding-gold/25 mb-5 shadow-inner">
                <button
                  type="button"
                  onClick={() => setActiveTab('reception')}
                  className={`flex-1 py-2 px-2.5 rounded-lg font-montserrat text-[11px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-1 ${activeTab === 'reception'
                      ? 'bg-wedding-brown text-white shadow-sm'
                      : 'text-neutral-500 hover:text-wedding-brown'
                    }`}
                >
                  <span>{nhaGaiTabs.reception.tabLabel}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('ceremony')}
                  className={`flex-1 py-2 px-2.5 rounded-lg font-montserrat text-[11px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-1 ${activeTab === 'ceremony'
                      ? 'bg-wedding-brown text-white shadow-sm'
                      : 'text-neutral-500 hover:text-wedding-brown'
                    }`}
                >
                  <span>{nhaGaiTabs.ceremony.tabLabel}</span>
                </button>
              </div>
            )}

            {/* Venue Info */}
            <div className="mb-4">
              <div className="inline-flex items-center space-x-1.5 rounded-full bg-wedding-gold/15 px-3 py-1 mb-2">
                <MapPin className="h-3 w-3 text-wedding-brown" />
                <span className="font-montserrat text-[10px] font-bold uppercase tracking-wider text-wedding-brown">
                  {currentVenue.badge}
                </span>
              </div>
              <h3 className="font-cormorant text-2xl sm:text-[26px] font-bold text-wedding-brown tracking-wide leading-tight">
                {currentVenue.name}
              </h3>
              {currentVenue.time && (
                <div className="mt-1 flex items-center justify-center space-x-1.5 text-neutral-500 font-montserrat text-xs">
                  <Clock className="h-3.5 w-3.5 text-wedding-brown/70" />
                  <span>{currentVenue.time}</span>
                </div>
              )}
              <p className="mt-1.5 font-montserrat text-xs sm:text-[13px] text-neutral-600 leading-relaxed max-w-xs mx-auto">
                {currentVenue.address}
              </p>
            </div>

            {/* Embedded Google Maps */}
            <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-wedding-gold/25 shadow-inner">
              <iframe
                key={isNhaGai ? activeTab : 'nhatrai'}
                src={currentVenue.embedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={currentVenue.name}
              />
            </div>

            {/* Button to open in Google Maps App */}
            <div className="mt-4 flex justify-center">
              <a
                href={currentVenue.mapUrl}
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

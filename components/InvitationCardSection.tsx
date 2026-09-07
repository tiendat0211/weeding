'use client';

import React from 'react';
import Image from 'next/image';
import { WeddingCard } from '@/types/wedding';
import { getPublicStorageUrl } from '@/lib/storage';
import { MapPin } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

interface InvitationCardSectionProps {
  card: WeddingCard;
}

export default function InvitationCardSection({ card }: InvitationCardSectionProps) {
  const isNhaGai = card.slug === 'nhagai';

  // 3 images for Invitation Section from left to right: WAGO2742, WAGO2309, WAGO2044
  const invitationImages = [
    'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2742.jpg',
    'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2309.jpg',
    'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2044.jpg',
  ];

  return (
    <section className="px-4 py-8 bg-[#faf8f5] overflow-hidden">
      {/* Title */}
      <ScrollAnimation type="fade-down" duration={0.8}>
        <div className="text-center">
          <h2 className="font-pinyon text-4xl text-wedding-brown drop-shadow-sm">
            {'Thư Mời'}
          </h2>
          <div className="my-2 h-[1px] w-24 mx-auto bg-wedding-brown/30" />
          <p className="font-cormorant text-sm tracking-widest uppercase text-neutral-600">
            {isNhaGai
              ? `Tham Dự Tiệc Cưới ${card.bride_name} & ${card.groom_name}`
              : `Tham Dự Tiệc Cưới ${card.groom_name} & ${card.bride_name}`}
          </p>
        </div>
      </ScrollAnimation>

      {/* 3-photo Triptych Layout */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <ScrollAnimation type="fade-left" delay={0.1} duration={0.8}>
          <div className="relative h-44 w-[115px] overflow-hidden rounded-lg shadow-sm">
            <Image
              src={getPublicStorageUrl(invitationImages[0])}
              alt="Wedding preview left"
              fill
              loading="eager"
              sizes="115px"
              className="object-cover"
              style={{ objectPosition: 'center 15%' }}
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation type="zoom-in" delay={0.2} duration={0.9}>
          <div className="relative h-56 w-[140px] overflow-hidden rounded-xl shadow-md border-2 border-white">
            <Image
              src={getPublicStorageUrl(invitationImages[1])}
              alt="Wedding preview center"
              fill
              loading="eager"
              sizes="140px"
              className="object-cover"
              style={{ objectPosition: 'center 15%' }}
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation type="fade-right" delay={0.1} duration={0.8}>
          <div className="relative h-44 w-[115px] overflow-hidden rounded-lg shadow-sm">
            <Image
              src={getPublicStorageUrl(invitationImages[2])}
              alt="Wedding preview right"
              fill
              loading="eager"
              sizes="115px"
              className="object-cover"
              style={{ objectPosition: 'center 15%' }}
            />
          </div>
        </ScrollAnimation>
      </div>

      {/* SỰ KIỆN 1: TIỆC MỪNG LỄ CƯỚI */}
      <ScrollAnimation type="fade-up" delay={0.15} duration={0.85}>
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm border border-wedding-gold/30 text-center">
          <span className="inline-block rounded-full bg-wedding-gold/15 px-4 py-1 font-montserrat text-xs font-bold tracking-widest text-wedding-brown uppercase">
            TIỆC MỪNG LỄ CƯỚI
          </span>

          <p className="mt-2 font-montserrat text-[11px] uppercase tracking-wide text-neutral-500">
            Tới dự bữa cơm thân mật chung vui cùng gia đình chúng tôi
          </p>

          {/* Date block */}
          <div className="my-4 flex items-center justify-center gap-3">
            <div className="text-right">
              <p className="font-barlow text-xs uppercase tracking-wider text-neutral-500">
                {isNhaGai ? 'Thứ Bảy' : 'Chủ Nhật'}
              </p>
              <p className="font-barlow text-xs font-semibold text-neutral-700">16:30</p>
            </div>

            <div className="h-10 w-[1px] bg-neutral-300" />

            <div className="px-2">
              <span className="font-barlow text-4xl font-extrabold text-wedding-brown">
                {isNhaGai ? '19' : '20'}
              </span>
            </div>

            <div className="h-10 w-[1px] bg-neutral-300" />

            <div className="text-left">
              <p className="font-barlow text-xs uppercase tracking-wider text-neutral-500">Tháng 09</p>
              <p className="font-barlow text-xs font-semibold text-neutral-700">Năm 2026</p>
            </div>
          </div>

          <p className="font-montserrat text-xs italic text-neutral-500">
            {isNhaGai
              ? '(Tức ngày 09 tháng 08 năm Bính Ngọ)'
              : '(Tức ngày 10 tháng 08 năm Bính Ngọ)'}
          </p>

          <div className="mt-3 pt-3 border-t border-wedding-gold/20 flex flex-col items-center">
            <div className="flex items-center justify-center space-x-1.5 text-wedding-brown font-bold">
              <MapPin className="h-4 w-4 text-wedding-goldDark" />
              <span className="font-montserrat text-xs uppercase">
                {isNhaGai
                  ? 'Tại Nhà Văn Hóa Thôn Trung Thôn'
                  : 'Tại Nhà Văn Hóa Thôn Trà Phương'}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-neutral-600">
              {isNhaGai
                ? 'Thôn Trung Thôn, Xã Đông Anh, Thành Phố Hà Nội'
                : 'Thôn Trà Phương, Xã Kiến Thụy, Thành Phố Hải Phòng'}
            </p>
          </div>

          <p className="mt-3 font-pinyon text-2xl sm:text-[28px] text-wedding-brown drop-shadow-sm">
            Rất hân hạnh được đón tiếp!
          </p>
        </div>
      </ScrollAnimation>

      {/* SỰ KIỆN 2: LỄ VU QUY (NHÀ GÁI) HOẶC LỄ THÀNH HÔN (NHÀ TRAI) */}
      <ScrollAnimation type="fade-up" delay={0.25} duration={0.85}>
        <div className="mt-5 rounded-2xl bg-gradient-to-br from-wedding-goldLight/40 via-white to-wedding-goldLight/20 p-6 shadow-md border-2 border-wedding-gold/50 text-center">
          <span className="font-pinyon text-3xl font-bold text-wedding-brown block">
            {isNhaGai ? 'Lễ Vu Quy' : 'Lễ Thành Hôn'}
          </span>

          <p className="mt-1 font-montserrat text-[11px] uppercase tracking-wider text-neutral-600 font-medium">
            Được tổ chức vào lúc
          </p>

          {isNhaGai ? (
            /* Chi tiết Lễ Vu Quy lúc 09h30 Chủ Nhật 20.09.2026 */
            <div className="my-3">
              <p className="font-barlow text-sm font-bold text-wedding-brown uppercase">
                09 GIỜ 30 - CHỦ NHẬT - 20.09.2026
              </p>
              <p className="mt-0.5 font-montserrat text-xs italic text-neutral-500">
                (Tức ngày 10 tháng 08 năm Bính Ngọ)
              </p>

              <div className="mt-3 pt-3 border-t border-wedding-gold/30">
                <div className="flex items-center justify-center space-x-1.5 text-wedding-brown font-bold">
                  <MapPin className="h-4 w-4 text-wedding-goldDark" />
                  <span className="font-montserrat text-xs uppercase">
                    Tại Tư Gia Nhà Gái
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-neutral-600">
                  Số 3, Ngách 43/57 Đường Đông Hội
                </p>
                <p className="text-[11px] text-neutral-600">
                  T. Trung Thôn, X. Đông Anh, TP. Hà Nội
                </p>
              </div>
            </div>
          ) : (
            /* Chi tiết Lễ Thành Hôn Nhà Trai lúc 16h30 Chủ Nhật 20.09.2026 */
            <div className="my-3">
              <p className="font-barlow text-sm font-bold text-wedding-brown uppercase">
                16 GIỜ 30 - CHỦ NHẬT - 20.09.2026
              </p>
              <p className="mt-0.5 font-montserrat text-xs italic text-neutral-500">
                (Tức ngày 10 tháng 08 năm Bính Ngọ)
              </p>

              <div className="mt-3 pt-3 border-t border-wedding-gold/30">
                <div className="flex items-center justify-center space-x-1.5 text-wedding-brown font-bold">
                  <MapPin className="h-4 w-4 text-wedding-goldDark" />
                  <span className="font-montserrat text-xs uppercase">
                    Tại Nhà Văn Hóa Thôn Trà Phương
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-neutral-600">
                  Thôn Trà Phương, Xã Kiến Thụy, Thành Phố Hải Phòng
                </p>
              </div>
            </div>
          )}

          <div className="mt-3 pt-2">
            <p className="font-montserrat text-[11px] italic font-medium text-neutral-600">
              Sự hiện diện của Quý vị là niềm vinh hạnh cho Gia đình chúng tôi!
            </p>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
}

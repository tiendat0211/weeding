'use client';

import React, { useState, useEffect } from 'react';
import { WeddingCard } from '@/types/wedding';
import { getPublicStorageUrl } from '@/lib/storage';
import { Heart, MailOpen } from 'lucide-react';
import PetalEffect from './PetalEffect';

interface EnvelopeCoverProps {
  card: WeddingCard;
  guestName?: string;
  onOpen?: () => void;
}

export default function EnvelopeCover({
  card,
  onOpen,
}: EnvelopeCoverProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const isNhaGai = card.slug === 'nhagai';
  const firstName = isNhaGai ? card.bride_name : card.groom_name;
  const secondName = isNhaGai ? card.groom_name : card.bride_name;

  // Format date display
  const dateObj = new Date(card.wedding_date);
  const dayName = isNhaGai ? 'Thứ Bảy' : 'Chủ Nhật';
  const formattedDate = `${dayName}, ${dateObj.getDate().toString().padStart(2, '0')} Tháng ${(
    dateObj.getMonth() + 1
  ).toString().padStart(2, '0')}, ${dateObj.getFullYear()}`;

  // Image Preloader logic: Preload exact Next.js optimized URLs and decode before rendering
  useEffect(() => {
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 2 : 2;
    const screenW = typeof window !== 'undefined' ? window.innerWidth : 390;
    const nextSizes = [256, 384, 640, 750, 828, 1080];

    const targetCardW = Math.min(screenW, 430) * 0.5 * dpr;
    const galleryWidth = nextSizes.find((s) => s >= targetCardW) || 640;

    const targetHeroW = Math.min(screenW, 430) * 1.0 * dpr;
    const heroWidth = nextSizes.find((s) => s >= targetHeroW) || 828;

    const targetInvW = 140 * dpr;
    const invWidth = nextSizes.find((s) => s >= targetInvW) || 384;

    const getNextOptimizedUrl = (url: string | null | undefined, w: number, q = 75) => {
      if (!url) return '';
      const fullUrl = getPublicStorageUrl(url);
      if (fullUrl.startsWith('http://') || fullUrl.startsWith('https://')) {
        return `/_next/image?url=${encodeURIComponent(fullUrl)}&w=${w}&q=${q}`;
      }
      return fullUrl;
    };

    const rawGallery = card.gallery_urls && card.gallery_urls.length > 0
      ? card.gallery_urls
      : [
          'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2261.jpg',
          'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2044.jpg',
          'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2309.jpg',
          'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2475.jpg',
          'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2514.jpg',
          'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2600.jpg',
          'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2654.jpg',
          'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2721.jpg',
          'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2731.jpg',
          'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2742.jpg',
          'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2781.jpg',
          'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2790.jpg',
          'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2808.jpg',
          'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2827.jpg',
        ];

    const imagesToPreload: string[] = [
      // Hero image optimized
      getNextOptimizedUrl(card.hero_image_url || 'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2309.jpg', heroWidth),
      // Groom & Bride optimized
      getNextOptimizedUrl(card.groom_image_url || 'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2790.jpg', galleryWidth),
      getNextOptimizedUrl(card.bride_image_url || 'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2475.jpg', galleryWidth),
      // Invitation triptych optimized
      getNextOptimizedUrl('https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2742.jpg', invWidth),
      getNextOptimizedUrl('https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2309.jpg', invWidth),
      getNextOptimizedUrl('https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2044.jpg', invWidth),
      // All 14 gallery images optimized
      ...rawGallery.map((url) => getNextOptimizedUrl(url, galleryWidth)),
      '/images/heart-stylized.png',
    ].filter((url): url is string => Boolean(url && url.trim().length > 0));

    const uniqueImages = Array.from(new Set(imagesToPreload));
    const total = uniqueImages.length;

    if (total === 0) {
      setProgress(100);
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const updateProgress = () => {
      loadedCount++;
      const currentPct = Math.min(100, Math.round((loadedCount / total) * 100));
      setProgress(currentPct);
      if (loadedCount >= total) {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    uniqueImages.forEach((src) => {
      const img = new window.Image();
      img.onload = () => {
        if ('decode' in img) {
          img.decode().then(updateProgress).catch(updateProgress);
        } else {
          updateProgress();
        }
      };
      img.onerror = updateProgress;
      img.src = src;
    });

    // Timeout after ~2s if loading takes longer, transitioning smoothly to envelope cover
    const safetyTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }, 2000);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, [card]);

  // Lock body scroll while envelope or loader is showing
  useEffect(() => {
    if (!isDismissed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDismissed]);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);

    if (onOpen) {
      onOpen();
    }

    // Allow opening animation to complete before removing from DOM
    setTimeout(() => {
      setIsDismissed(true);
    }, 750);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#251f1c] via-[#1c1816] to-[#12100f] transition-all duration-700 ease-out ${
        isOpening
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Falling Petals */}
      <PetalEffect />

      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* PHASE 1: Initial Card Loading Screen (Circular Progress with Gold Progress Indicator) */}
      <div
        className={`absolute inset-0 z-40 flex items-center justify-center transition-all duration-700 ease-out ${
          isLoading
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="relative flex items-center justify-center">
          {/* Ambient gold glow */}
          <div className="absolute h-24 w-24 rounded-full bg-[#f3ca65]/20 blur-xl animate-pulse pointer-events-none" />

          {/* SVG Circular Progress */}
          <svg className="h-20 w-20 -rotate-90 transform" viewBox="0 0 72 72">
            <defs>
              <linearGradient id="circularGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c5a880" />
                <stop offset="50%" stopColor="#f3ca65" />
                <stop offset="100%" stopColor="#fff0c7" />
              </linearGradient>
            </defs>
            {/* Background track circle */}
            <circle
              cx="36"
              cy="36"
              r="30"
              fill="none"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="3.5"
            />
            {/* Animated Progress Circle */}
            <circle
              cx="36"
              cy="36"
              r="30"
              fill="none"
              stroke="url(#circularGoldGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={188.5}
              strokeDashoffset={188.5 * (1 - progress / 100)}
              className="transition-all duration-300 ease-out"
            />
          </svg>

          {/* Centered Gold Progress Percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-montserrat text-sm font-bold tracking-wide text-[#f3ca65] drop-shadow-[0_2px_8px_rgba(243,202,101,0.5)]">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* PHASE 2: Envelope Cover Card (Bìa thiệp) */}
      <div
        className={`relative z-30 w-[330px] sm:w-[380px] max-w-[92vw] mx-auto px-3 transition-all duration-700 ease-out ${
          !isLoading
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Shadow layer */}
        <div className="relative rounded-[28px] bg-[#fdfbf7] p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] border border-wedding-gold/45 text-center">
          {/* Top Wax Seal */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#962637] via-[#751726] to-[#4f0c17] shadow-[0_4px_18px_rgba(117,23,38,0.5),inset_0_2px_4px_rgba(255,255,255,0.4)] border-2 border-[#b54559]/50 animate-heartbeat">
              <Heart className="h-6 w-6 fill-white text-white drop-shadow-sm" />
            </div>
          </div>

          {/* Inner decorative frame */}
          <div className="rounded-2xl border border-wedding-gold/30 pt-9 pb-6 px-4 sm:px-6 flex flex-col items-center">
            {/* Event Tag */}
            <span className="font-cormorant text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-wedding-brown">
              {isNhaGai ? 'LỄ VU QUY' : 'LỄ THÀNH HÔN'}
            </span>

            {/* Couple Names */}
            <h1 className="mt-2 font-azkia text-[38px] min-[390px]:text-[44px] sm:text-[48px] leading-tight text-neutral-900 drop-shadow-sm">
              {firstName} & {secondName}
            </h1>

            {/* Decorative Gold Flourish Line */}
            <div className="my-3 flex items-center justify-center gap-3 w-full">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-wedding-brown/50" />
              <span className="text-wedding-brown/70 text-xs">❦</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-wedding-brown/50" />
            </div>

            {/* Wedding Date */}
            <p className="font-cormorant text-sm sm:text-base font-bold text-wedding-brown tracking-wide">
              {formattedDate}
            </p>

            {/* Open Button */}
            <div className="mt-7 w-full flex flex-col items-center">
              <button
                onClick={handleOpenInvitation}
                className="group relative flex w-full max-w-[220px] items-center justify-center space-x-2.5 rounded-full bg-neutral-900 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:bg-black hover:shadow-xl active:scale-95 border border-wedding-gold/70 overflow-hidden"
              >
                {/* Shimmer sweep effect */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full animate-[shimmer_2.5s_infinite]" />

                <MailOpen className="h-4 w-4 text-wedding-gold transition-transform group-hover:scale-110" />
                <span className="font-montserrat text-xs font-bold tracking-widest uppercase text-white">
                  Mở Thiệp
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

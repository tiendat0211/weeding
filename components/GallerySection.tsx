'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { WeddingCard } from '@/types/wedding';
import { getPublicStorageUrl } from '@/lib/storage';
import ImageLightbox from './ImageLightbox';
import ScrollAnimation from './ScrollAnimation';
import { Camera, Sparkles } from 'lucide-react';

interface GallerySectionProps {
  card: WeddingCard;
}

export default function GallerySection({ card }: GallerySectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const defaultGallery = [
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

  const rawGallery = card.gallery_urls && card.gallery_urls.length > 0
    ? card.gallery_urls
    : defaultGallery;

  const images = useMemo(
    () => rawGallery.map((url) => getPublicStorageUrl(url)),
    [rawGallery]
  );

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  // Staggered vertical aspect ratios tailored for vertical portrait wedding photography
  const col1Ratios = [
    'aspect-[3/4]',
    'aspect-[2/3]',
    'aspect-[4/5]',
    'aspect-[3/4]',
    'aspect-[2/3]',
    'aspect-[4/5]',
    'aspect-[3/4]',
  ];

  const col2Ratios = [
    'aspect-[2/3]',
    'aspect-[3/4]',
    'aspect-[2/3]',
    'aspect-[4/5]',
    'aspect-[3/4]',
    'aspect-[2/3]',
    'aspect-[4/5]',
  ];

  // Distribute all 14 images into 2 staggered masonry columns
  const col1 = useMemo(
    () => images.map((src, idx) => ({ src, index: idx })).filter((_, i) => i % 2 === 0),
    [images]
  );

  const col2 = useMemo(
    () => images.map((src, idx) => ({ src, index: idx })).filter((_, i) => i % 2 !== 0),
    [images]
  );

  return (
    <section className="px-3.5 py-10 bg-white overflow-hidden">
      {/* Title */}
      <ScrollAnimation type="fade-down" duration={0.8}>
        <div className="text-center mb-6">
          <h2 className="font-pinyon text-4xl text-wedding-brown drop-shadow-sm">
            Album Hình Cưới
          </h2>
          <div className="my-2 h-[1px] w-24 mx-auto bg-wedding-brown/30" />
          <p className="font-cormorant text-xs tracking-widest uppercase text-neutral-500 flex items-center justify-center gap-1.5">
            <Camera className="h-3.5 w-3.5 text-wedding-goldDark" />
            <span>Khoảnh khắc ngọt ngào</span>
          </p>
        </div>
      </ScrollAnimation>

      {/* Staggered Vertical Masonry Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 items-start">
        {/* Column 1 (Even indices: 0, 2, 4, 6, 8, 10, 12) */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {col1.map((item, i) => {
            const ratio = col1Ratios[i % col1Ratios.length];
            return (
              <ScrollAnimation key={`col1-${item.index}`} type="fade-up" delay={0.05 * (i % 3)} duration={0.75}>
                <div
                  onClick={() => openLightbox(item.index)}
                  className={`group relative w-full ${ratio} overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl border border-wedding-gold/25 transition-all duration-300 bg-[#fbf9f6]`}
                >
                  <Image
                    src={item.src}
                    alt={`Album cưới ${item.index + 1}`}
                    fill
                    loading="eager"
                    sizes="(max-width: 430px) 50vw, 220px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: 'center 15%' }}
                  />

                  {/* Elegant hover vignette & action indicator */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                    <span className="font-cormorant text-xs text-white tracking-widest uppercase drop-shadow flex items-center gap-1 bg-black/30 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
                      <Sparkles className="w-3 h-3 text-wedding-gold" />
                      <span>Xem ảnh</span>
                    </span>
                  </div>

                  {/* First photo spotlight badge */}
                  {item.index === 0 && (
                    <div className="absolute top-2.5 left-2.5 bg-black/45 backdrop-blur-sm px-2 py-0.5 rounded-full border border-wedding-gold/40">
                      <span className="font-cormorant text-[10px] text-wedding-gold font-semibold uppercase tracking-wider">
                        ★ Ảnh cưới
                      </span>
                    </div>
                  )}
                </div>
              </ScrollAnimation>
            );
          })}
        </div>

        {/* Column 2 (Odd indices: 1, 3, 5, 7, 9, 11, 13) */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {col2.map((item, i) => {
            const ratio = col2Ratios[i % col2Ratios.length];
            return (
              <ScrollAnimation key={`col2-${item.index}`} type="fade-up" delay={0.08 * (i % 3)} duration={0.75}>
                <div
                  onClick={() => openLightbox(item.index)}
                  className={`group relative w-full ${ratio} overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl border border-wedding-gold/25 transition-all duration-300 bg-[#fbf9f6]`}
                >
                  <Image
                    src={item.src}
                    alt={`Album cưới ${item.index + 1}`}
                    fill
                    loading="eager"
                    sizes="(max-width: 430px) 50vw, 220px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: 'center 15%' }}
                  />

                  {/* Elegant hover vignette & action indicator */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                    <span className="font-cormorant text-xs text-white tracking-widest uppercase drop-shadow flex items-center gap-1 bg-black/30 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
                      <Sparkles className="w-3 h-3 text-wedding-gold" />
                      <span>Xem ảnh</span>
                    </span>
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>

      {/* View all photos action button */}
      <div className="text-center pt-6 pb-2">
        <button
          onClick={() => openLightbox(0)}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-wedding-gold/60 bg-[#fdfbf7] hover:bg-wedding-cream text-wedding-brown font-cormorant text-sm tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow active:scale-95"
        >
          <Camera className="w-4 h-4 text-wedding-goldDark" />
          <span>Xem trọn bộ hình cưới</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        images={images}
        currentIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
        onNext={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
      />
    </section>
  );
}

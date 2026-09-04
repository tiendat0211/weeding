'use client';

import React, { useState, useEffect, useRef } from 'react';
import { VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  audioUrl?: string;
}

export default function MusicPlayer({ audioUrl }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const defaultAudio =
    'https://statics.pancake.vn/web-media/5e/ee/bf/4a/afa10d3bdf98ca17ec3191ebbfd3c829d135d06939ee1f1b712d731d-w:0-h:0-l:2938934-t:audio/mpeg.mp3';

  const src = audioUrl || defaultAudio;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.6;
    audio.loop = true;

    // Try starting on first interaction
    const handleFirstTouch = () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay policy prevented
          });
      }
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };

    window.addEventListener('click', handleFirstTouch, { once: true });
    window.addEventListener('touchstart', handleFirstTouch, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio playback error:', err));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />
      <button
        onClick={toggleMusic}
        title={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        className={`fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-wedding-gold/40 bg-white/85 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 ${
          isPlaying ? 'ring-2 ring-wedding-gold/60 ring-offset-2' : ''
        }`}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <span className="absolute -inset-1 animate-ping rounded-full bg-wedding-gold/30 opacity-75" />
            <Music className="h-5 w-5 animate-spin-slow text-wedding-brown" />
          </div>
        ) : (
          <VolumeX className="h-5 w-5 text-gray-500" />
        )}
      </button>
    </>
  );
}

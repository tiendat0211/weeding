'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

interface CalendarSectionProps {
  weddingDate: string;
  cardSlug?: string;
}

export default function CalendarSection({ weddingDate, cardSlug }: CalendarSectionProps) {
  const targetDate = new Date(weddingDate);
  const targetMonth = targetDate.getMonth(); // 0-indexed
  const targetYear = targetDate.getFullYear();

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const targetTime = new Date(weddingDate).getTime();
    const calculateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  // Calendar calculations
  // Day of week: 0=Sun, 1=Mon, ..., 6=Sat
  // In VN calendar: T2 (Mon)=0, ..., CN (Sun)=6
  const firstDayOfWeek = new Date(targetYear, targetMonth, 1).getDay();
  const offset = (firstDayOfWeek + 6) % 7; // Mon is 0, Sun is 6
  const totalDaysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();

  const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  // Calendar cells
  const cells: (number | null)[] = [];
  for (let i = 0; i < offset; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= totalDaysInMonth; d++) {
    cells.push(d);
  }
  const remaining = (7 - (cells.length % 7)) % 7;
  for (let i = 0; i < remaining; i++) {
    cells.push(null);
  }

  return (
    <section className="px-4 py-8 bg-white overflow-hidden">
      <div className="mx-auto max-w-[370px]">
        {/* Calendar Card */}
        <ScrollAnimation type="fade-up" duration={0.85}>
          {/* Calendar Header - Styled exactly like THIEPMAUCOBAN */}
          <div className="flex items-end justify-between w-full max-w-[370px] mb-2 px-1">
            <div className="font-pinyon text-4xl sm:text-[46px] leading-[1.1] text-wedding-brown">
              Tháng {(targetMonth + 1).toString().padStart(2, '0')}
            </div>
            <div className="font-serif text-5xl sm:text-[66px] font-bold leading-[0.8] text-wedding-brown/90 text-right tracking-tight">
              {targetYear}
            </div>
          </div>

          {/* Calendar Grid Frame */}
          <div className="overflow-hidden rounded-xl border border-wedding-gold/30 shadow-sm">
            {/* Day of Week Headers */}
            <div className="grid grid-cols-7 bg-wedding-brown text-white text-center font-montserrat text-xs font-bold py-2 tracking-wider">
              {daysOfWeek.map((dow, idx) => (
                <div key={idx} className={dow === 'CN' ? 'text-wedding-rose font-extrabold' : ''}>
                  {dow}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 border-t border-wedding-gold/20 bg-wedding-sand/20 divide-x divide-y divide-wedding-gold/20">
              {cells.map((day, idx) => {
                const isDay20 = day === 20;
                const isDay19 = day === 19;
                const highlightDay19 = isDay19 && cardSlug === 'nhagai';
                const isSunday = idx % 7 === 6;

                return (
                  <div
                    key={idx}
                    className={`relative flex h-12 items-center justify-center font-barlow text-sm ${
                      day ? 'text-neutral-800' : 'bg-neutral-50/50'
                    } ${isSunday ? 'font-bold text-wedding-rose' : ''}`}
                  >
                    {day && (
                      <>
                        {/* Day 20: Heart Badge (Lễ Cưới / Thành Hôn / Vu Quy) */}
                        {isDay20 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Heart className="h-8 w-8 fill-red-600 text-red-600 opacity-95 animate-heart-glow" />
                          </div>
                        )}

                        {/* Day 19: Circle Highlight (Chỉ hiển thị cho Nhà Gái) */}
                        {highlightDay19 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-8 w-8 rounded-full border-2 border-wedding-brown bg-wedding-goldLight/70 animate-pulse" />
                          </div>
                        )}

                        <span
                          className={`relative z-10 font-medium ${
                            isDay20
                              ? 'font-bold text-white drop-shadow-md'
                              : highlightDay19
                              ? 'font-bold text-wedding-brown'
                              : ''
                          }`}
                        >
                          {day}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollAnimation>

        {/* Real-time Countdown Timer */}
        <ScrollAnimation type="zoom-in" delay={0.2} duration={0.85}>
          <div className="mt-8 rounded-2xl bg-gradient-to-r from-wedding-goldLight/50 via-white to-wedding-goldLight/50 p-5 border border-wedding-gold/30 text-center shadow-sm">
            <p className="font-montserrat text-xs font-semibold tracking-widest text-wedding-goldDark uppercase">
              {timeLeft.isPassed ? 'Ngày vui đã diễn ra' : 'Đếm ngược đến ngày hạnh phúc'}
            </p>

            <div className="mt-4 grid grid-cols-4 gap-2">
              <div className="flex flex-col items-center rounded-xl bg-white p-2.5 shadow-sm border border-wedding-gold/20">
                <span className="font-barlow text-2xl font-bold text-wedding-brown">
                  {timeLeft.days}
                </span>
                <span className="font-montserrat text-[10px] uppercase text-neutral-500">Ngày</span>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-white p-2.5 shadow-sm border border-wedding-gold/20">
                <span className="font-barlow text-2xl font-bold text-wedding-brown">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span className="font-montserrat text-[10px] uppercase text-neutral-500">Giờ</span>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-white p-2.5 shadow-sm border border-wedding-gold/20">
                <span className="font-barlow text-2xl font-bold text-wedding-brown">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span className="font-montserrat text-[10px] uppercase text-neutral-500">Phút</span>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-white p-2.5 shadow-sm border border-wedding-gold/20">
                <span className="font-barlow text-2xl font-bold text-wedding-rose">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
                <span className="font-montserrat text-[10px] uppercase text-neutral-500">Giây</span>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

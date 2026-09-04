'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

interface QuoteSectionProps {
  quote?: string;
}

export default function QuoteSection({ quote }: QuoteSectionProps) {
  const defaultQuote =
    '“Hôn nhân là chuyện cả đời,\nYêu người vừa ý, cưới người mình thương...”';

  const text = (quote || defaultQuote)
    .replace(/\\n/g, '\n')
    .replace(/<br\s*\/?>/gi, '\n');

  return (
    <section className="relative px-6 py-10 text-center bg-gradient-to-b from-white via-wedding-cream to-white overflow-hidden">
      <ScrollAnimation type="fade-up" duration={0.9}>
        <div className="mx-auto flex max-w-sm flex-col items-center">
          <div className="flex items-center space-x-3 text-wedding-gold/60 mb-3">
            <span className="h-[1px] w-12 bg-wedding-gold/40" />
            <Heart className="h-4 w-4 fill-wedding-gold/30 text-wedding-gold" />
            <span className="h-[1px] w-12 bg-wedding-gold/40" />
          </div>

          <p className="whitespace-pre-line font-pinyon text-2xl leading-relaxed text-wedding-brown drop-shadow-sm">
            {text}
          </p>

          <div className="mt-4 flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-wedding-gold/50" />
            <span className="h-[1px] w-20 bg-wedding-gold/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-wedding-gold/50" />
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
}

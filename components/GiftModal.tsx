'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Copy, Check, Gift } from 'lucide-react';
import { WeddingCard } from '@/types/wedding';
import { getPublicStorageUrl } from '@/lib/storage';

interface GiftModalProps {
  card: WeddingCard;
  isOpen: boolean;
  onClose: () => void;
}

export default function GiftModal({ card, isOpen, onClose }: GiftModalProps) {
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);

  if (!isOpen) return null;

  const groomBank = {
    bank: card.bank_groom_bank || 'MB Bank',
    accountNumber: card.bank_groom_number || '8838683860',
    accountName: card.bank_groom_name || card.groom_name,
    qrUrl: getPublicStorageUrl(card.bank_groom_qr) ||
      'https://statics.pancake.vn/web-media/11/83/93/27/c91fcbd3c11d401bafafc82e0178e671af2f59f3167097643b9baf99-w:1284-h:2778-l:390596-t:image/jpeg.jpg',
  };

  const brideBank = {
    bank: card.bank_bride_bank || 'Techcombank',
    accountNumber: card.bank_bride_number || '1903683868',
    accountName: card.bank_bride_name || card.bride_name,
    qrUrl: getPublicStorageUrl(card.bank_bride_qr) ||
      'https://statics.pancake.vn/web-media/11/83/93/27/c91fcbd3c11d401bafafc82e0178e671af2f59f3167097643b9baf99-w:1284-h:2778-l:390596-t:image/jpeg.jpg',
  };

  const copyToClipboard = (text: string, isGroom: boolean) => {
    navigator.clipboard.writeText(text);
    if (isGroom) {
      setCopiedGroom(true);
      setTimeout(() => setCopiedGroom(false), 2000);
    } else {
      setCopiedBride(true);
      setTimeout(() => setCopiedBride(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeInUp"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-wedding-gold/40 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-5">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-wedding-goldLight text-wedding-brown">
            <Gift className="h-5 w-5" />
          </div>
          <h2 className="font-pinyon text-3xl text-wedding-brown">
            Gửi Mừng Cưới
          </h2>
          <div className="my-1.5 h-[1px] w-20 mx-auto bg-wedding-brown/30" />
          <p className="font-montserrat text-xs text-neutral-500">
            Món quà ý nghĩa chúc phúc cho đôi uyên ương
          </p>
        </div>

        {/* Tabs: Chú Rể / Cô Dâu */}
        <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl bg-neutral-100 p-1">
          <button
            onClick={() => setActiveTab('groom')}
            className={`rounded-lg py-2 text-xs font-semibold transition-all ${
              activeTab === 'groom'
                ? 'bg-white text-wedding-brown shadow-sm'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Mừng Chú Rể
          </button>
          <button
            onClick={() => setActiveTab('bride')}
            className={`rounded-lg py-2 text-xs font-semibold transition-all ${
              activeTab === 'bride'
                ? 'bg-white text-wedding-brown shadow-sm'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Mừng Cô Dâu
          </button>
        </div>

        {/* QR & Bank Details */}
        {activeTab === 'groom' ? (
          <div className="flex flex-col items-center text-center space-y-3">
            {/* QR Code */}
            <div className="relative h-56 w-56 overflow-hidden rounded-xl border-2 border-wedding-gold/30 p-2 shadow-sm bg-white">
              <Image
                src={groomBank.qrUrl}
                alt="QR Mừng cưới Chú rể"
                fill
                sizes="224px"
                className="object-contain p-1"
              />
            </div>

            {/* Account Info */}
            <div className="w-full rounded-xl bg-wedding-sand/40 p-3.5 text-left border border-wedding-gold/20">
              <p className="font-montserrat text-xs text-neutral-500">Ngân hàng:</p>
              <p className="font-montserrat text-sm font-bold text-neutral-900">{groomBank.bank}</p>

              <p className="mt-2 font-montserrat text-xs text-neutral-500">Chủ tài khoản:</p>
              <p className="font-montserrat text-sm font-bold text-neutral-900 uppercase">
                {groomBank.accountName}
              </p>

              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="font-montserrat text-xs text-neutral-500">Số tài khoản:</p>
                  <p className="font-barlow text-lg font-bold text-wedding-brown">
                    {groomBank.accountNumber}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(groomBank.accountNumber, true)}
                  className="flex items-center space-x-1 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm border border-neutral-200 hover:bg-neutral-50 active:scale-95"
                >
                  {copiedGroom ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-green-600" />
                      <span className="text-green-600 font-semibold">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-wedding-goldDark" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-3">
            {/* QR Code */}
            <div className="relative h-56 w-56 overflow-hidden rounded-xl border-2 border-wedding-gold/30 p-2 shadow-sm bg-white">
              <Image
                src={brideBank.qrUrl}
                alt="QR Mừng cưới Cô dâu"
                fill
                sizes="224px"
                className="object-contain p-1"
              />
            </div>

            {/* Account Info */}
            <div className="w-full rounded-xl bg-wedding-sand/40 p-3.5 text-left border border-wedding-gold/20">
              <p className="font-montserrat text-xs text-neutral-500">Ngân hàng:</p>
              <p className="font-montserrat text-sm font-bold text-neutral-900">{brideBank.bank}</p>

              <p className="mt-2 font-montserrat text-xs text-neutral-500">Chủ tài khoản:</p>
              <p className="font-montserrat text-sm font-bold text-neutral-900 uppercase">
                {brideBank.accountName}
              </p>

              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="font-montserrat text-xs text-neutral-500">Số tài khoản:</p>
                  <p className="font-barlow text-lg font-bold text-wedding-brown">
                    {brideBank.accountNumber}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(brideBank.accountNumber, false)}
                  className="flex items-center space-x-1 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm border border-neutral-200 hover:bg-neutral-50 active:scale-95"
                >
                  {copiedBride ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-green-600" />
                      <span className="text-green-600 font-semibold">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-wedding-goldDark" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

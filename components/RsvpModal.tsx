'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Send, Loader2 } from 'lucide-react';
import { submitRsvp } from '@/app/actions/rsvp';
import confetti from 'canvas-confetti';

interface RsvpModalProps {
  cardId: string;
  isOpen: boolean;
  onClose: () => void;
  defaultGuestName?: string;
}

export default function RsvpModal({
  cardId,
  isOpen,
  onClose,
  defaultGuestName = '',
}: RsvpModalProps) {
  const [guestName, setGuestName] = useState(defaultGuestName);
  const [attendeeSide, setAttendeeSide] = useState('both');
  const [attending, setAttending] = useState('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMessage('Vui lòng nhập tên của bạn');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitRsvp({
        card_id: cardId,
        guest_name: guestName.trim(),
        attendee_side: attendeeSide,
        attending,
        guest_count: Number(guestCount),
        phone: phone.trim(),
        message: message.trim(),
      });

      setIsSuccess(true);

      // Trigger confetti celebration!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c5a880', '#e8b4b8', '#ffffff', '#7b6252'],
      });

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3500);
    } catch (err: unknown) {
      console.error('RSVP Error:', err);
      const msg = err instanceof Error ? err.message : 'Có lỗi xảy ra khi gửi. Vui lòng thử lại!';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
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

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="font-pinyon text-3xl text-wedding-brown">
              Cảm Ơn Bạn!
            </h3>
            <p className="font-montserrat text-sm text-neutral-600 leading-relaxed">
              Thông tin phản hồi của bạn đã được gửi thành công đến Dâu & Rể.
              Rất mong được đón tiếp bạn trong ngày vui!
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <h2 className="font-pinyon text-3xl text-wedding-brown">
                Xác Nhận Tham Dự
              </h2>
              <div className="my-1.5 h-[1px] w-20 mx-auto bg-wedding-brown/30" />
              <p className="font-montserrat text-xs text-neutral-500">
                Hãy cho Dâu Rể biết để chuẩn bị chu đáo nhất nhé!
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-200">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Tên của bạn là? <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-wedding-gold focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                />
              </div>

              {/* Guest side */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Bạn là khách của:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'groom', label: 'Nhà Trai' },
                    { id: 'bride', label: 'Nhà Gái' },
                    { id: 'both', label: 'Cả Hai' },
                  ].map((side) => (
                    <button
                      type="button"
                      key={side.id}
                      onClick={() => setAttendeeSide(side.id)}
                      className={`rounded-xl py-2 text-xs font-medium border transition-all ${
                        attendeeSide === side.id
                          ? 'border-wedding-gold bg-wedding-goldLight/60 text-wedding-brown font-semibold shadow-sm'
                          : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      {side.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attendance */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Bạn có tham dự không? <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`rounded-xl py-2.5 text-xs font-medium border transition-all ${
                      attending === 'yes'
                        ? 'border-wedding-gold bg-wedding-goldLight/60 text-wedding-brown font-semibold shadow-sm'
                        : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    🎉 Có thể tham dự
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`rounded-xl py-2.5 text-xs font-medium border transition-all ${
                      attending === 'no'
                        ? 'border-neutral-400 bg-neutral-100 text-neutral-800 font-semibold shadow-sm'
                        : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    😢 Rất tiếc không thể
                  </button>
                </div>
              </div>

              {/* Count & Phone */}
              {attending === 'yes' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Số người đi cùng
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full rounded-xl border border-neutral-300 px-3 py-2.5 text-sm focus:border-wedding-gold focus:outline-none"
                    >
                      <option value={1}>1 người (Mình tôi)</option>
                      <option value={2}>2 người</option>
                      <option value={3}>3 người</option>
                      <option value={4}>4 người</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      placeholder="0912..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm focus:border-wedding-gold focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Gửi lời chúc đến Dâu Rể nhé!
                </label>
                <textarea
                  rows={3}
                  placeholder="Chúc hai bạn trăm năm hạnh phúc, mãi mãi yêu thương..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-sm focus:border-wedding-gold focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-neutral-900 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-black active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-wedding-gold" />
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 text-wedding-gold" />
                    <span>Gửi Ngay</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

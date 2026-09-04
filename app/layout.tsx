import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lytaiweeding.vercel.app"),
  title: "Thiệp Cưới Online | Duy Tài & Hương Ly",
  description: "Trân trọng kính mời quý khách đến tham dự lễ thành hôn của Duy Tài & Hương Ly. Xem thông tin lịch trình, địa điểm, album ảnh cưới và xác nhận tham dự.",
  openGraph: {
    title: "Thiệp Cưới Online | Duy Tài & Hương Ly",
    description: "Trân trọng kính mời quý khách đến tham dự lễ thành hôn của Duy Tài & Hương Ly.",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: "https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2309.jpg",
        width: 1200,
        height: 630,
        alt: "Thiệp Cưới Duy Tài & Hương Ly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiệp Cưới Online | Duy Tài & Hương Ly",
    description: "Trân trọng kính mời quý khách đến tham dự lễ thành hôn của Duy Tài & Hương Ly.",
    images: [
      "https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2309.jpg",
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}

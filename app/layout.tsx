import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thiệp Cưới Online | Thư Mời Cưới Sang Trọng & Tinh Tế",
  description: "Trân trọng kính mời quý khách đến tham dự lễ thành hôn. Xem thông tin lịch trình, địa điểm, album ảnh cưới và xác nhận tham dự.",
  openGraph: {
    title: "Thiệp Cưới Online | Thư Mời Cưới",
    description: "Trân trọng kính mời quý khách đến tham dự lễ thành hôn.",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: "https://statics.pancake.vn/web-media/ba/c9/4b/24/84ae78afd952235a6810cde46e51ca2a384ff16ca11cc946f7b0dfc9-w:966-h:1449-l:129939-t:image/jpeg.jpg",
        width: 966,
        height: 1449,
        alt: "Thiệp cưới",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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

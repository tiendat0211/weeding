import { Metadata } from 'next';
import { getWeddingCardBySlug, getPublicStorageUrl } from '@/lib/supabase';
import { fallbackWeddingCardNhaTrai } from '@/lib/fallbackCard';
import WeddingCardView from '@/components/WeddingCardView';

interface PageProps {
  searchParams: {
    to?: string;
    guest?: string;
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const card =
    (await getWeddingCardBySlug('nhatrai')) || fallbackWeddingCardNhaTrai;
  const title = `Lễ Thành Hôn | ${card.groom_name} & ${card.bride_name}`;
  const weddingDate = new Date(card.wedding_date);
  const formattedDate = `${weddingDate.getDate()}/${weddingDate.getMonth() + 1}/${weddingDate.getFullYear()}`;
  const description = `Trân trọng kính mời quý khách đến tham dự lễ thành hôn của ${card.groom_name} & ${card.bride_name} vào ngày ${formattedDate}.`;
  const heroImage =
    getPublicStorageUrl(card.hero_image_url) ||
    'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2309.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'vi_VN',
      url: 'https://lytaiweeding.vercel.app',
      siteName: 'Thiệp Cưới Online',
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: `Thiệp Cưới ${card.groom_name} & ${card.bride_name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [heroImage],
    },
  };
}

export default async function HomePage({ searchParams }: PageProps) {
  const card =
    (await getWeddingCardBySlug('nhatrai')) || fallbackWeddingCardNhaTrai;
  const guestName = searchParams.to || searchParams.guest;

  return <WeddingCardView card={card} guestName={guestName} />;
}

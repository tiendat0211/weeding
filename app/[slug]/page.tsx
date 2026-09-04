import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWeddingCardBySlug, getPublicStorageUrl } from '@/lib/supabase';
import {
  fallbackWeddingCardNhaTrai,
  fallbackWeddingCardNhaGai,
} from '@/lib/fallbackCard';
import WeddingCardView from '@/components/WeddingCardView';

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {
    to?: string;
    guest?: string;
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  let card = await getWeddingCardBySlug(params.slug);

  if (!card) {
    if (params.slug === 'nhatrai' || params.slug === 'thiep-mau-co-ban') {
      card = fallbackWeddingCardNhaTrai;
    } else if (params.slug === 'nhagai') {
      card = fallbackWeddingCardNhaGai;
    }
  }

  if (!card) {
    return {
      title: 'Thiệp Cưới Không Tồn Tại',
    };
  }

  const isNhaGai = params.slug === 'nhagai';
  const title = isNhaGai
    ? `Lễ Vu Quy | ${card.bride_name} & ${card.groom_name}`
    : `Lễ Thành Hôn | ${card.groom_name} & ${card.bride_name}`;

  const weddingDate = new Date(card.wedding_date);
  const formattedDate = `${weddingDate.getDate()}/${weddingDate.getMonth() + 1}/${weddingDate.getFullYear()}`;
  const description = isNhaGai
    ? `Trân trọng kính mời quý khách đến tham dự lễ vu quy của ${card.bride_name} & ${card.groom_name} vào ngày ${formattedDate}.`
    : `Trân trọng kính mời quý khách đến tham dự lễ thành hôn của ${card.groom_name} & ${card.bride_name} vào ngày ${formattedDate}.`;
  
  const heroImage =
    getPublicStorageUrl(card.hero_image_url) ||
    'https://xwfttbdowexyxpmhvvfs.supabase.co/storage/v1/object/public/Weeding/lytaiweeding/WAGO2309.jpg';

  const coupleAlt = isNhaGai
    ? `Thiệp Cưới ${card.bride_name} & ${card.groom_name}`
    : `Thiệp Cưới ${card.groom_name} & ${card.bride_name}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'vi_VN',
      url: `https://lytaiweeding.vercel.app/${params.slug}`,
      siteName: 'Thiệp Cưới Online',
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: coupleAlt,
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

export default async function WeddingPage({ params, searchParams }: PageProps) {
  let card = await getWeddingCardBySlug(params.slug);

  if (!card) {
    if (params.slug === 'nhatrai' || params.slug === 'thiep-mau-co-ban') {
      card = fallbackWeddingCardNhaTrai;
    } else if (params.slug === 'nhagai') {
      card = fallbackWeddingCardNhaGai;
    }
  }

  if (!card) {
    notFound();
  }

  const guestName = searchParams.to || searchParams.guest;

  return <WeddingCardView card={card} guestName={guestName} />;
}

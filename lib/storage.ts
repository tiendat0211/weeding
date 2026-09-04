const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xwfttbdowexyxpmhvvfs.supabase.co';
const defaultBucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'BlockPass';

export function getPublicStorageUrl(pathOrUrl?: string | null): string {
  if (!pathOrUrl) return '';
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const cleanPath = pathOrUrl.replace(/^\/+/, '');
  if (cleanPath.startsWith('Weeding/')) {
    return `${supabaseUrl}/storage/v1/object/public/${cleanPath}`;
  }
  if (cleanPath.startsWith('lytaiweeding/')) {
    return `${supabaseUrl}/storage/v1/object/public/Weeding/${cleanPath}`;
  }
  if (cleanPath.startsWith('BlockPass/')) {
    return `${supabaseUrl}/storage/v1/object/public/${cleanPath}`;
  }
  return `${supabaseUrl}/storage/v1/object/public/${defaultBucket}/${cleanPath}`;
}

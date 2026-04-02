import CinemaDetailsPage from '@/_pages/CinemaDetailsPage/CinemaDetailsPage';
import CinemaDetailsSkeleton from '@/_pages/CinemaDetailsPage/skeleton';
import { getFilm } from '@/entities/cinema/api/queries/getFilm';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import type { Metadata } from 'next';

type Props = {
  params: { documentId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const documentId = resolvedParams.documentId;

  const film = await getFilm(documentId);
  if (!film) return {};

  return {
    title: `${film.data.title} | CinemaКино`,
    description: film.data.description || 'Смотрите фильм онлайн бесплатно в хорошем качестве.',
    keywords: film.data.title,
  };
}

export default async function CinemaDetails({ params }: Props) {
  const resolvedParams = await params;
  const documentId = resolvedParams.documentId;

  const film = await getFilm(documentId);
  if (!film) notFound();

  return (
    <>
      <Suspense fallback={<CinemaDetailsSkeleton />}>
        <CinemaDetailsPage film={film.data} />
      </Suspense>
    </>
  );
}

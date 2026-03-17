import CinemaDetailsPage from '@/_pages/CinemaDetailsPage/CinemaDetailsPage';
import CinemaDetailsSkeleton from '@/_pages/CinemaDetailsPage/skeleton';
import { getFilm } from '@/entities/cinema/api/queries/getFilm';
import Seo from '@/shared/ui/Seo';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: { documentId: string };
};

export default async function CinemaDetails({ params }: Props) {
  const resolvedParams = await params;
  const documentId = resolvedParams.documentId;

  const film = await getFilm(documentId);
  if (!film) notFound();

  return (
    <>
      <Seo title={film.data.title} description={film.data.description} keywords={film.data.title} />
      <Suspense fallback={<CinemaDetailsSkeleton />}>
        <CinemaDetailsPage film={film.data} />
      </Suspense>
    </>
  );
}

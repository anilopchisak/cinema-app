import CinemaDetailsPage from '@/_pages/CinemaDetailsPage/CinemaDetailsPage';
import CinemaDetailsSkeleton from '@/_pages/CinemaDetailsPage/skeleton';
import { prefetchFilm } from '@/entities/cinema/api/queries/prefetch-film';
import { HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CinemaDetails({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const documentId = resolvedSearchParams.documentId as string;
  const dehydratedState = await prefetchFilm(documentId);

  return (
    <>
      <Suspense fallback={<CinemaDetailsSkeleton />}>
        <HydrationBoundary state={dehydratedState}>
          <CinemaDetailsPage />
        </HydrationBoundary>
      </Suspense>
    </>
  );
}

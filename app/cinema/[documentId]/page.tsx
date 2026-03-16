import CinemaDetailsPage from '@/_pages/CinemaDetailsPage/CinemaDetailsPage';
import { prefetchFilm } from '@/entities/cinema/api/queries/prefetch-film';
import { HydrationBoundary } from '@tanstack/react-query';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CinemaDetails({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const documentId = resolvedSearchParams.documentId as string;
  const dehydratedState = await prefetchFilm(documentId);

  return (
    <>
      {/* <Seo title={film.title} description={film.description} keywords={film.title} /> */}
      <HydrationBoundary state={dehydratedState}>
        <CinemaDetailsPage />
      </HydrationBoundary>
    </>
  );
}

import CinemaPage from '@/_pages/CinemaPage/CinemaPage';
// import { prefetchCinema } from '@/entities/cinema/api/hooks/prefetch-cinema';
// import { getCinemaParams } from '@/entities/cinema/lib/getCinemaParams';
// import CinemaContent from '@/widgets/cinema/CinemaContent/CinemaContent';
// import CinemaIntro from '@/widgets/cinema/CinemaIntro';
// import { HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Cinema({ searchParams }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CinemaPage searchParams={searchParams} />
    </Suspense>
  );
}

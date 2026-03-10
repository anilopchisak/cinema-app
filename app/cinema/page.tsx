import { prefetchCinema } from '@/entities/cinema/api/hooks/prefetch-cinema';
import { getCinemaParams } from '@/entities/cinema/lib/getCinemaParams';
import CinemaContent from '@/widgets/cinema/CinemaContent/CinemaContent';
import CinemaFilters from '@/widgets/cinema/CinemaFilters';
import CinemaIntro from '@/widgets/cinema/CinemaIntro';
import CinemaList from '@/widgets/cinema/CinemaList/CinemaList';
import CinemaListSkeleton from '@/widgets/cinema/CinemaList/skeleton';
import { HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Cinema({ searchParams }: Props) {
  // const resolvedSearchParams = await searchParams;

  // const params = getCinemaParams(resolvedSearchParams);

  const dehydratedState = await prefetchCinema();
  //   {
  //   ...params.apiParams,
  //   page: params.page,
  // }

  return (
    <div>
      <CinemaIntro />

      <HydrationBoundary state={dehydratedState}>
        <CinemaContent initialParams={getCinemaParams(searchParams)} />
        {/* <CinemaFilters initialParams={params} /> */}
        {/* <Suspense fallback={<CinemaListSkeleton />}>
          <CinemaList initialParams={params} />
        </Suspense> */}
      </HydrationBoundary>
    </div>
  );
}

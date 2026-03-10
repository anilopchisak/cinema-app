import { prefetchCinema } from '@/entities/cinema/api/hooks/prefetch-cinema';
import { getCinemaParams } from '@/entities/cinema/lib/getCinemaParams';
import CinemaFilters from '@/widgets/cinema/CinemaFilters';
import CinemaIntro from '@/widgets/cinema/CinemaIntro';
import { HydrationBoundary } from '@tanstack/react-query';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Cinema({ searchParams }: Props) {
  // const resolvedSearchParams = await searchParams;

  // const params = getCinemaParams(resolvedSearchParams);

  const dehydratedState =
    await prefetchCinema();
    //   {
    //   ...params.apiParams,
    //   page: params.page,
    // }

  return (
    <div>
      <CinemaIntro />

      <HydrationBoundary state={dehydratedState}>
        {/* <CinemaFilters initialParams={params} /> */}
        {/* <CinemaList /> */}
      </HydrationBoundary>
    </div>
  );
}

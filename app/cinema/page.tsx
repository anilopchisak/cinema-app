import { prefetchCinema } from '@/entities/cinema/api/hooks/prefetch-cinema';
import { getCinemaParams } from '@/entities/cinema/lib/getCinemaParams';
import CinemaContent from '@/widgets/cinema/CinemaContent/CinemaContent';
import CinemaIntro from '@/widgets/cinema/CinemaIntro';
import { HydrationBoundary } from '@tanstack/react-query';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Cinema({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const params = getCinemaParams(resolvedSearchParams);

  const dehydratedState = await prefetchCinema(params.apiParams, params.rawParams.page);

  return (
    <div>
      <CinemaIntro />
      <HydrationBoundary state={dehydratedState}>
        <CinemaContent rawParams={params.rawParams} apiParams={params.apiParams} />
      </HydrationBoundary>
    </div>
  );
}

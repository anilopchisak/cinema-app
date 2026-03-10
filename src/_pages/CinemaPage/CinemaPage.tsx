import { prefetchCinema } from '@/entities/cinema/api/hooks/prefetch-cinema';
import { getCinemaParams } from '@/entities/cinema/lib/getCinemaParams';
import CinemaContent from '@/widgets/cinema/CinemaContent/CinemaContent';
import CinemaIntro from '@/widgets/cinema/CinemaIntro';
import { HydrationBoundary } from '@tanstack/react-query';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CinemaPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const params = getCinemaParams(resolvedSearchParams);

  const dehydratedState = await prefetchCinema({
    ...params.apiParams,
  });

  return (
    <div>
      <CinemaIntro />

      <HydrationBoundary state={dehydratedState}>
        <CinemaContent initialParams={params} />
      </HydrationBoundary>
    </div>
  );
}

import CinemaIntro from '@/widgets/cinema/CinemaIntro';
import CinemaFiltersSkeleton from '@/widgets/cinema/CinemaFilters/skeleton/CinemaFiltersSkeleton';
import CinemaListSkeleton from '@/widgets/cinema/CinemaList/skeleton';

export default function Loading() {
  return (
    <>
      <CinemaIntro />
      <CinemaFiltersSkeleton />
      <CinemaListSkeleton />
    </>
  );
}


import CinemaDetailsPage from '@/_pages/CinemaDetailsPage/CinemaDetailsPage';
import CinemaDetailsSkeleton from '@/_pages/CinemaDetailsPage/skeleton';
import { Suspense } from 'react';

export default async function CinemaDetails() {
  return (
    <Suspense fallback={<CinemaDetailsSkeleton />}>
      <CinemaDetailsPage />
    </Suspense>
  );
}

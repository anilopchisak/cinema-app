import CinemaDetailsPage from '@/_pages/CinemaDetailsPage/CinemaDetailsPage';
import { getFilm } from '@/entities/cinema/api/queries/getFilm';
import Seo from '@/shared/ui/Seo';
import { notFound } from 'next/navigation';

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
      <CinemaDetailsPage film={film.data} />
    </>
  );
}

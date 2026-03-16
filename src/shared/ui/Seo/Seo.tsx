import Head from 'next/head';

const SITE_NAME = 'CinemaКино';
const DEFAULT_TITLE = 'Смотрите фильмы онлайн бесплатно';
const DEFAULT_DESCRIPTION =
  'Лучшие фильмы в хорошем качестве. Удобный поиск, избранное, личный кабинет.';
const DEFAULT_KEYWORDS = 'кино, фильмы, онлайн, смотреть, бесплатно';

type Props = {
  title?: string;
  description?: string;
  keywords?: string;
  noindex?: boolean;
};

export default function Seo({ title, description, keywords, noindex = false }: Props) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const metaKeywords = keywords || DEFAULT_KEYWORDS;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      {noindex && <meta name="robots" content="noindex, follow" />}
    </Head>
  );
}

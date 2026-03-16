'use client';

import Head from 'next/head';
import { usePathname, useSearchParams } from 'next/navigation';

const SITE_NAME = 'CinemaКино';
const DEFAULT_TITLE = 'Смотрите фильмы онлайн бесплатно';
const DEFAULT_DESCRIPTION =
  'Лучшие фильмы в хорошем качестве. Удобный поиск, избранное, личный кабинет.';
const DEFAULT_KEYWORDS = 'кино, фильмы, онлайн, смотреть, бесплатно';
const DEFAULT_OG_IMAGE = '/og_image_solid.png';
const DEFAULT_OG_IMAGE_WIDTH = 1200;
const DEFAULT_OG_IMAGE_HEIGHT = 630;
const DEFAULT_OG_IMAGE_TYPE = 'image/png';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

type Props = {
  title?: string;
  description?: string;
  keywords?: string;
  noindex?: boolean;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageType?: string;
  ogType?: 'website' | 'article' | 'video.movie' | string;
  canonical?: string;
  yandexVerification?: string;
};

export default function Seo({
  title,
  description,
  keywords,
  noindex = false,
  ogImage,
  ogImageWidth = DEFAULT_OG_IMAGE_WIDTH,
  ogImageHeight = DEFAULT_OG_IMAGE_HEIGHT,
  ogImageType = DEFAULT_OG_IMAGE_TYPE,
  ogType = 'website',
  canonical,
  yandexVerification,
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Полный заголовок
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const metaKeywords = keywords || DEFAULT_KEYWORDS;
  const metaOgImage = ogImage || DEFAULT_OG_IMAGE;

  // Текущий URL (без query-параметров для канонического, но полный для og:url)
  const currentUrl = `${SITE_URL}${pathname}${searchParams?.toString() ? '?' + searchParams.toString() : ''}`;
  const canonicalUrl = canonical || `${SITE_URL}${pathname}`;

  return (
    <Head>
      {/* Базовые мета-теги */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}

      {/* Каноническая ссылка */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Управление индексацией */}
      {noindex && <meta name="robots" content="noindex, follow" />}

      {/* Верификация Яндекса (если передана) */}
      {yandexVerification && <meta name="yandex-verification" content={yandexVerification} />}

      {/* Open Graph – для ВК, Telegram, Facebook и др. */}
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:image:type" content={ogImageType} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Cards (читается и другими сервисами) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaOgImage} />
    </Head>
  );
}

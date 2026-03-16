'use client';

import Head from 'next/head';
import { usePathname, useSearchParams } from 'next/navigation';

/** Название сайта для формирования заголовков */
const SITE_NAME = 'CinemaКино';

/** Заголовок по умолчанию */
const DEFAULT_TITLE = 'Смотрите фильмы онлайн бесплатно';

/** Описание по умолчанию */
const DEFAULT_DESCRIPTION =
  'Лучшие фильмы в хорошем качестве. Удобный поиск, избранное, личный кабинет.';

/** Ключевые слова по умолчанию */
const DEFAULT_KEYWORDS = 'кино, фильмы, онлайн, смотреть, бесплатно';

/** Изображение Open Graph по умолчанию */
const DEFAULT_OG_IMAGE = '/og_image_solid.png';

/** Ширина изображения Open Graph по умолчанию */
const DEFAULT_OG_IMAGE_WIDTH = 1200;

/** Высота изображения Open Graph по умолчанию */
const DEFAULT_OG_IMAGE_HEIGHT = 630;

/** MIME-тип изображения Open Graph по умолчанию */
const DEFAULT_OG_IMAGE_TYPE = 'image/png';

/** Базовый URL сайта (из переменных окружения или localhost) */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/** Свойства компонента Seo */
type Props = {
  /** Заголовок страницы (будет дополнен названием сайта) */
  title?: string;
  /** Мета-описание страницы */
  description?: string;
  /** Ключевые слова страницы */
  keywords?: string;
  /** Запретить индексацию страницы (noindex) */
  noindex?: boolean;
  /** Путь к изображению для Open Graph (по умолчанию /og_image_solid.png) */
  ogImage?: string;
  /** Ширина изображения Open Graph */
  ogImageWidth?: number;
  /** Высота изображения Open Graph */
  ogImageHeight?: number;
  /** MIME-тип изображения Open Graph */
  ogImageType?: string;
  /** Тип Open Graph (website, article, video.movie и т.д.) */
  ogType?: 'website' | 'article' | 'video.movie' | string;
  /** Канонический URL (если не передан, строится из pathname) */
  canonical?: string;
  /** Код верификации Яндекса (для мета-тега yandex-verification) */
  yandexVerification?: string;
};

/** Компонент для управления SEO-метаданными страницы: заголовок, description, Open Graph, canonical и др. */
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

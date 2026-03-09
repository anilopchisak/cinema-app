"use client";

import Button from "@/shared/ui/Button";
import type { FilmWithFavorite } from "@/entities/cinema/types/cinema.types";
import type React from "react";
import Card from "@/shared/ui/Card";
import FilmMeta from "@/entities/cinema/ui/FilmMeta";
import FilmStat from "@/entities/cinema/ui/FilmStat";
import s from "./CinemaCard.module.scss";

interface CinemaCardProps {
  film: FilmWithFavorite;
  onOpenDetail: (id: string) => void;
  onToggleFavorite: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    isFavorite?: boolean,
  ) => void;
}

const CinemaCard = ({
  film,
  onOpenDetail,
  onToggleFavorite,
}: CinemaCardProps) => {
  return (
    <Card
      key={film.documentId}
      image={film?.poster?.url}
      captionSlot={
        <FilmMeta
          items={[
            String(film.releaseYear),
            film.category?.title ?? "",
            film.ageLimit ? `${film.ageLimit}+` : "",
          ].filter(Boolean)}
        />
      }
      title={film.title}
      subtitle={film.shortDescription}
      actionSlot={
        <div className={s.cardActions}>
          <Button
            onClick={(e) =>
              onToggleFavorite(e, film.documentId, film.isFavorite)
            }
            styleType={film.isFavorite ? "outline" : "outline-secondary"}
          >
            {film.isFavorite ? "В избранном" : "В избранное"}
          </Button>
          <Button onClick={(e) => e.stopPropagation()}>Смотреть</Button>
        </div>
      }
      onClick={() => onOpenDetail(film.documentId)}
      metaSlot={
        <>
          {film.rating && (
            <FilmStat className={s.rating} rating={film.rating} />
          )}
          {film.duration && (
            <FilmStat className={s.duration} duration={film.duration} />
          )}
        </>
      }
    />
  );
};

export default CinemaCard;

import Text from "@/shared/ui/Text";
import cn from "classnames";
import React from "react";
import s from "./Card.module.scss";
import Image from "next/image";

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  /** Слот для мета-информации (рейтинг и т.д.) */
  metaSlot?: React.ReactNode;
};

const Card = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  metaSlot,
}: CardProps) => {
  return (
    <div className={cn(s.card, className)} onClick={onClick}>
      <div className={s.header}>
        <Image
          className={s.image}
          src={image}
          alt="card"
          width={100}
          height={100}
        />
      </div>

      <div className={s.body}>
        <div>
          {captionSlot && (
            <Text
              className={s.caption}
              tag="div"
              view="p-16"
              weight="medium"
              color="primary"
            >
              {captionSlot}
            </Text>
          )}

          <Text
            maxLines={2}
            tag="h4"
            view="p-20"
            weight="medium"
            color="primary"
          >
            {title}
          </Text>

          <Text
            maxLines={2}
            className={s.subtitle}
            view="p-16"
            color="secondary"
          >
            {subtitle}
          </Text>
        </div>

        <div className={s.footer}>
          {contentSlot && (
            <Text view="p-18" weight="bold" className={s.content}>
              {contentSlot}
            </Text>
          )}
          <div className={s.action}>{actionSlot}</div>
        </div>
      </div>

      {metaSlot}
    </div>
  );
};

export default Card;

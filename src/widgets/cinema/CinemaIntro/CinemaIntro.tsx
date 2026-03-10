import Text from '@/shared/ui/Text';
import s from './CinemaIntro.module.scss';

/** Заголовок страницы CinemaPage */
const CinemaIntro = () => {
  return (
    <div className={s.intro}>
      <Text view="title" color="primary" className={s.title}>
        Cinema
      </Text>

      <div className={s.description}>
        <Text view="p-20" color="secondary">
          Подборка для вечера уже здесь: фильмы, сериалы и новинки.
        </Text>
        <Text view="p-20" color="secondary">
          Найди что посмотреть — за пару секунд.
        </Text>
      </div>
    </div>
  );
};

export default CinemaIntro;

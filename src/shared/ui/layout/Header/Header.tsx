import Link from "next/link";
import s from "./Header.module.scss";
import { routes } from "@/src/shared/config/routes";

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.content}>
        <Link href={routes.cinema.create()}>Логотип</Link>

        <nav className={s.nav}>
          <Link href={routes.cinema.create()}>Фильмы</Link>
          <Link href={routes.cinemaDetails.create("1")}>Один фильм</Link>
        </nav>

        <div className={s.actions}>
          <Link href={routes.favorites.create()}>Избранное</Link>
          <Link href={routes.login.create()}>Логин</Link>
          <Link href={routes.register.create()}>Регистрация</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

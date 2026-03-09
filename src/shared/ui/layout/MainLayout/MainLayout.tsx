import type { PropsWithChildren } from "react";
import Container from "../Container";
import Footer from "../Footer";
import Header from "../Header";
import s from "./MainLayout.module.scss";

export default async function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className={s.wrapper}>
      <Header />
      <main className={s.main}>
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
}

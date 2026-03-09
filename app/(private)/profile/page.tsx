import ProfilePage from "@/_pages/ProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Личный кабинет | CinemaApp",
  description: "Управление вашим профилем и настройками",
};

export default async function Profile() {
  return <ProfilePage />;
}

import { routes } from "@/src/shared/config/routes";
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect(routes.cinema.create());
}

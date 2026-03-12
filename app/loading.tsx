import Loader from "@/shared/ui/Loader";
import Text from "@/shared/ui/Text";
import s from './Loading.module.scss'

export default function Loading() {
  return (
    <div className={s.container}>
      <Loader />
      <Text color="primary" view="p-24">
        Загрузка...
      </Text>
    </div>
  );
}

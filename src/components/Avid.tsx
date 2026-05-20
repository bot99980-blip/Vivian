import { Paragh } from "../components/Paragh";
import { Swip } from "../components/Swip";
import { useFilms } from "../features/hooks/useFilms";

export const Avid = () => {
  const { films, load, e } = useFilms();

  if (load) return <div>Загрузка...</div>;
  if (e) return <div>{e}</div>;

  return (
    <>
      <Paragh title="УЖЕ ДОСТУПНЫЕ" />
      <Swip films={films} />
    </>
  );
};

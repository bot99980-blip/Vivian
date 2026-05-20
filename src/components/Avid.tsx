import { Paragh } from "../components/Paragh";
import { Swip } from "../components/Swip";
import { Load } from "../components/Load";
import { useFilms } from "../features/hooks/useFilms";

export const Avid = () => {
  const { films, load, err } = useFilms();

  if (load)
    return (
      <div>
        <Load />
      </div>
    );
  if (err) return <div>{err}</div>;

  return (
    <>
      <Paragh title="УЖЕ ДОСТУПНЫЕ" />
      <Swip films={films} />
    </>
  );
};

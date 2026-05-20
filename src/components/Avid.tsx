import { Paragh } from "../components/Paragh";
import { Swip } from "../components/Swip";
import { useFilms } from "../features/hooks/useFilms";

export const Avid = () => {
  const { films, loading, error } = useFilms();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Paragh title="УЖЕ ДОСТУПНЫЕ" />
      <Swip films={films} />
    </>
  );
};

import { Header } from "../components/Header";
import { Avid } from "../components/Avid";
import { Point } from "../components/Point";
import "../styles/home.scss";

export const Home = () => {
  return (
    <main>
      <Header />
      <Avid />
      <Point />
    </main>
  );
};

import { Header } from "../components/Header";
import { Avid } from "../components/Avid";
import { Point } from "../components/Point";
import "../styles/home.scss";
import Video from "../assets/2457193876021.mp4";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <main>
      <Header />
      <Avid />
      <Point />
    </main>
  );
};

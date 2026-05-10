import { Header } from "../components/Header";
import { Avid } from "../components/Avid";
import { Point } from "../components/Point";
import "../styles/home.scss";
import Video from "../assets/2457193876021.mp4";

export const Home = () => {
  return (
    <main>
      <video loop autoPlay muted width="100%">
        <source src={Video} type="video/mp4" />
      </video>
      <Header />
      <Avid />
      {/* <Point /> */}
    </main>
  );
};

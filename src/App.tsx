import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import "./styles/index.scss";
import { Article } from "./pages/Article";
import { Recommendations } from "./pages/Recommendations";
import { Individual } from "./pages/Individual";
import { films } from "./data/Films";
import { Footer } from "./components/Footer";
import Video from "./assets/2457193876021.mp4";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <video className="bg" loop autoPlay muted width="100%">
          <source src={Video} type="video/mp4" />
        </video>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/film/:id" element={<Individual films={films} />} />
          <Route path="/article" element={<Article />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import "./styles/index.scss";
import { Article } from "./pages/Article";
import { Recommendations } from "./pages/Recommendations";
import { Individual } from "./pages/Individual";
import { films } from "./data/Films";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/film/:id" element={<Individual films={films} />} />
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Article />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

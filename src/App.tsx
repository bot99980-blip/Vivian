import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Article } from "./pages/Article";
import { Individual } from "./pages/Individual";
import { Recommendations } from "./pages/Recommendations";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import "./styles/index.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/film/:id" element={<Individual />} />
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

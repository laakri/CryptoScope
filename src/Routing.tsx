import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import CoinsList from "./pages/CoinsList";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/CoinsList" element={<CoinsList />} />
      <Route path="/Portfolio" element={<Portfolio />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import HomePage from "./PublicPages/Homepage";
import CoinsList from "./PublicPages/CoinsList";
import Portfolio from "./Portfolio/Portfolio";

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

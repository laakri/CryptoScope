import { Routes, Route } from "react-router-dom";
import HomePage from "./PublicPages/Homepage";
import CoinsList from "./PublicPages/CoinsList";
import Portfolio from "./Portfolio/Portfolio";
import StartingSection from "./Portfolio/StartingSection";
import GeneralIdea from "./Portfolio/GeneralIdea";
import ListPage from "./Portfolio/ListPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/CoinsList" element={<CoinsList />} />
      <Route path="/Portfolio" element={<Portfolio />}>
        <Route path="" element={<StartingSection />} />
        <Route path="Started" element={<StartingSection />} />
        <Route path="GeneralIdea" element={<GeneralIdea />} />
        <Route path="List/:id" element={<ListPage />} />
      </Route>
    </Routes>
  );
}

export default App;

import "./App.css";
import Routing from "./Routing";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

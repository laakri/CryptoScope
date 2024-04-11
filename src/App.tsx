import "./App.css";
import Routing from "./Routing";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import Navbar from "./components/navbar";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div className="flex flex-col ">
          <Navbar />
          <Routing />
        </div>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

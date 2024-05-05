import "./App.css";
import Routing from "./Routing";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/theme-provider";
function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="flex flex-col ">
            <Navbar />
            <Routing />
            <Footer />
          </div>
          <Toaster />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

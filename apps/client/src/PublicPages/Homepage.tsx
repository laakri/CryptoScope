import { BentoGridDemo } from "@/components/bento-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { WavyBackground } from "@/components/ui/wavy-background";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

function HomePage() {
  return (
    <div className="max-w-screen overflow-hidden">
      {/* <WavyBackground>*/}
      <div className="max-w-7xl mx-auto w-full h-[40rem]   flex justify-center items-center p-6 z-10">
        <div className="flex flex-col gap-6 justify-center items-center">
          <h1 className="text-7xl max-w-[46rem] text-center">
            Explore more with Crypto Scope
          </h1>
          <p className="text-gray-300  max-w-[32rem] text-center ">
            Explore more with Crypto Scope more with Crypto Scope Explore more
            with Crypto Scope Explore more with Crypto Scope
          </p>
          <div className="relative w-96 ">
            <Input
              type="text"
              placeholder="Search For Coin by name"
              className="h-10 rounded-2xl"
            />
            <p className="text-sm text-muted-foreground absolute top-2 right-2">
              <Button className="h-6 rounded-lg border bg-muted hover:bg-slate-700 px-2 text-[10px] text-muted-foreground">
                <FaSearch />
              </Button>
            </p>
          </div>
          <h1>Trending</h1>
          <div className="flex flex-wrap space-x-2  ">
            <div className="border-2 border-gray-900 p-2 max-w-max rounded-xl ">
              BTC $69,335.05
            </div>
            <div className="border-2 border-gray-900 p-2 max-w-max rounded-xl ">
              ETH $3,521.91
            </div>
            <div className="border-2 border-gray-900 p-2 max-w-max rounded-xl ">
              Solana $0.05981
            </div>
            <div className="border-2 border-gray-900 p-2 max-w-max rounded-xl ">
              MAGIC $1.05
            </div>
          </div>
        </div>
      </div>
      {/* </WavyBackground> */}
      <BentoGridDemo />
    </div>
  );
}

export default HomePage;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

function HomePage() {
  return (
    <div className="max-w-7xl mx-auto w-full h-[40rem]   flex justify-between items-center p-6 ">
      <div className="flex flex-col gap-6 ">
        <h1 className="text-5xl max-w-[46rem]">
          Explore more with Crypto Scope
        </h1>
        <p className="text-gray-300  max-w-[32rem]">
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
      <div className=" px-16">
        <div className="relative w-full max-w-lg">
          <div className="absolute top-0 -left-4 w-96 h-96  bg-pink-900 rounded-full opacity-30 filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-900 rounded-full opacity-30 filter blur-xl  animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-0 w-96 h-96 bg-pink-900 rounded-full  opacity-30 filter blur-xl  animate-blob animation-delay-4000"></div>
          <div className="absolute -bottom-8 right-0 w-96 h-96 bg-purple-900 rounded-full  opacity-30 filter blur-xl  animate-blob animation-delay-4000"></div>
          <div className="m-8 relative space-y-4"></div>
        </div>
        <div className="max-h-1 max-w-1"></div>
      </div>
    </div>
  );
}

export default HomePage;

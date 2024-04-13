import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const ListTable: React.FC = () => {
  return (
    <div className="mx-8 my-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl">List of Tables</h1>
      <div className=" relative w-96 mt-6">
        <Input
          type="text"
          placeholder="Search For List by name"
          className="h-10 rounded-2xl "
        />
        <p className="text-sm text-muted-foreground absolute top-2 right-2">
          <Button className="h-6 rounded-lg border bg-muted hover:bg-slate-700  px-2 text-[10px]  text-muted-foreground ">
            <FaSearch />
          </Button>
        </p>
      </div>
      <div className=" flex flex-col mt-6 w-full p-4 gap-2 ">
        <div className="flex justify-between items-center w-full py-1 px-2 rounded-md border">
          <p>Solana List Coins</p>
          <Button variant="link" className=" text-md hover:text-yellow-500">
            <FaRegStar />
          </Button>
        </div>
        <div className="flex justify-between items-center w-full py-1 px-2 rounded-md border">
          <p>Solana List Coins</p>
          <Button variant="link" className=" text-md hover:text-yellow-500">
            <FaRegStar />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListTable;

import { Input } from "@/components/ui/input";
import startedimg from "../assets/Lines/arrow.png";
import circleimg from "../assets/Lines/circle-blue.png";
import CoinSearchDialog from "@/components/CoinSearch";
import targetlistimg from "../assets/Lines/image-removebg-preview (1).png";
import { Command } from "cmdk";

const CreateList: React.FC = () => {
  return (
    <div className="mx-8 my-6">
      <h1 className="text-4xl">Create new List</h1>
      <img src={startedimg} alt="chlak-image" className="h-8" />
      <div>
        <Input
          placeholder="Enter list name here..."
          className="h-24 placeholder-gray-400 placeholder:text-3xl text-3xl border-none"
          style={{ boxShadow: "none" }}
        ></Input>
      </div>
      <div className="space-y-6 mt-4">
        <div className="text-2xl flex gap-4 ">
          Add Coin To
          <div className="relative">
            List
            <img
              src={circleimg}
              alt="circle-image"
              className="absolute h-12 min-w-16 left-[-0.8rem] top-[-0.2rem]"
            />
          </div>
        </div>
        <Command className="border rounded-md ">
          <CoinSearchDialog />
        </Command>

        <div className="text-2xl flex gap-4 text-gray-200 ">
          Exemple of Coins List
        </div>
        <img src={targetlistimg} alt="targetlistimg" />
      </div>
    </div>
  );
};

export default CreateList;

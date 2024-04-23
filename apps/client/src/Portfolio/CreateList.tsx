import { Input } from "@/components/ui/input";
import startedimg from "../assets/Lines/arrow.png";
import circleimg from "../assets/Lines/circle-blue.png";
import CoinSearchDialog from "@/components/CoinSearch";
import targetlistimg from "../assets/Lines/image-removebg-preview (1).png";
import { Command } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updateTargetTableName } from "@/services/PortfolioService";
import { useUserStore } from "@/stores/user";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const CreateList: React.FC = () => {
  const { toast } = useToast();

  const { user } = useUserStore();
  const { id } = useParams<{ id: string }>();
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [listName, setListName] = useState("");

  const handleStep2 = async () => {
    if (user && id) {
      if (listName.trim() !== "") {
        try {
          await updateTargetTableName(user?.userId, id, listName);

          setStep1(false);
          setStep2(true);

          toast({
            description: "List name updated successfully",
          });
        } catch (error) {
          console.error("Error updating list name:", error);

          toast({
            variant: "destructive",
            description: "Error updating list name",
          });
        }
      } else {
        toast({
          variant: "destructive",
          description: "List name cannot be empty",
        });
      }
    } else {
      toast({
        variant: "destructive",
        description: "Error updating list name",
      });
    }
  };
  return (
    <div className="mx-8 my-6">
      <div className="relative">
        <div className={`space-y-6 mt-4 ${step1 ? "blur-md" : ""}`}>
          <h1
            className=" placeholder-gray-400 placeholder:text-3xl text-3xl border-none"
            style={{ boxShadow: "none" }}
          >
            {listName ? listName : "Untitled"}
          </h1>
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
            Example of Coins List!
          </div>
          <img src={targetlistimg} alt="targetlistimg" />
        </div>

        {step1 && (
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
              step1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mb-6">
              <Input
                placeholder="Enter list name here..."
                className="h-24 placeholder-gray-400 placeholder:text-3xl text-3xl border-none"
                style={{ boxShadow: "none" }}
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              ></Input>
              <div className="flex flex-col items-center gap-2">
                <Button
                  className="flex items-center gap-2"
                  variant={"outline"}
                  onClick={handleStep2}
                >
                  Next Step
                </Button>
                <img src={startedimg} alt="chlak-image" className="h-4" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateList;

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPlus, FaSearch, FaSave } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ButtonSmooth } from "@/components/ui/button-smooth";
import CoinSearchDialog from "@/components/CoinSearch";
import { CommandDialog } from "@/components/ui/command";
import { useParams } from "react-router-dom";
import { getTargetTableById } from "@/services/PortfolioService";
import horLine from "../assets/Lines/hor-line.png";
import { Checkbox } from "@/components/ui/checkbox";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

interface Coin {
  name: string;
  price: number;
  targets: {
    value: string;
    hit: boolean;
  }[];
}

const ListPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [listName, setListName] = useState<string>("Loading");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [changesMade, setChangesMade] = useState<boolean>(false); // Track if changes have been made
  const [saveDisabled, setSaveDisabled] = useState<boolean>(true); // Disable save button initially

  const toggleDialog = () => {
    setOpen((open) => !open);
  };

  const addColumn = () => {
    setCoins((prevCoins) =>
      prevCoins.map((coin) => ({
        ...coin,
        targets: [...coin.targets, { value: "", hit: false }],
      }))
    );
    setChangesMade(true); // Set changes made flag
    setSaveDisabled(false); // Enable save button
  };

  const handleTargetChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    targetIndex: number
  ) => {
    const { value } = e.target;
    setCoins((prevCoins) =>
      prevCoins.map((coin, index) => {
        if (index === rowIndex) {
          const updatedTargets = [...coin.targets];
          updatedTargets[targetIndex] = { value, hit: false };
          return { ...coin, targets: updatedTargets };
        }
        return coin;
      })
    );
    setChangesMade(true);
    setSaveDisabled(false);
  };

  const toggleHit = (rowIndex: number, targetIndex: number) => {
    setCoins((prevCoins) =>
      prevCoins.map((coin, index) => {
        if (index === rowIndex) {
          const updatedTargets = [...coin.targets];
          updatedTargets[targetIndex].hit = !updatedTargets[targetIndex].hit;
          return { ...coin, targets: updatedTargets };
        }
        return coin;
      })
    );
    setChangesMade(true);
    setSaveDisabled(false);
  };

  const saveChanges = () => {
    // Logic to save changes
    setChangesMade(false); // Reset changes made flag
    setSaveDisabled(true); // Disable save button after saving
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const { targetTableName, coins } = await getTargetTableById(id);
          setCoins(coins);
          setListName(targetTableName);
        }
      } catch (error) {
        console.error("Error fetching target table:", error);
        // Handle error
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="my-6 flex flex-col items-center justify-center">
        <h1 className="text-4xl">{listName}</h1>
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
          {loading ? (
            <div className="flex justify-center items-center w-full h-36 ">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-50"></div>
            </div>
          ) : (
            <>
              {changesMade && (
                <Button
                  onClick={saveChanges}
                  disabled={saveDisabled}
                  variant={"secondary"}
                  className="max-w-fit  gap-2 "
                >
                  <FaSave /> Save
                </Button>
              )}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Coin</TableHead>
                    <TableHead>Price</TableHead>
                    {coins.length > 0 &&
                      coins[0].targets.map((_, index) => (
                        <TableHead key={index}>Target {index + 1}</TableHead>
                      ))}
                    <TableHead>
                      <ButtonSmooth
                        className="text-[11px] "
                        onClick={addColumn}
                      >
                        <FaPlus />
                      </ButtonSmooth>
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {coins.map((coin, rowIndex) => (
                    <TableRow key={coin.name}>
                      <TableCell className="font-medium">{coin.name}</TableCell>
                      <TableCell>
                        {coin.price == 0 ? (
                          <img src={horLine} alt="horLine" className="w-8" />
                        ) : (
                          coin.price
                        )}
                      </TableCell>
                      {coin.targets.map((target, targetIndex) => (
                        <TableCell key={targetIndex}>
                          <div className="flex items-center gap-2 ">
                            <Checkbox
                              checked={target.hit}
                              onChange={() => toggleHit(rowIndex, targetIndex)}
                            />

                            <div className="relative">
                              <Input
                                type="text"
                                value={target.value}
                                onChange={(e) =>
                                  handleTargetChange(e, rowIndex, targetIndex)
                                }
                              />
                              <div className="absolute top-1.5 right-1.5 hover:cursor-pointer hover:color-white   ">
                                <ButtonSmooth className="bg-transparent ">
                                  <IoEllipsisVerticalSharp />
                                </ButtonSmooth>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <ButtonSmooth className="text-[11px] " onClick={toggleDialog}>
                <FaPlus />
              </ButtonSmooth>
            </>
          )}
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CoinSearchDialog />
          </CommandDialog>
        </div>
      </div>
    </>
  );
};

export default ListPage;

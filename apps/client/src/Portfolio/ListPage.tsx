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
import { getTargetTableById, updateCoins } from "@/services/PortfolioService";
import horLine from "../assets/Lines/hor-line.png";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useUserStore } from "@/stores/user";

interface Coin {
  id: string;
  name: string;
  price: number;
  targets: {
    value: string;
    hit: boolean;
  }[];
}
const ListPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUserStore();

  const [coins, setCoins] = useState<Coin[]>([]);
  const [listName, setListName] = useState<string>("Loading");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [changesMade, setChangesMade] = useState<boolean>(false);
  const [saveDisabled, setSaveDisabled] = useState<boolean>(true);
  const [isUserOwner, setisUserOwner] = useState<boolean>(false);
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
    setChangesMade(true);
    setSaveDisabled(false);
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
          const updatedTargets = coin.targets.map((target, i) => {
            if (i === targetIndex) {
              return { ...target, hit: !target.hit };
            }
            return target;
          });
          return { ...coin, targets: updatedTargets };
        }
        return coin;
      })
    );
    setChangesMade(true);
    setSaveDisabled(false);
  };

  const saveChanges = async () => {
    if (user && id) {
      const userId = user.userId;
      console.log("Changes saved:", coins);
      await updateCoins(userId, id, coins);
      setChangesMade(false);
      setSaveDisabled(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let userId = "";
      try {
        setLoading(true);
        if (id) {
          if (user) {
            userId = user.userId;
          }
          const { targetTableName, coins, isUserOwner } =
            await getTargetTableById(id, userId);
          setCoins(coins);
          setListName(targetTableName);
          setisUserOwner(isUserOwner);
          console.log(isUserOwner);
        }
      } catch (error) {
        console.error("Error fetching target table:", error);
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
              <div className="h-12 flex justify-center ">
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
              </div>
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
                          <div className="flex items-center gap-2">
                            {isUserOwner ? (
                              <input
                                className="peer h-4 w-4 accent-white shrink-0 border"
                                type="checkbox"
                                checked={target.hit}
                                onChange={() =>
                                  toggleHit(rowIndex, targetIndex)
                                }
                              />
                            ) : target.hit ? (
                              "-"
                            ) : (
                              ""
                            )}

                            <div className="relative">
                              {isUserOwner ? (
                                <Input
                                  type="text"
                                  value={target.value}
                                  onChange={(e) =>
                                    handleTargetChange(e, rowIndex, targetIndex)
                                  }
                                />
                              ) : (
                                <div>{target.value}</div>
                              )}

                              <div className="absolute top-1.5 right-1.5 hover:cursor-pointer hover:color-white">
                                <ButtonSmooth className="bg-transparent">
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

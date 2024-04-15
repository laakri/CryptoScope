import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPlus, FaSearch } from "react-icons/fa";
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
import React from "react";
import { CommandDialog } from "@/components/ui/command";

interface Coin {
  name: string;
  price: string;
  targets: string[];
}

const initialCoins: Coin[] = [
  {
    name: "INV001",
    price: "$250.00",
    targets: ["$50.00", "$200.00", "$200.00", "$200.00"],
  },
  {
    name: "INV002",
    price: "$150.00",
    targets: ["$100.00", "$200.00", "$300.00", ""],
  },
];

const ListPage: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>(initialCoins);
  const [open, setOpen] = React.useState(false);

  const toggleDialog = () => {
    setOpen((open) => !open);
  };

  const addColumn = () => {
    setCoins((prevCoins) =>
      prevCoins.map((coin) => ({
        ...coin,
        targets: [...coin.targets, ""],
      }))
    );
  };

  const addRow = () => {
    setCoins((prevCoins) => [
      ...prevCoins,
      { name: "", price: "", targets: Array(coins[0].targets.length).fill("") },
    ]);
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
          updatedTargets[targetIndex] = value;
          return { ...coin, targets: updatedTargets };
        }
        return coin;
      })
    );
  };

  return (
    <>
      <div className="my-6 flex flex-col items-center justify-center">
        <h1 className="text-4xl">Solana Coins List</h1>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coin</TableHead>
                <TableHead>Price</TableHead>
                {coins[0].targets.map((_, index) => (
                  <TableHead key={index}>Target {index + 1}</TableHead>
                ))}
                <TableHead>
                  <ButtonSmooth className="text-[11px]" onClick={addColumn}>
                    <FaPlus />
                  </ButtonSmooth>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coins.map((coin, rowIndex) => (
                <TableRow key={coin.name}>
                  <TableCell className="font-medium">{coin.name}</TableCell>
                  <TableCell>{coin.price}</TableCell>
                  {coin.targets.map((target, targetIndex) => (
                    <TableCell key={targetIndex}>
                      <Input
                        type="text"
                        value={target}
                        onChange={(e) =>
                          handleTargetChange(e, rowIndex, targetIndex)
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {/* <TableRow>
                <TableCell colSpan={2}>
                  <ButtonSmooth className="text-[11px]" onClick={toggleDialog}>
                    <FaPlus />
                  </ButtonSmooth>
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
          <ButtonSmooth className="text-[11px] " onClick={toggleDialog}>
            <FaPlus />
          </ButtonSmooth>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CoinSearchDialog />
          </CommandDialog>
        </div>
      </div>
    </>
  );
};

export default ListPage;

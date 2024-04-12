import * as React from "react";
import { RocketIcon } from "@radix-ui/react-icons";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Input } from "./ui/input";
import { TiPlus } from "react-icons/ti";
import { Command } from "cmdk";

const CoinSearchDialog: React.FC = () => {
  // const [open, setOpen] = React.useState(false);

  // React.useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
  //       e.preventDefault();
  //       setOpen((open) => !open);
  //     }
  //   };

  //   document.addEventListener("keydown", down);
  //   return () => document.removeEventListener("keydown", down);
  // }, []);

  // const toggleDialog = () => {
  //   setOpen((open) => !open);
  // };
  return (
    <>
      {/* <div className="relative">
        <Input
          onClick={toggleDialog}
          placeholder="Search..."
          className="h-10 rounded-lg placeholder:text-lg"
        ></Input>
        <p className="text-sm text-muted-foreground absolute top-2.5 right-2">
          <kbd className="pointer-events-none inline-flex ml-2 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>
      </div> */}
      <Command className="border rounded-md ">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem className="">
              <RocketIcon className="mr-2 h-4 w-4" />
              <span>Bitcoin</span>
              <CommandShortcut>
                <TiPlus />
              </CommandShortcut>
            </CommandItem>
            <CommandItem>
              <RocketIcon className="mr-2 h-4 w-4" />
              <span>Ethereum</span>
              <CommandShortcut>
                <TiPlus />
              </CommandShortcut>
            </CommandItem>
            <CommandItem>
              <RocketIcon className="mr-2 h-4 w-4" />
              <span>Solana</span>
              <CommandShortcut>
                <TiPlus />
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Trending Coins">
            <CommandItem>
              <RocketIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>
                <TiPlus />
              </CommandShortcut>
            </CommandItem>
            <CommandItem>
              <RocketIcon className="mr-2 h-4 w-4" />
              <span>Mail</span>
              <CommandShortcut>
                <TiPlus />
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
};
export default CoinSearchDialog;

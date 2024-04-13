import * as React from "react";
import { RocketIcon } from "@radix-ui/react-icons";

import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { TiPlus } from "react-icons/ti";

const CoinSearchDialog: React.FC = () => {
  return (
    <>
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
    </>
  );
};
export default CoinSearchDialog;

import { FaStar } from "react-icons/fa";
import bannerSolana from "../assets/marrketplace/solana.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import whitelogo from "../assets/Lines/X-line.png";
import darklogo from "../assets/Lines/dark-X-line.png";
import { useTheme } from "@/components/ui/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const Marketplace: React.FC = () => {
  const { theme } = useTheme();

  const dummyTableOfContents = [
    {
      id: 1,
      title: "Solana List [private coins]",
      coinsNumber: 10,
      rating: 4.5,
      targetshitsratio: 76,
      creatorName: "John Doe",
      description: "A curated list of private Solana coins.",
      createdAt: "2024-04-30",
      updatedAt: "2024-04-30",
    },
    {
      id: 2,
      title: "Ethereum List [public coins]",
      coinsNumber: 15,
      rating: 4.2,
      targetshitsratio: 12,
      creatorName: "Alice Smith",
      description: "A collection of public Ethereum coins.",
      createdAt: "2024-04-29",
    },
    {
      id: 3,
      title: "Bitcoin List [private coins]",
      coinsNumber: 8,
      rating: 4.7,
      targetshitsratio: 40,
      creatorName: "Bob Johnson",
      description: "Exclusive Bitcoin coins list for private investors.",
      createdAt: "2024-04-28",
    },

    {
      id: 2,
      title: "Ethereum List [public coins]",
      coinsNumber: 15,
      rating: 4.2,
      targetshitsratio: 12,
      creatorName: "Alice Smith",
      description: "A collection of public Ethereum coins.",
      createdAt: "2024-04-29",
    },
    {
      id: 3,
      title: "Bitcoin List [private coins]",
      coinsNumber: 8,
      rating: 4.7,
      targetshitsratio: 40,
      creatorName: "Bob Johnson",
      description: "Exclusive Bitcoin coins list for private investors.",
      createdAt: "2024-04-28",
    },

    {
      id: 1,
      title: "Solana List [private coins]",
      coinsNumber: 10,
      rating: 4.5,
      targetshitsratio: 76,
      creatorName: "John Doe",
      description: "A curated list of private Solana coins.",
      createdAt: "2024-04-30",
      updatedAt: "2024-04-30",
    },

    {
      id: 3,
      title: "Bitcoin List [private coins]",
      coinsNumber: 8,
      rating: 4.7,
      targetshitsratio: 40,
      creatorName: "Bob Johnson",
      description: "Exclusive Bitcoin coins list for private investors.",
      createdAt: "2024-04-28",
    },
    {
      id: 3,
      title: "Bitcoin List [private coins]",
      coinsNumber: 8,
      rating: 4.7,
      targetshitsratio: 40,
      creatorName: "Bob Johnson",
      description: "Exclusive Bitcoin coins list for private investors.",
      createdAt: "2024-04-28",
    },

    {
      id: 2,
      title: "Ethereum List [public coins]",
      coinsNumber: 15,
      rating: 4.2,
      targetshitsratio: 12,
      creatorName: "Alice Smith",
      description: "A collection of public Ethereum coins.",
      createdAt: "2024-04-29",
    },
    {
      id: 3,
      title: "Bitcoin List [private coins]",
      coinsNumber: 8,
      rating: 4.7,
      targetshitsratio: 40,
      creatorName: "Bob Johnson",
      description: "Exclusive Bitcoin coins list for private investors.",
      createdAt: "2024-04-28",
    },

    {
      id: 1,
      title: "Solana List [private coins]",
      coinsNumber: 10,
      rating: 4.5,
      targetshitsratio: 76,
      creatorName: "John Doe",
      description: "A curated list of private Solana coins.",
      createdAt: "2024-04-30",
      updatedAt: "2024-04-30",
    },

    {
      id: 3,
      title: "Bitcoin List [private coins]",
      coinsNumber: 8,
      rating: 4.7,
      targetshitsratio: 40,
      creatorName: "Bob Johnson",
      description: "Exclusive Bitcoin coins list for private investors.",
      createdAt: "2024-04-28",
    },
    {
      id: 3,
      title: "Bitcoin List [private coins]",
      coinsNumber: 8,
      rating: 4.7,
      targetshitsratio: 40,
      creatorName: "Bob Johnson",
      description: "Exclusive Bitcoin coins list for private investors.",
      createdAt: "2024-04-28",
    },

    {
      id: 2,
      title: "Ethereum List [public coins]",
      coinsNumber: 15,
      rating: 4.2,
      targetshitsratio: 12,
      creatorName: "Alice Smith",
      description: "A collection of public Ethereum coins.",
      createdAt: "2024-04-29",
    },
    {
      id: 3,
      title: "Bitcoin List [private coins]",
      coinsNumber: 8,
      rating: 4.7,
      targetshitsratio: 40,
      creatorName: "Bob Johnson",
      description: "Exclusive Bitcoin coins list for private investors.",
      createdAt: "2024-04-28",
    },

    {
      id: 1,
      title: "Solana List [private coins]",
      coinsNumber: 10,
      rating: 4.5,
      targetshitsratio: 76,
      creatorName: "John Doe",
      description: "A curated list of private Solana coins.",
      createdAt: "2024-04-30",
      updatedAt: "2024-04-30",
    },

    {
      id: 3,
      title: "Bitcoin List [private coins]",
      coinsNumber: 8,
      rating: 4.7,
      targetshitsratio: 40,
      creatorName: "Bob Johnson",
      description: "Exclusive Bitcoin coins list for private investors.",
      createdAt: "2024-04-28",
    },
    {
      id: 3,
      title: "Bitcoin List [private coins]",
      coinsNumber: 8,
      rating: 4.7,
      targetshitsratio: 40,
      creatorName: "Bob Johnson",
      description: "Exclusive Bitcoin coins list for private investors.",
      createdAt: "2024-04-28",
    },

    {
      id: 2,
      title: "Ethereum List [public coins]",
      coinsNumber: 15,
      rating: 4.2,
      targetshitsratio: 12,
      creatorName: "Alice Smith",
      description: "A collection of public Ethereum coins.",
      createdAt: "2024-04-29",
    },
    {
      id: 3,
      title: "Bitcoin List [private coins]",
      coinsNumber: 8,
      rating: 4.7,
      targetshitsratio: 40,
      creatorName: "Bob Johnson",
      description: "Exclusive Bitcoin coins list for private investors.",
      createdAt: "2024-04-28",
    },

    {
      id: 1,
      title: "Solana List [private coins]",
      coinsNumber: 10,
      rating: 4.5,
      targetshitsratio: 76,
      creatorName: "John Doe",
      description: "A curated list of private Solana coins.",
      createdAt: "2024-04-30",
      updatedAt: "2024-04-30",
    },

    {
      id: 3,
      title: "Bitcoin List [private coins]",
      coinsNumber: 8,
      rating: 4.7,
      targetshitsratio: 40,
      creatorName: "Bob Johnson",
      description: "Exclusive Bitcoin coins list for private investors.",
      createdAt: "2024-04-28",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="h-28 overflow-hidden relative">
        <img src={bannerSolana} alt="bannerSolana" />
        <div className="absolute inset-0 flex  flex-col gap-2 justify-center  items-center text-center ">
          <div className="text-3xl text-white">Marketplace</div>
          <p className="text-sm text-gray-400">
            Discover and explore a wide range of target tables in our
            marketplace.
            <br /> Find the perfect lists for your needs.
          </p>
        </div>
      </div>
      <div className="max-w-[90rem] m-auto mt-8 flex flex-wrap gap-2 p-2">
        <div className="flex justify-between items-center w-full  gap-3 px-4">
          <div className="text-lg font-bold">Filter</div>
          <Input
            type="text"
            placeholder="Search..."
            className="border  rounded-md px-3 py-1 focus:outline-none  "
          />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Private">Private</SelectItem>
              <SelectItem value="Public">Public</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Private">latest</SelectItem>
              <SelectItem value="Public">oldest</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Checkbox />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Pro
            </label>
          </div>
          <Button variant="secondary">Apply</Button>
        </div>
      </div>

      <div className="max-w-[90rem]  m-auto flex flex-wrap  gap-2  p-2 mt-2">
        {dummyTableOfContents.map((item) => (
          <Card key={item.id} className="w-max max-w-64   ">
            <CardHeader className="-my-2">
              <div className="flex gap-2 text-sm">
                <img
                  src={theme === "light" ? darklogo : whitelogo}
                  alt="white-logo"
                  className="w-5 h-5 rounded-full"
                />
                <span>{item.creatorName}</span>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription className="flex flex-col gap-1">
                <span>{item.createdAt}</span>
                <div className="flex gap-2">
                  <div>Coins ({item.coinsNumber})</div>
                  <div className="flex items-center gap-1 text-yellow-400 text-xs">
                    {item.rating}
                    <div>
                      <FaStar />
                    </div>
                  </div>
                </div>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <div className="h-1 w-full bg-gray-200 rounded-full relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full"
                  style={{
                    width: `${item.targetshitsratio}%`,
                    background:
                      item.targetshitsratio < 33
                        ? "#FF0000"
                        : item.targetshitsratio < 66
                        ? "#FFA500"
                        : "#00FF00",
                  }}
                ></div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;

import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto z-30">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = ({ image }: { image: string }) => (
  <img
    src={image}
    className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
    alt="Skeleton"
  />
);
const items = [
  {
    title: "Crypto Investment Basics",
    description:
      "Learn the fundamentals of cryptocurrency investment and trading.",
    header: (
      <Skeleton image="https://i.gyazo.com/6045d1c7ccde1ae6d488ca03a776aa00.png" />
    ),
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Market Analysis Techniques",
    description:
      "Explore strategies for analyzing market trends and making informed decisions.",
    header: (
      <Skeleton image="https://i.gyazo.com/5545e8294257b7ac243667d100324c4e.png" />
    ),
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Wallet Management",
    description:
      "Discover best practices for managing cryptocurrency wallets securely.",
    header: (
      <Skeleton image="https://i.gyazo.com/b85fc8c481399a8eeae90c7b2002cc5c.png" />
    ),
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Risk Management Strategies",
    description:
      "Learn how to mitigate risks and protect your investments in the volatile crypto market.",
    header: (
      <Skeleton image="https://i.gyazo.com/3d7e7182d6512738c817dea9954770f6.png" />
    ),
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Portfolio Diversification",
    description:
      "Understand the importance of diversifying your crypto portfolio for long-term success.",
    header: (
      <Skeleton image="https://gyazo.com/dc0d57bbce6908b35543b7613843fc6b.png" />
    ),
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Trading Techniques",
    description:
      "Master trading strategies and techniques to optimize your crypto investment returns.",
    header: (
      <Skeleton image="https://i.gyazo.com/5d44f06996623096ac4971a2b7af2ff4.png" />
    ),
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Advanced Crypto Insights",
    description:
      "Explore advanced topics such as DeFi, NFTs, and blockchain technology.",
    header: (
      <Skeleton image="https://i.gyazo.com/b65c5b59914c608fef2f5d91c833943b.png" />
    ),
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
];

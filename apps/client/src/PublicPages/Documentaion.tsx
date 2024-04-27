import React from "react";
import { FaPlus, FaSearch, FaBell } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const Documentation: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to CryptoScope Documentation
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Track Your Favorite Coins
        </h2>
        <p className="text-lg mb-4 text-gray">
          With CryptoScope, you can easily keep track of your favorite
          cryptocurrencies. Add your favorite coins to your watchlist and
          monitor their prices in real-time. Use the search functionality to
          quickly find and add new coins to your list.
        </p>
        <div className="flex items-center gap-4">
          <Input type="text" placeholder="Search for coins" className="w-1/2" />
          <Button variant="secondary">
            <FaSearch />
            <span className="ml-2">Search</span>
          </Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Set Price Targets</h2>
        <p className="text-lg mb-4 text-gray">
          Create price targets for each coin to help you make informed
          decisions. Set your desired price for each coin, and CryptoScope will
          automatically monitor the market and notify you when a target is hit.
          This feature allows you to stay on top of price movements and act
          swiftly.
        </p>
        <div className="flex items-center gap-4">
          <Button variant="secondary">
            <FaBell />
            <span className="ml-2">Enable Notifications</span>
          </Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Customize Your Experience
        </h2>
        <p className="text-lg mb-4 text-gray">
          Personalize your CryptoScope experience to suit your preferences.
          Explore various features such as dark mode, currency selection, and
          layout customization. Adjust settings to enhance your user experience
          and streamline your workflow.
        </p>
        <div className="flex items-center gap-4">
          <Button variant="secondary">
            <FaPlus />
            <span className="ml-2">Add Coin</span>
          </Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h3 className="text-xl font-semibold">
                How do I add a coin to my watchlist?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray mt-2">
                To add a coin to your watchlist, simply search for the coin
                using the search bar, and then click on the "Add" button next to
                the desired coin.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <h3 className="text-xl font-semibold">
                How do I set a price target for a coin?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray mt-2">
                To set a price target for a coin, navigate to your watchlist and
                click on the "Set Target" button next to the desired coin. Enter
                your target price in the input field and click "Save".
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <h3 className="text-xl font-semibold">
                Can I receive notifications for hit price targets?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray mt-2">
                Yes, CryptoScope provides real-time notifications when your
                price targets are hit. You can enable notifications in the
                settings menu.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Stay Informed</h2>
        <p className="text-lg mb-4 text-gray">
          Receive timely notifications when your price targets are reached.
          CryptoScope keeps you updated with the latest market movements,
          ensuring that you never miss an opportunity. Stay informed and make
          informed decisions with CryptoScope.
        </p>
        <div className="flex items-center gap-4">
          <Button variant="secondary">
            <FaBell />
            <span className="ml-2">Enable Notifications</span>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Documentation;

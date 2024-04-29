import { FaCheck } from "react-icons/fa";
import startedimg from "../assets/Lines/squi-dash.png";

const StartingSection: React.FC = () => {
  return (
    <div className="mx-8 my-6 relative  ">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-50 -left-4 w-96 h-96 bg-pink-900 rounded-full opacity-20 filter blur-xl animate-blob"></div>
        <div className="absolute top-72 -right-36 w-96 h-96 bg-yellow-900 rounded-full opacity-20 filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-36 left-56 w-96 h-96 bg-purple-900 rounded-full opacity-20 filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-1  ">
        <h1 className="text-4xl ">Welcome to Crypto Scope</h1>
        <img src={startedimg} alt="chlak-image" className="h-8" />

        <p className="text-gray mt-2 ">
          Crypto Scope is your all-in-one platform for managing your
          cryptocurrency investments, tracking market trends, and setting
          personalized targets. Whether you're a seasoned trader or just getting
          started in the world of crypto, Crypto Scope empowers you to stay on
          top of your investments with ease.
        </p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Getting Started</h2>
          <p className="text-gray mt-2">
            Welcome aboard! Let's get you up and running in no time.
          </p>
          <ol className="list-decimal text-gray mt-4 ml-6">
            <li>
              <p className="font-bold flex items-center gap-1 ">
                <FaCheck className="text-green-400" />

                <del className="text-green-200">Create Your Account: </del>
              </p>
              Sign up for a Crypto Scope account to unlock the full potential of
              our platform.
            </li>

            <li>
              <p className="font-bold">Create Your First List: </p> Once logged
              in, head over to the Lists section to create your first list.
              Lists are customizable collections where you can organize your
              favorite cryptocurrencies and set targets for each.
            </li>
            <li>
              <p className="font-bold"> Add Coins to Your List:</p>
              Search for your preferred cryptocurrencies and add them to your
              lists with just a few clicks. Crypto Scope provides real-time data
              for thousands of coins, ensuring you're always informed.
            </li>
            <li>
              <p className="font-bold"> Set Targets:</p>
              Define your investment goals by setting targets for each coin in
              your list. Whether it's price targets, profit margins, or trade
              volume thresholds, Crypto Scope helps you stay focused on what
              matters most to you.
            </li>
            <li>
              <p className="font-bold"> Track Your Progress:</p>
              Keep track of your investments and monitor market trends
              effortlessly. Crypto Scope provides intuitive charts and analytics
              tools to help you make informed decisions.
            </li>
          </ol>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Advanced Features</h2>
          <p className="text-gray mt-2">
            Take your crypto journey to the next level with these advanced
            features:
          </p>
          <ul className="list-disc text-gray mt-4 ml-6">
            <li>
              Customizable Alerts: Stay informed about price fluctuations and
              market movements with customizable alerts. Set up notifications
              for specific coins or market conditions to never miss a beat.
            </li>
            <li>
              Portfolio Analysis: Dive deep into your portfolio's performance
              with comprehensive analysis tools. Identify trends, track your
              gains and losses, and optimize your investment strategy for
              maximum returns.
            </li>
            <li>
              Social Integration: Connect with fellow crypto enthusiasts, share
              insights, and collaborate on investment strategies. Crypto Scope's
              social features make it easy to stay connected and learn from the
              community.
            </li>
          </ul>
        </div>
        <img src={startedimg} alt="chlak-image" className="h-8" />
      </div>
    </div>
  );
};

export default StartingSection;

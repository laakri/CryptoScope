import startedimg from "../assets/Lines/squi-dash.png";
import darkstartedimg from "../assets/Lines/dark-squi-dash.png";
import { useTheme } from "@/components/ui/theme-provider";

const GeneralIdea: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className="mx-8 my-6 relative ">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-50 -left-4 w-96 h-96 bg-pink-900 rounded-full opacity-20 filter blur-xl animate-blob"></div>
        <div className="absolute top-72 -right-36 w-96 h-96 bg-yellow-900 rounded-full opacity-20 filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-36 left-56 w-96 h-96 bg-purple-900 rounded-full opacity-20 filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-1  ">
        <h1 className="text-4xl">
          Understanding Crypto Targets and Strategies
        </h1>
        <img
          src={theme === "light" ? darkstartedimg : startedimg}
          alt="chlak-image"
          className="h-8"
        />

        <p className="text-gray mt-2 ">
          Cryptocurrency investment involves setting targets, managing stress,
          and navigating through various emotions. Let's dive into some key
          aspects to consider:
        </p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Setting Targets</h2>
          <p className="text-gray mt-2">
            Setting targets in cryptocurrency investments is crucial for
            achieving your financial goals. Whether it's a price target for
            selling or a target for accumulating more assets, having a clear
            strategy helps you stay focused and disciplined.
          </p>
          <ol className="list-decimal text-gray mt-4 ml-6">
            <li>
              <p className="font-bold flex items-center gap-1 ">
                Define Your Goals:
              </p>
              Before setting targets, it's essential to define your investment
              goals. Whether you're looking for short-term gains or long-term
              growth, understanding your objectives will guide your
              target-setting process.
            </li>

            <li>
              <p className="font-bold">Manage Stress and Emotions:</p>
              Cryptocurrency markets can be highly volatile, leading to
              emotional stress for investors. It's essential to develop
              strategies to manage stress and emotions effectively. Techniques
              such as mindfulness, diversification, and setting realistic
              expectations can help mitigate the impact of market fluctuations.
            </li>
            <li>
              <p className="font-bold"> Overcoming Fear and Greed:</p>
              Fear and greed are common emotions that can influence investment
              decisions. Overcoming these emotions requires discipline and
              rational thinking. Strategies such as dollar-cost averaging,
              fundamental analysis, and risk management can help investors make
              informed decisions without succumbing to fear or greed.
            </li>
            <li>
              <p className="font-bold">Exiting When Targets Are Met:</p>
              Knowing when to exit a position is as crucial as setting the
              initial target. When your targets are met, it's essential to stick
              to your plan and execute the exit strategy. Whether it's taking
              profits or cutting losses, discipline is key to successful
              investing.
            </li>
          </ol>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">
            Managing Stress and Fear in Crypto Investments
          </h2>
          <p className="text-gray mt-2">
            Investing in cryptocurrencies can be a rollercoaster ride, filled
            with ups and downs. Here are some tips for managing stress and fear
            in crypto investments:
          </p>
          <ul className="list-disc text-gray mt-4 ml-6">
            <li>
              <p className="font-bold">Stay Informed:</p>
              Stay updated on market news, trends, and developments to make
              informed investment decisions. Knowledge is power in the world of
              crypto.
            </li>
            <li>
              <p className="font-bold">Diversify Your Portfolio:</p>
              Diversification helps spread risk across different assets,
              reducing the impact of volatility on your overall portfolio.
            </li>
            <li>
              <p className="font-bold">Stick to Your Strategy:</p>
              Develop a clear investment strategy and stick to it, even in times
              of uncertainty. Avoid making impulsive decisions based on
              emotions.
            </li>
            <li>
              <p className="font-bold">Practice Patience:</p>
              Rome wasn't built in a day, and neither is a successful investment
              portfolio. Be patient, stay focused on your long-term goals, and
              avoid getting caught up in short-term fluctuations.
            </li>
          </ul>
        </div>
        <img
          src={theme === "light" ? darkstartedimg : startedimg}
          alt="chlak-image"
          className="h-8"
        />
      </div>
    </div>
  );
};

export default GeneralIdea;

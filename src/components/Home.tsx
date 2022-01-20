import { BiSearch } from "react-icons/bi";
import HomeSearch from "./HomeSearch";
import MobileHomeSearch from "./MobileHomeSearch";

import agent from "../assets/images/agent.svg";
import readyImage from "../assets/images/zoopla-ready.jpg";

const Home = () => {
  return (
    <div className="flex flex-col w-full z-50">
      <div className="hidden md:block relative mb-10 h-[550px]">
        <HomeSearch />
      </div>
      <div className="block md:hidden">
        <MobileHomeSearch />
      </div>
      <div className="flex flex-col md:flex-row-reverse mt-6 px-6 md:px-0 dark:text-white text-lg sm:text-2xl">
        <img
          src={readyImage}
          alt="Ready to move on"
          className="md:w-3/5 rounded-md"
        />
        <div className="flex flex-col md:mr-20 py-8 md:py-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            Ready to move on?
          </h2>
          <p className="mb-4">
            Get our latest estimate on your property. You might be surprised
            what you could get for it.
          </p>
          <input
            type="text"
            className="w-full mb-6 p-2 border-2 rounded dark:bg-gray-500"
            placeholder="Enter full postcode, eg. SW1 0RG"
          />
          <button className="inline-flex w-3/4 md:w-1/2 py-3 items-center justify-center rounded-md bg-gray-200 text-gray-400">
            <BiSearch className="mr-2" />
            Look up postcode
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row bg-fuchsia-100 md:w-full mt-10 md:mt-24 mx-4 md:mx-0 px-6 md:px-0 rounded-md md:box-content text-lg sm:text-2xl md:text-lg">
        <img src={agent} alt="agents" className="flex-1 md:mx-8 md:my-16" />
        <div className="flex-1 flex flex-col md:mr-16 pb-6 sm:py-10 md:py-16 text-[#322744]">
          <h2 className="text-3xl sm:text-4xl md:text-3xl font-bold mb-2">
            See what local agents think your home is worth
          </h2>
          <p className="mb-8">
            Arrange for local estate agents to value your home for free. No
            string attached.
          </p>
          <button className="inline-flex md:w-1/2 py-3 items-center justify-center rounded-md bg-fuchsia-100 text-[#322744] border border-[#322744] hover:bg-[#322744] hover:text-white">
            Get a free agent valuation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

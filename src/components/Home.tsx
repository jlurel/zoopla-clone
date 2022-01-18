import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { homeFilterData } from "../utils/filterData";

import readyImage from "../assets/images/zoopla-ready.jpg";
import agent from "../assets/images/agent.svg";

const Home = () => {
  const [isActive1, setIsActive1] = useState<boolean>(true);
  const [isActive2, setIsActive2] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full z-50">
      <div className="relative mb-10 h-[550px]">
        <div
          className={`absolute top-0 -left-4 2xl:-left-16 h-[450px] w-[102%] -z-10 mt-32 rounded-xl bg-center bg-[url('/public/homepage_hero.png')]`}
        ></div>
        <h1 className="text-lg z-50">
          Search properties for sale or to rent in the UK
        </h1>
        <div className="flex justify-start items-center mt-2 relative z-50">
          <button
            className={`rounded-md p-3 ${
              isActive1
                ? `bg-[#322744] text-white`
                : `bg-gray-100 dark:bg-gray-400 text-gray-300`
            }`}
            onClick={() => {
              setIsActive1(true);
              setIsActive2(false);
            }}
          >
            For sale
          </button>
          <button
            className={`rounded-md p-3 ${
              isActive2
                ? `bg-[#322744] text-white`
                : `bg-gray-100 dark:bg-gray-400 text-gray-300`
            }`}
            onClick={() => {
              setIsActive1(false);
              setIsActive2(true);
            }}
          >
            To rent
          </button>
        </div>
        <div className="flex w-4/5 items-center mt-3 rounded-md border border-black dark:border-gray-500 z-50">
          <div className="flex-1 relative rounded-tl-md rounded-bl-md border-r border-slate-200 dark:border-slate-500 z-50">
            <input
              type="text"
              name="area"
              id="area"
              placeholder="eg. Oxford or NW3"
              className={`w-full rounded-tl-md rounded-bl-md  dark:bg-slate-600 hover:bg-gray-100 dark:hover:bg-slate-500 px-4 pt-6 pb-2 box-border`}
              autoComplete="off"
            />
            <p className="absolute top-1 left-2 text-xs z-0">Search area</p>
          </div>
          {homeFilterData.map((filter, index) => (
            <div
              className="flex-1 relative border-r border-slate-200 dark:border-slate-500 z-50"
              key={index}
            >
              <select
                name={filter.queryName}
                id={filter.queryName}
                className="w-full dark:bg-slate-600 hover:bg-gray-100 dark:hover:bg-slate-500 px-4 pt-6 pb-2 box-border z-50 appearance-none"
              >
                {filter.items.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              <p className="absolute top-1 left-2 text-xs z-0">
                {filter.title}
              </p>
            </div>
          ))}
          <div className="relative rounded-tr-md rounded-br-md bg-white dark:bg-slate-600 z-50">
            <button className="mx-4 my-2 px-8 py-2 rounded-md bg-[#8046F1] text-white">
              Search
            </button>
          </div>
        </div>
        <p className="text-4xl font-bold mt-10 text-white">
          We know what a home is really worth
        </p>
      </div>
      <div className="flex flex-col md:flex-row-reverse mt-6 dark:text-white">
        <img
          src={readyImage}
          alt="Ready to move on"
          className="md:w-3/5 rounded-md"
        />
        <div className="flex flex-col mr-20 py-10">
          <h2 className="text-3xl font-bold mb-2">Ready to move on?</h2>
          <p className="mb-4">
            Get our latest estimate on your property. You might be surprised
            what you could get for it.
          </p>
          <input
            type="text"
            className="w-full mb-6 p-2 border-2 rounded dark:bg-gray-500"
            placeholder="Enter full postcode, eg. SW1 0RG"
          />
          <button className="inline-flex w-1/2 py-3 items-center justify-center rounded-md bg-gray-200 text-gray-400">
            <BiSearch className="mr-2" />
            Look up postcode
          </button>
        </div>
      </div>
      <div className="flex bg-fuchsia-100 w-full mt-24 rounded-md box-content">
        <img src={agent} alt="agents" className="flex-1 mx-8 my-16" />
        <div className="flex-1 flex flex-col mr-16 py-16 text-[#322744]">
          <h2 className="text-3xl font-bold mb-2">
            See what local agents think your home is worth
          </h2>
          <p className="text-lg mb-8">
            Arrange for local estate agents to value your home for free. No
            string attached.
          </p>
          <button className="inline-flex w-1/2 py-3 items-center justify-center rounded-md bg-fuchsia-100 text-[#322744] border border-[#322744] hover:bg-[#322744] hover:text-white">
            Get a free agent valuation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

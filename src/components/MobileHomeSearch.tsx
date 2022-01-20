import { useState } from "react";
import { homeFilterData } from "../utils/filterData";

const MobileHomeSearch = () => {
  const [isActive1, setIsActive1] = useState<boolean>(true);
  const [isActive2, setIsActive2] = useState<boolean>(false);
  return (
    <div className="flex flex-col">
      <div
        className={`h-[250px] w-full -z-10 bg-center bg-[url('/public/homepage_hero.png')]`}
      ></div>
      <div className="-mt-6 px-6 py-10 rounded-xl bg-white dark:bg-slate-600 text-lg sm:text-2xl dark:text-white">
        <p className="mb-4 text-3xl sm:text-4xl font-bold">
          We know what a home is really worth
        </p>
        <h1 className="mb-4 z-50">
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
        <div className="flex flex-col mt-3">
          <div className="relative mb-2 rounded-md border border-black dark:border-gray-500">
            <input
              type="text"
              name="area"
              id="area"
              placeholder="eg. Oxford or NW3"
              className={`w-full mt-2 dark:bg-slate-600 hover:bg-gray-100 dark:hover:bg-slate-500 px-4 pt-6 pb-2 box-border`}
              autoComplete="off"
            />
            <p className="absolute top-1 left-2 text-lg">Search area</p>
          </div>
          {homeFilterData.map((filter, index) => (
            <div
              className="relative mb-2 rounded-md border border-black dark:border-gray-500"
              key={index}
            >
              <select
                name={filter.queryName}
                id={filter.queryName}
                className="w-full mt-2 dark:bg-slate-600 hover:bg-gray-100 dark:hover:bg-slate-500 px-4 pt-6 pb-2 box-border z-50 appearance-none"
              >
                {filter.items.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              <p className="absolute top-1 left-2 text-lg">{filter.title}</p>
            </div>
          ))}
          <div className="text-white">
            <button className="w-full my-4 px-8 py-4 rounded-md bg-[#8046F1] hover:bg-[#662DBE] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
              Let's get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHomeSearch;

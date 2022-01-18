import { useState, useEffect, FormEvent } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { BiSearchAlt, BiPound } from "react-icons/bi";
import { FaBed } from "react-icons/fa";
import { GiHouse } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { useDebounce } from "use-debounce";
import { fetchSuggestions } from "../api/fetchApi";
import { filterData } from "../utils/filterData";

type Purpose = "sale" | "rent";

interface Location {
  identifier: string;
  value: string;
}

const icons: { [key: string]: JSX.Element } = {
  property_type: <GiHouse />,
  minimum_price: <BiPound />,
  maximum_price: <BiPound />,
  minimum_beds: <FaBed />,
  maximum_beds: <FaBed />,
};

const Search = ({ purpose }: { purpose: Purpose }) => {
  const [filters] = useState(filterData);
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showLocations, setShowLocations] = useState<boolean>(false);
  const [debouncedValue] = useDebounce(searchTerms, 300);
  const [area, setArea] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<NodeJS.Dict<string>>(
    {}
  );
  const [searchParams, setSearchParams] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedValue) {
      setSearchTerms(debouncedValue);
      const searchLocations = async () => {
        setLoading(true);
        const response = await fetchSuggestions(debouncedValue);
        setLoading(false);

        const { suggestions } = response;
        setLocations(suggestions);
      };
      searchLocations();
    }
  }, [debouncedValue]);

  const searchProperties = (filterValues: NodeJS.Dict<string>) => {
    setSelectedFilters((selectedFilters) => ({
      ...selectedFilters,
      ...filterValues,
    }));

    setSearchParams(selectedFilters);
  };

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    if (area !== "") {
      navigate({
        pathname: `/${purpose}/properties`,
        search: `?${createSearchParams(searchParams)}`,
      });
    }
  };

  console.log(selectedFilters);

  return (
    <div className="bg-slate-200 shadow-sm p-6 dark:bg-slate-700 rounded-md h-fit">
      <h1 className="font-serif font-bold text-2xl dark:text-white mb-5">
        Properties {purpose === "rent" ? "to rent" : "for sale"}
      </h1>
      <p className="text-lg dark:text-white mb-5">
        Search houses and flats {purpose === "rent" ? "to rent " : "for sale "}
        across the UK
      </p>
      <form method="POST">
        <div className="mb-5">
          <label
            htmlFor="area"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Area
          </label>
          <div className="flex flex-col">
            <div className="flex relative">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <BiSearchAlt />
              </span>
              <input
                type="text"
                id="area"
                value={searchTerms}
                className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Oxford"
                autoComplete="off"
                onChange={(e) => {
                  setSearchTerms(e.target.value);
                  setShowLocations(true);
                }}
              />
              {searchTerms && (
                <span className="inline-flex absolute items-center top-0 bottom-0 right-3 dark:text-white">
                  <MdCancel
                    onClick={() => {
                      setSearchTerms("");
                      setArea("");
                    }}
                  />
                </span>
              )}
            </div>
            {showLocations && (
              <div className="overflow-auto h-60 mt-11 ml-10 bg-slate-200 dark:bg-slate-700 rounded-md border-gray-50 border absolute">
                {locations?.map((location, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-600 dark:border-gray-400 hover:dark:bg-slate-400"
                  >
                    <p
                      className="dark:text-white p-2"
                      onClick={() => {
                        setSearchTerms(location.value);
                        setArea(location.value);
                        searchProperties({ area: location.value });
                        setShowLocations(false);
                      }}
                    >
                      {location.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between mb-5">
          <div className="flex-1 mr-3">
            <label
              htmlFor="min-price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Min price
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <BiPound />
              </span>
              <input
                type="text"
                name="min-price"
                id="min-price"
                className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex-1 ml-3">
            <label
              htmlFor="max-price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Max price
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <BiPound />
              </span>
              <input
                type="text"
                name="max-price"
                id="max-price"
                className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-5">
          {filters[purpose].map(({ items, queryName, title }, index) => (
            <div key={index}>
              <label
                htmlFor={queryName}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {title}
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  {icons[queryName]}
                </span>
                <select
                  name="bedrooms"
                  id={queryName}
                  className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    searchProperties({ [queryName]: e.target.value });
                  }}
                >
                  {items.map((option, index) => (
                    <option value={option.value} key={index}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mb-2">
          <button
            className="rounded-3xl bg-orange-500 dark:text-white px-6 py-2"
            onClick={(e) => handleSearch(e)}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;

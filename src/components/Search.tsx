import { useState, useEffect, FormEvent } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { BiSearchAlt, BiPound } from "react-icons/bi";
import { FaBed } from "react-icons/fa";
import { GiHouse, GiOfficeChair } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { useDebounce } from "use-debounce";
import { fetchSuggestions } from "../api/fetchApi";
import { filterData } from "../utils/filterData";

import ErrorAlert from "./ErrorAlert";
import { Purpose, Location } from "../types";

const icons: { [key: string]: JSX.Element } = {
  property_type: <GiHouse />,
  minimum_price: <BiPound />,
  maximum_price: <BiPound />,
  minimum_beds: <FaBed />,
  maximum_beds: <FaBed />,
  furnished: <GiOfficeChair />,
};

const Search = ({ purpose }: { purpose: Purpose }) => {
  const [filters] = useState(filterData);
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [showLocations, setShowLocations] = useState<boolean>(false);
  const [debouncedValue] = useDebounce(searchTerms, 300);
  const [area, setArea] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({ area: "" });
  const [responseStatus, setResponseStatus] = useState<number>(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedValue) {
      setSearchTerms(debouncedValue);
      const searchLocations = async () => {
        await fetchSuggestions(debouncedValue)
          .then((response) => {
            const { data } = response;
            setShowAlert(false);
            const { suggestions } = data;
            setLocations(suggestions);
          })
          .catch((error) => {
            if (error.response) {
              setResponseStatus(error.response.status);
              setErrorMessage(error.response.data.message);
              setShowAlert(true);
            }
          });
      };
      searchLocations();
    }
  }, [debouncedValue]);

  const searchProperties = (filterValues: { [x: string]: string }) => {
    setSelectedFilters((selectedFilters) => ({
      ...selectedFilters,
      ...filterValues,
    }));
  };

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    if (area !== "") {
      navigate({
        pathname: `/${purpose}/properties`,
        search: createSearchParams(selectedFilters).toString(),
      });
    }
  };

  return (
    <div className="flex flex-col 2xl:px-6 items-center">
      <div className="md:w-2/3 h-fit mb-10 bg-slate-200 shadow-sm p-6 dark:bg-slate-700 rounded-md">
        <h1 className="font-serif font-bold text-2xl dark:text-white md:mb-5">
          Properties {purpose === "rent" ? "to rent" : "for sale"}
        </h1>
        <p className="text-lg dark:text-white mb-5">
          Search houses and flats{" "}
          {purpose === "rent" ? "to rent " : "for sale "}
          across the UK
        </p>
        <form method="POST">
          {showAlert && (
            <ErrorAlert
              status={responseStatus}
              message={errorMessage}
              handleClose={() => setShowAlert(false)}
            />
          )}
          <div className="mb-4 md:mb-5">
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
                  value={area}
                  className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Oxford"
                  autoComplete="off"
                  onChange={(e) => {
                    setSearchTerms(e.target.value);
                    searchProperties({ area: e.target.value });
                    setArea(e.target.value);
                    setShowLocations(true);
                  }}
                />
                {searchTerms && (
                  <span className="inline-flex absolute items-center top-0 bottom-0 right-3 dark:text-white">
                    <MdCancel
                      onClick={() => {
                        setSearchTerms("");
                        setArea("");
                        setLocations([]);
                      }}
                    />
                  </span>
                )}
              </div>
              <div
                className={`${
                  showLocations && area
                    ? `overflow-auto h-60 mt-11 ml-10 bg-slate-200 dark:bg-slate-700 rounded-md absolute border border-slate-400 dark:border-slate-500`
                    : `hidden`
                }`}
              >
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
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5 mb-5">
            {filters[purpose].map(({ items, queryName, title }, index) => (
              <div key={index} className="mb-4 md:mb-0">
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
                    className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"
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
              className="rounded-3xl bg-orange-500 disabled:opacity-25 dark:text-white px-6 py-2"
              onClick={(e) => handleSearch(e)}
              disabled={area === ""}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="md:w-2/3">
        <h2 className="text-lg font-bold mb-2">
          Find your next home with Zoopla
        </h2>
        <p>
          A home is a lot more than just a place to live. Yeah, the price,
          location, and size all really matter, but it's also about how a place
          makes you feel. We know what a home is really worth, so let us help
          you find yours. Search over 430,000 properties for sale, from new
          homes to period homes to shared ownership, we've got it all.
        </p>
      </div>
    </div>
  );
};

export default Search;

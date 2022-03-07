import { FormEvent, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { fetchSuggestions } from "../api/fetchApi";
import { Location, Purpose } from "../types";
import { homeFilterData } from "../utils/filterData";

const HomeSearch = () => {
  const [isSaleButtonActive, setSaleButtonActive] = useState<boolean>(true);
  const [isRentButtonActive, setRentButtonActive] = useState<boolean>(false);
  const [purpose, setPurpose] = useState<Purpose>("sale");
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
            isSaleButtonActive
              ? `bg-[#322744] text-white`
              : `bg-gray-100 dark:bg-gray-400 text-gray-300`
          }`}
          onClick={() => {
            if (!isSaleButtonActive) {
              setSaleButtonActive(true);
              setRentButtonActive(false);
              setPurpose("sale");
            }
          }}
        >
          For sale
        </button>
        <button
          className={`rounded-md p-3 ${
            isRentButtonActive
              ? `bg-[#322744] text-white`
              : `bg-gray-100 dark:bg-gray-400 text-gray-300`
          }`}
          onClick={() => {
            if (!isRentButtonActive) {
              setSaleButtonActive(false);
              setRentButtonActive(true);
              setPurpose("rent");
            }
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
            value={area}
            placeholder="eg. Oxford or NW3"
            className={`w-full rounded-tl-md rounded-bl-md  dark:bg-slate-600 hover:bg-gray-100 dark:hover:bg-slate-500 px-4 pt-6 pb-2 box-border`}
            autoComplete="off"
            onChange={(e) => {
              setSearchTerms(e.target.value);
              searchProperties({ area: e.target.value });
              setArea(e.target.value);
              setShowLocations(true);
            }}
          />
          {searchTerms && (
            <span className="inline-flex absolute items-center top-5 bottom-0 right-3 dark:text-white">
              <MdCancel
                onClick={() => {
                  setSearchTerms("");
                  setArea("");
                  setLocations([]);
                }}
              />
            </span>
          )}
          <p className="absolute top-1 left-2 text-xs z-0">Search area</p>
          <div
            className={`${
              showLocations && area
                ? `overflow-auto h-60 bg-slate-200 dark:bg-slate-700 rounded-md absolute border border-slate-400 dark:border-slate-500`
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
        {homeFilterData.map(({ items, title, queryName }, index) => (
          <div
            className="flex-1 relative border-r border-slate-200 dark:border-slate-500 z-50"
            key={index}
          >
            <select
              name={queryName}
              id={queryName}
              className="w-full dark:bg-slate-600 hover:bg-gray-100 dark:hover:bg-slate-500 px-4 pt-6 pb-2 box-border z-50 appearance-none"
              onChange={(e) => {
                searchProperties({ [queryName]: e.target.value });
              }}
            >
              {items.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
            <p className="absolute top-1 left-2 text-xs z-0">{title}</p>
          </div>
        ))}
        <div className="relative rounded-tr-md rounded-br-md bg-white dark:bg-slate-600 z-50">
          <button
            className="mx-4 my-2 px-8 py-2 rounded-md bg-[#8046F1] text-white"
            onClick={(e) => handleSearch(e)}
            disabled={area === ""}
          >
            Search
          </button>
        </div>
      </div>
      <p className="text-4xl font-bold mt-10 text-white">
        We know what a home is really worth
      </p>
    </div>
  );
};

export default HomeSearch;

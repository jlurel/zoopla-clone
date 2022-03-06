import { FormEvent, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { fetchSuggestions } from "../api/fetchApi";
import { homeFilterData } from "../utils/filterData";

type Purpose = "sale" | "rent";

interface Location {
  identifier: string;
  value: string;
}

const MobileHomeSearch = () => {
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
        <div className="flex flex-col mt-3">
          <div className="relative mb-2 rounded-md border border-black dark:border-gray-500">
            <input
              type="text"
              name="area"
              id="area"
              value={area}
              placeholder="eg. Oxford or NW3"
              className={`w-full mt-2 dark:bg-slate-600 hover:bg-gray-100 dark:hover:bg-slate-500 px-4 pt-6 pb-2 box-border`}
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
            <p className="absolute top-1 left-2 text-lg">Search area</p>
            <div
              className={`${
                showLocations && area
                  ? `overflow-auto h-60 w-full bg-slate-200 dark:bg-slate-700 rounded-md absolute border border-slate-400 dark:border-slate-500 z-10`
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
              className="relative mb-2 rounded-md border border-black dark:border-gray-500"
              key={index}
            >
              <select
                name={queryName}
                id={queryName}
                className="w-full mt-2 dark:bg-slate-600 hover:bg-gray-100 dark:hover:bg-slate-500 px-4 pt-6 pb-2 box-border z-50 appearance-none"
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
              <p className="absolute top-1 left-2 text-lg">{title}</p>
            </div>
          ))}
          <div className="text-white">
            <button
              className="w-full my-4 px-8 py-4 rounded-md bg-[#8046F1] hover:bg-[#662DBE] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={(e) => handleSearch(e)}
              disabled={area === ""}
            >
              Let's get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHomeSearch;

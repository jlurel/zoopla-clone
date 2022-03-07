import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  MdOutlineBathtub,
  MdOutlineChair,
  MdOutlineKingBed,
} from "react-icons/md";

import { fetchProperties } from "../api/fetchApi";
import ErrorAlert from "./ErrorAlert";
import PropertyLoader from "./PropertyLoader";
import defaultImage from "../assets/images/no-image.svg";
import { Listing, Purpose } from "../types";

const Properties = ({ purpose }: { purpose: Purpose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [properties, setProperties] = useState<Listing[]>();
  const [searchParams] = useSearchParams();
  const minimum_beds = searchParams.get("minimum_beds") || "1";
  const maximum_beds = searchParams.get("maximum_beds") || "10";
  const property_type =
    searchParams.get("property_type") || "flats,terraced,detached";
  const area = searchParams.get("area");
  const [responseStatus, setResponseStatus] = useState<number>(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const getProperties = async () => {
      setIsLoading(true);
      await fetchProperties(
        area,
        purpose,
        minimum_beds,
        maximum_beds,
        property_type
      )
        .then((response) => {
          const { data, status } = response;
          setResponseStatus(status);
          const { listing } = data;
          setProperties(listing);
          setIsLoading(false);
          console.log(data);
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response) {
            setResponseStatus(error.response.status);
            setErrorMessage(error.response.data.message);
            setShowAlert(true);
          }
        });
    };

    getProperties();
  }, []);

  return (
    <div className="container mx-auto">
      <p className="font-serif font-bold text-2xl mb-5">
        Properties {purpose === "rent" ? `to rent` : `for sale`} in {area}
      </p>
      <div className="flex flex-wrap">
        {isLoading ? (
          <>
            <PropertyLoader />
            <PropertyLoader />
          </>
        ) : showAlert ? (
          <ErrorAlert
            status={responseStatus}
            message={errorMessage}
            handleClose={() => setShowAlert(false)}
          />
        ) : properties && properties.length > 0 ? (
          properties.map((property, index) => (
            <Link
              key={index}
              to={`/property/${property.listing_id}`}
              state={{ property }}
              className="flex flex-col md:flex-row min-w-full w-full my-6 rounded-sm shadow-sm border border-gray-500"
            >
              <div className="relative flex bg-slate-200 justify-center md:w-2/5 h-[310px] bg-cover">
                <img
                  src={property.image_645_430_url || defaultImage}
                  alt="property"
                  width="auto"
                  height="100%"
                  loading="lazy"
                  className="overflow-x-hidden overflow-y-hidden"
                />
                {property.property_badge !== "" && (
                  <div className="absolute top-0 left-0 mt-2 ml-2">
                    <div className="rounded-2xl bg-yellow-500 px-4 py-2">
                      <p className="text-black text-xs font-light uppercase">
                        {property.property_badge}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="flex md:w-3/5 flex-col relative p-4"
                style={{ minWidth: "300px" }}
              >
                <img
                  className="inline-flex absolute top-0 right-0 p-2"
                  src={property.agent_logo}
                  width={73}
                  height={36.5}
                />
                <div id="listing-prices" className="mb-2">
                  {property.rental_prices && (
                    <>
                      <p className="text-xl font-bold">
                        £ {property.rental_prices.per_month} pcm
                      </p>
                      <p className="text-base">
                        £ {property.rental_prices.per_week} pw
                      </p>
                    </>
                  )}
                  {property.price && (
                    <>
                      <p className="text-xl font-bold">
                        {property.price === 0 ? "POA" : `£ ${property.price}`}
                      </p>
                    </>
                  )}
                </div>
                <div id="listing-specs" className="mb-2 flex">
                  <div className="flex items-center mr-3">
                    <MdOutlineKingBed className="mr-1" />{" "}
                    {property.num_bedrooms}
                  </div>
                  <div className="flex items-center mr-3">
                    <MdOutlineBathtub className="mr-1" />{" "}
                    {property.num_bathrooms}
                  </div>
                  <div className="flex items-center mr-3">
                    <MdOutlineChair className="mr-1" /> {property.num_recepts}
                  </div>
                </div>
                <p className="text-lg font-bold">{property.title}</p>
                <p className="text-base">{property.displayable_address}</p>
                <p className="text-sm">
                  Listed on {property.listing_date.substring(0, 10)}
                </p>
                <p className="text-sm">{property.available_from_display}</p>
              </div>
            </Link>
          ))
        ) : (
          <div>
            <p>
              No properties found with your criterias. Go back{" "}
              <Link to={`/`} className="font-bold">
                Home
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;

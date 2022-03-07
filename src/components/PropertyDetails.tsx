import { useLocation } from "react-router-dom";
import {
  MdOutlineBathtub,
  MdOutlineChair,
  MdOutlineKingBed,
  MdStairs,
} from "react-icons/md";
import { BiCalendar } from "react-icons/bi";
import { GiSolarPower } from "react-icons/gi";
import { FaRegFilePdf, FaRegFileVideo } from "react-icons/fa";

import Modal from "./Modal";
import Map from "./Map";
import Carousel from "./Carousel";
import { FurnishedState, PropertyDetailsState } from "../types";

const furnishedState: FurnishedState = {
  unfurnished: "Unfurnished",
  part_furnished: "Part furnished",
  furnished_or_unfurnished: "Furnished or unfurnished",
  furnished: "Furnished",
};

const PropertyDetails = () => {
  const location = useLocation();
  const { property } = location.state as PropertyDetailsState;

  return (
    <>
      <div className="h-full w-full mb-2 md:w-2/3 md:pr-2">
        {property.images && <Carousel slides={property.images} />}
        <div id="listing-header" className="pb-4 border-b dark:border-white">
          <div
            id="listing-summary"
            className="flex justify-between items-start md:items-center mb-4"
          >
            {property.listing_status === "rent" ? (
              <div className="flex flex-col md:flex-row items-start md:items-end">
                <p className="text-2xl md:text-3xl font-bold mr-3">
                  £{property.rental_prices.per_month} pcm
                </p>
                <p className="text-lg mr-6">
                  £{property.rental_prices.per_week} pw
                </p>
              </div>
            ) : (
              <p className="text-3xl font-bold mr-3">
                {property.price === 0 ? "POA" : `£ ${property.price}`}
              </p>
            )}
            {property.property_badge !== "" && (
              <div className="flex rounded bg-blue-500 px-2 py-1">
                <p className="text-white text-xs font-light">
                  {property.property_badge}
                </p>
              </div>
            )}
          </div>
          <div id="listing-description" className="flex-col">
            <p className="text-xl font-medium mb-2">{property.title}</p>
            <div className="flex flex-col md:flex-row text-sm md:text-lg font-light justify-between md:items-center">
              <p className="mb-2 md:mb-0">{property.displayable_address}</p>
              <div id="listing-specs" className="flex justify-between">
                {parseInt(property.num_bedrooms) !== 0 && (
                  <div className="flex items-center mr-3">
                    <MdOutlineKingBed className="mr-1" size={`20px`} />
                    <span>
                      {parseInt(property.num_bedrooms) > 1
                        ? `${parseInt(property.num_bedrooms)} beds`
                        : `${parseInt(property.num_bedrooms)} bed`}
                    </span>
                  </div>
                )}
                {parseInt(property.num_bathrooms) !== 0 && (
                  <div className="flex items-center mr-3">
                    <MdOutlineBathtub className="mr-1" size={`20px`} />
                    <span>
                      {parseInt(property.num_bathrooms) > 1
                        ? `${parseInt(property.num_bathrooms)} baths`
                        : `${parseInt(property.num_bathrooms)} bath`}
                    </span>
                  </div>
                )}
                {parseInt(property.num_recepts) !== 0 && (
                  <div className="flex items-center mr-3">
                    <MdOutlineChair className="mr-1" size={`20px`} />
                    <span>
                      {parseInt(property.num_recepts) > 1
                        ? `${parseInt(property.num_recepts)} receptions`
                        : `${parseInt(property.num_recepts)} reception`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {property.available_from_display && (
          <div className="flex pt-2 pb-4 border-b dark:border-white justify-center items-center">
            <BiCalendar className="mr-4" />
            <p>{property.available_from_display}</p>
          </div>
        )}
        <div id="listing-location" className="py-4 border-b dark:border-white">
          <Map latitude={property.latitude} longitude={property.longitude} />
        </div>
        <div
          id="listing-features"
          className="flex-col py-4 border-b dark:border-white"
        >
          <h1 className="text-2xl font-semibold mb-4">
            Features and description
          </h1>
          <div id="features" className="pl-5 mb-4">
            <ul className="list-disc grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              {property.furnished_state && (
                <li className="px-2">
                  {furnishedState[property.furnished_state]}
                </li>
              )}
              {property.bullet?.length > 0 &&
                property.bullet.map((feature, index) => (
                  <li className="px-2" key={index}>
                    {feature}
                  </li>
                ))}
            </ul>
          </div>
          <div dangerouslySetInnerHTML={{ __html: property.description }} />
        </div>
        {(property.brochure ||
          property.virtual_tour ||
          property.epc_graph ||
          property.epc ||
          property.floor_plan) && (
          <div
            id="more-info"
            className="grid grid-cols-2 gap-4 py-4 border-b dark:border-white"
          >
            <h1 className="col-span-2 text-2xl font-semibold mb-4">
              More information
            </h1>
            {property.brochure && (
              <Modal
                icon={<FaRegFilePdf size={`24px`} className="mr-2" />}
                title="Brochure"
                images={false}
                items={property.brochure}
              />
            )}
            {property.virtual_tour && (
              <Modal
                icon={<FaRegFileVideo size={`24px`} className="mr-2" />}
                title="Virtual tour"
                images={false}
                items={property.virtual_tour}
              />
            )}
            {property.epc_graph && (
              <Modal
                icon={<GiSolarPower size={`24px`} className="mr-2" />}
                title="Energy Performance Certificate"
                images={true}
                items={property.epc_graph}
              />
            )}
            {property.epc && (
              <Modal
                icon={<GiSolarPower size={`24px`} className="mr-2" />}
                title="Energy Performance Certificate"
                images={true}
                items={property.epc}
              />
            )}
            {property.floor_plan && (
              <Modal
                icon={<MdStairs size={`24px`} className="mr-2" />}
                title="Floor plan"
                images={true}
                items={property.floor_plan}
              />
            )}
          </div>
        )}
      </div>
      <div className="md:sticky md:top-5 h-full w-full md:w-1/3 z-0">
        <div className="p-5 items-start flex flex-wrap w-full rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:shadow-gray-900">
          <div className="flex-1 grow shrink w-64 mr-2">
            <p className="text-xl font-bold mb-1">{property.agent_name}</p>
            <p className="text-base mb-6">{property.agent_address}</p>
          </div>
          <img
            src={property.agent_logo}
            alt="agent"
            width={`70px`}
            height={`70px`}
          />
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;

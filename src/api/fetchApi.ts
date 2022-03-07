import axios from "axios";
import { AutoCompleteData, PropertiesData } from "../types";

export const baseUrl = `https://zoopla.p.rapidapi.com/`;

const apiKey: string = process.env.REACT_APP_API_KEY as string;

export const fetchProperties = async (
  area: string | null,
  purpose?: "rent" | "sale",
  minimum_beds?: string | "1",
  maximum_beds?: string | "10",
  property_type?: string | "flats,terraced,detached"
) => {
  const response = await axios.get<PropertiesData>(
    `${baseUrl}/properties/list?area=${area}&listing_status=${purpose}&property_type=${property_type}&minimum_beds=${minimum_beds}&maximum_beds=${maximum_beds}`,
    {
      headers: {
        "x-rapidapi-host": "zoopla.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    }
  );

  return response;
};

export const fetchSuggestions = async (searchTerm: string) => {
  const response = await axios.get<AutoCompleteData>(
    `${baseUrl}/auto-complete?search_term=${searchTerm}`,
    {
      headers: {
        "x-rapidapi-host": "zoopla.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    }
  );

  return response;
};

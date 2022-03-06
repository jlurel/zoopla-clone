import axios from "axios";

export const baseUrl = `https://zoopla.p.rapidapi.com/`;

export interface BoundingBox {
  longitude_min: number;
  latitude_min: number;
  longitude_max: number;
  latitude_max: number;
}

export interface PropertiesData {
  country: string;
  result_count: number;
  longitude: number;
  area_name: string;
  listing: Listing[];
  street: string;
  town: string;
  latitude: number;
  county: string;
  bounding_box: BoundingBox;
  postcode: string;
}

export interface OtherImage {
  url: string;
  description: string;
}

export interface PriceChange {
  direction: string;
  date: string;
  percent: string;
  price: number;
}

export interface Image {
  original: string;
  "480x360": string;
  "354x255": string;
  "645x430": string;
  "80x60": string;
  "768x576": string;
  "150x113": string;
  "1024x768": string;
  caption: string;
  "50x38": string;
  "240x180": string;
}

export interface RentalPrices {
  shared_occupancy: string;
  per_week: number;
  accurate: string;
  per_month: number;
}

export interface Listing {
  rental_prices: RentalPrices;
  num_floors: string;
  image_150_113_url: string;
  listing_status: string;
  num_bedrooms: string;
  image_50_38_url: string;
  latitude: number;
  furnished_state: string;
  agent_address: string;
  category: string;
  property_type: string;
  last_sale_date: string;
  longitude: number;
  listing_date: string;
  description: string;
  agent_postcode: string;
  post_town: string;
  details_url: string;
  other_image: OtherImage[];
  title: string;
  county: string;
  bullet: string[];
  image_80_60_url: string;
  property_number: string;
  num_recepts: string;
  country: string;
  street_name: string;
  num_bathrooms: string;
  agent_logo: string;
  price_change: PriceChange[];
  agent_phone: string;
  group_id: number;
  last_published_date: string;
  last_sale_price: number;
  country_code: string;
  view_count_30day: number;
  location_is_approximate: number;
  view_count: number;
  branch_id: string;
  letting_fees: string;
  images: Image[];
  thumbnail_url: string;
  short_description: string;
  outcode: string;
  image_645_430_url: string;
  price: string | number;
  available_from_display: string;
  is_premium_listing: number;
  listing_id: string;
  image_caption: string;
  status: string;
  agent_name: string;
  property_badge: string;
  company_id: number;
  epc: string[];
  epc_graph: string[];
  displayable_address: string;
  first_published_date: string;
  property_id: number;
  floor_plan: string[];
  incode: string;
  featured_type: string;
  image_354_255_url: string;
  image_url: string;
  original_image: string[];
  brochure: string[];
  virtual_tour: string[];
}

export interface Suggestion {
  identifier: string;
  value: string;
}

export interface AutoCompleteData {
  area_name: string;
  street: string;
  suggestions: Suggestion[];
  county: string;
  town: string;
  postcode: string;
}

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

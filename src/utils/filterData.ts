export type Filter = {
  items: { name: string; value: string }[];
  queryName: string;
  placeholder: string;
  title: string;
};

export const filterData: { [key: string]: Filter[] } = {
  sale: [
    {
      items: [
        { name: "No min", value: "1" },
        { name: "1", value: "1" },
        { name: "2", value: "2" },
        { name: "3", value: "3" },
        { name: "4", value: "4" },
        { name: "5", value: "5" },
        { name: "6", value: "6" },
        { name: "7", value: "7" },
        { name: "8", value: "8" },
        { name: "9", value: "9" },
        { name: "10", value: "10" },
      ],
      queryName: "minimum_beds",
      placeholder: "No min",
      title: "Minimum bedrooms",
    },
    {
      items: [
        { name: "No max", value: "10" },
        { name: "1", value: "1" },
        { name: "2", value: "2" },
        { name: "3", value: "3" },
        { name: "4", value: "4" },
        { name: "5", value: "5" },
        { name: "6", value: "6" },
        { name: "7", value: "7" },
        { name: "8", value: "8" },
        { name: "9", value: "9" },
        { name: "10", value: "10" },
      ],
      queryName: "maximum_beds",
      placeholder: "No max",
      title: "Maximum bedrooms",
    },
    {
      items: [
        { name: "Show all", value: "flats,terraced,detached,farms_land" },
        { name: "Flats", value: "flats" },
        { name: "Houses", value: "terraced,detached" },
        { name: "Farms/Land", value: "farms_land" },
      ],
      queryName: "property_type",
      placeholder: "Show all",
      title: "Property type",
    },
  ],
  rent: [
    {
      items: [
        { name: "No min", value: "1" },
        { name: "1", value: "1" },
        { name: "2", value: "2" },
        { name: "3", value: "3" },
        { name: "4", value: "4" },
        { name: "5", value: "5" },
        { name: "6", value: "6" },
        { name: "7", value: "7" },
        { name: "8", value: "8" },
        { name: "9", value: "9" },
        { name: "10", value: "10" },
      ],
      queryName: "minimum_beds",
      placeholder: "No min",
      title: "Minimum bedrooms",
    },
    {
      items: [
        { name: "No max", value: "10" },
        { name: "1", value: "1" },
        { name: "2", value: "2" },
        { name: "3", value: "3" },
        { name: "4", value: "4" },
        { name: "5", value: "5" },
        { name: "6", value: "6" },
        { name: "7", value: "7" },
        { name: "8", value: "8" },
        { name: "9", value: "9" },
        { name: "10", value: "10" },
      ],
      queryName: "maximum_beds",
      placeholder: "No max",
      title: "Maximum bedrooms",
    },
    {
      items: [
        { name: "Show all", value: "flats,terraced,detached" },
        { name: "Flats", value: "flats" },
        { name: "Houses", value: "terraced,detached" },
      ],
      queryName: "property_type",
      placeholder: "Show all",
      title: "Property type",
    },
    {
      items: [
        { name: "Show all", value: "" },
        { name: "Furnished", value: "furnished" },
        { name: "Part furnished", value: "part_furnished" },
        { name: "Unfurnished", value: "unfurnished" },
      ],
      queryName: "furnished",
      placeholder: "Show all",
      title: "Furnished",
    },
  ],
};

export const homeFilterData: Filter[] = [
  {
    items: [
      { name: "No min", value: "1" },
      { name: "1+", value: "1" },
      { name: "2+", value: "2" },
      { name: "3+", value: "3" },
      { name: "4+", value: "4" },
      { name: "5+", value: "5" },
      { name: "6+", value: "6" },
      { name: "7+", value: "7" },
      { name: "8+", value: "8" },
      { name: "9+", value: "9" },
      { name: "10+", value: "10" },
    ],
    queryName: "minimum_beds",
    placeholder: "No min",
    title: "Bedrooms",
  },
  {
    items: [
      { name: "Show all", value: "flats,terraced,detached" },
      { name: "Flats", value: "flats" },
      { name: "Houses", value: "terraced,detached" },
    ],
    queryName: "property_type",
    placeholder: "Show all",
    title: "Property type",
  },
];

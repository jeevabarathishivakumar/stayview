import React, { useState } from 'react';
import { FiFilter } from "react-icons/fi";
import PrimaryButton from "../common/Button"; // Import your PrimaryButton

/*
SearchFilters component for filtering property listings.
Lets users filter by bedrooms, neighbourhood, price range, and sort order.
Handles both desktop and mobile filter UI.
*/

const SearchFilters = ({
  onFiltersChange,
  resultCount = 0,
  filterOptions = {},
  properties = [],
}) => {
  // State for all filter values
  const [filters, setFilters] = useState({
    bedrooms: '',
    neighbourhood: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'price'
  });

  // State to control mobile filter visibility
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Handle filter value changes
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  // Dynamically generate price options based on API data
  const min = filterOptions.minPrice || 0;
  const max = filterOptions.maxPrice || 0;
  const step = 100000; // Adjust as needed
  const priceOptions = [];
  if (min && max && max > min) {
    for (let price = min; price <= max; price += step) {
      priceOptions.push(price);
    }
    // Ensure max is included if not a multiple of step
    if (priceOptions[priceOptions.length - 1] !== max) {
      priceOptions.push(max);
    }
  }

  return (
    <div className="w-full bg-white py-2 border-gray-300 border-t-2 border-b-2">
      {/* Filter icon and text for mobile */}
      <div className="flex md:hidden justify-end px-4">
        {/* Button to show/hide filters on mobile */}
        <PrimaryButton
          className="!w-auto flex items-center gap-2 !bg-white !text-blue-700 !font-medium   !py-1 !px-2 !rounded-xl !shadow-none border border-blue-700 hover:!bg-blue-50 "
          onClick={() => setShowMobileFilters((v) => !v)}
          aria-label="Show filters"
          type="button"
        >
          <FiFilter className="w-5 h-5" />
          <span className='!text-md'>Filter</span>
        </PrimaryButton>
      </div>
      {/* Filters */}
      <div
        className={`
          ${showMobileFilters ? 'block' : 'hidden'}
          md:flex md:flex-row md:items-center md:justify-between
          flex flex-col gap-4 px-4 md:px-0 mt-2 md:mt-0
        `}
      >
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Bedrooms Filter */}
          <select
            value={filters.bedrooms}
            onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
            className="w-full md:w-[200px] rounded-md py-2 px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 font-semibold"
          >
            <option value="" className='text-gray-500 font-semibold'>All Bedrooms</option>
            {filterOptions.bedrooms?.map((b) => (
              <option key={b} value={b} className='text-gray-500 font-semibold'>
                {b} Bedroom{b > 1 ? 's' : ''}
              </option>
            ))}
          </select>

          {/* Neighbourhood Filter */}
          <select
            value={filters.neighbourhood}
            onChange={(e) => handleFilterChange("neighbourhood", e.target.value)}
            className="w-full md:w-[200px] truncate rounded-md py-2 px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 font-semibold"
          >
            <option value="" className='text-gray-500 font-semibold'>Any Neighbourhood</option>
            {filterOptions?.neighbourhoods?.map((area) => (
              <option key={area} value={area} className='text-gray-500 font-semibold truncate'>{area}</option>
            ))}
          </select>

          {/* Min Price */}
          <select
            value={filters.minPrice}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            className="w-full md:w-[200px] rounded-md py-2 px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 font-semibold"
          >
            <option value="" className='text-gray-500 font-semibold'>Min Price</option>
            {priceOptions.map((price) => (
              <option key={price} value={price} className='text-gray-500 font-semibold'>€{price.toLocaleString()}</option>
            ))}
          </select>

          {/* Max Price */}
          <select
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            className="w-full md:w-[200px] rounded-md py-2 px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 font-semibold"
          >
            <option value="" className='text-gray-500 font-semibold'>Max Price</option>
            {priceOptions.map((price) => (
              <option key={price} value={price} className='text-gray-500 font-semibold'>€{price.toLocaleString()}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="w-full md:w-[200px] rounded-md py-2 px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 font-semibold "
          >
            <option value="price" className='text-gray-500 font-semibold'>Sort by Price</option>
            <option value="newest" className='text-gray-500 font-semibold'>Newest</option>
            <option value="oldest" className='text-gray-500 font-semibold'>Oldest</option>
            <option value="bedrooms" className='text-gray-500 font-semibold'>Bedrooms</option>
            <option value="area" className='text-gray-500 font-semibold'>Area</option>
          </select>
        </div>
        {/* Result count display */}
        <div className="text-sm text-gray-600 font-semibold text-right min-w-[100px] mt-2 md:mt-0">
          {resultCount} Results
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;

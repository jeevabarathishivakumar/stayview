/*
Reusable search filters for property listings.
Lets users filter by bedrooms, neighborhood, and price range.
*/

import { useState } from 'react';

const SearchFilters = () => {
  const [filters, setFilters] = useState({
    bedrooms: '',
    neighborhood: '',
    minPrice: '',
    maxPrice: ''
  });

  const neighborhoods = [
    'Fontvieille', 'Condamine', 'Monte Carlo', 'Larvotto', 
    'La Rousse', 'Jardin Exotique', 'Old Town'
  ];

  const bedroomOptions = [
    { value: '', label: 'All bedrooms' },
    { value: '1', label: '1 bedroom' },
    { value: '2', label: '2 bedrooms' },
    { value: '3', label: '3+ bedrooms' }
  ];

  const priceRanges = [
    { value: '', label: 'Any' },
    { value: '1000000', label: '€1M+' },
    { value: '2000000', label: '€2M+' },
    { value: '5000000', label: '€5M+' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
  };

  return (
    <div className="mb-8 bg-gray-50 p-4 rounded-lg">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Bedrooms Filter */}
        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
            Bedrooms
          </label>
          <select
            id="bedrooms"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {bedroomOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Neighborhood Filter */}
        <div>
          <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
            Neighborhood
          </label>
          <select
            id="neighborhood"
            name="neighborhood"
            value={filters.neighborhood}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Any Neighborhood</option>
            {neighborhoods.map(neighborhood => (
              <option key={neighborhood} value={neighborhood}>
                {neighborhood}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price Filter */}
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <select
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {priceRanges.map(range => (
              <option key={`min-${range.value}`} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Max Price Filter */}
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <select
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {priceRanges.map(range => (
              <option key={`max-${range.value}`} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button - Hidden on mobile, shown on desktop */}
        <div className="md:flex md:items-end md:col-span-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
import React, { useEffect, useRef, useState } from "react";
import PropertyCard from "./PropertyCard";
import SearchFilters from '../common/SearchFilters';

/*
PropertyList component displays a paginated and filterable list of properties.
Includes infinite scroll, filter logic, and loading/error states.
*/

const PAGE_SIZE = 6;

const PropertyList = ({ allProperties, properties, loading, error }) => {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    bedrooms: '',
    neighborhood: '',
    minPrice: '',
    maxPrice: ''
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const loaderRef = useRef(null);

  // Infinite scroll logic: loads more properties when user scrolls to the bottom
  useEffect(() => {
    if (visible >= allProperties.length) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisible((v) => Math.min(v + PAGE_SIZE, allProperties.length));
            setLoadingMore(false);
          }, 500); // simulate network delay
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [visible, loadingMore, allProperties.length]);

  // Apply filters whenever properties or filters change
  useEffect(() => {
    if (properties.length === 0) return;

    const filtered = properties.filter(property => {
      // Bedrooms filter
      if (filters.bedrooms && property.bedrooms !== parseInt(filters.bedrooms)) {
        return false;
      }

      // Neighborhood filter
      if (filters.neighborhood && property.neighborhood !== filters.neighborhood) {
        return false;
      }

      // Min price filter
      if (filters.minPrice && property.price < parseInt(filters.minPrice)) {
        return false;
      }

      // Max price filter
      if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
        return false;
      }

      return true;
    });

    setFilteredProperties(filtered);
  }, [properties, filters]);

  // Handles filter changes from SearchFilters component
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Show loading or error states
  if (loading) return <div className="text-center py-10">Loading properties...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Property for Sales</h1>
      
      {/* Filter bar */}
      <SearchFilters
        onFiltersChange={handleFilterChange}
        resultCount={filteredProperties.length}
        filterOptions={{
          bedrooms: [...new Set(properties.map(p => p.bedroom).filter(Boolean))],
          areas: [...new Set(properties.map(p => p.area).filter(Boolean))]
        }}
      />
      
      {/* Sort and results count */}
      <div className="mb-4 flex justify-between items-center">
        {/* Results count */}
        <div className="text-gray-600">{filteredProperties.length} Results</div>
        {/* Sort dropdown */}
        <select className="p-2 border rounded">
          <option>Sort by</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>
      
      {/* Property cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.slice(0, visible).map(property => (
          // Render each property card
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      {/* Infinite scroll loader */}
      {visible < filteredProperties.length && (
        <div ref={loaderRef} className="flex justify-center py-6">
          <span className="text-blue-600 font-medium animate-pulse">Loading more...</span>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
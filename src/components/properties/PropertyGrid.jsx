import React from 'react';
import PropertyCard from './PropertyCard';
import LoadingSpinner from '../common/LoadingSpinner';


const PropertyGrid = ({ properties, loading, error }) => {
  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Show error message if fetching fails
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-6xl mb-4">😞</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Failed to load properties
        </h3>
        <p className="text-gray-600">
          {error.message || 'Something went wrong. Please try again later.'}
        </p>
      </div>
    );
  }

  // Show message if no properties found
  if (!properties || properties?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🏠</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No properties found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search criteria or check back later.
        </p>
      </div>
    );
  }

  // Render property cards in a grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties?.map((property, index) => (
        // Render each property using PropertyCard
        <PropertyCard 
          key={property.id || index} 
          property={property} 
        />
      ))}
    </div>
  );
};

export default PropertyGrid;
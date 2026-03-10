import { useQuery } from 'react-query';
import { fetchProperties, fetchPropertyById } from '../services/api';

/*
Custom React Query hooks for fetching property data.
- useProperties: fetches a list of properties with optional limit.
- useProperty: fetches a single property by ID.
*/

export const useProperties = (limit = 50) => {
  // Fetches a list of properties with caching and stale time
  return useQuery(
    ['properties', limit],
    () => fetchProperties(limit),
    {
      staleTime: 5 * 60 * 1000,  // Data is fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // Cache stays for 10 minutes
    }
  );
};

export const useProperty = (id) => {
  // Fetches a single property by ID, only if ID is provided
  return useQuery(
    ['property', id],
    () => fetchPropertyById(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );
};
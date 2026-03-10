import React from "react";
import PrimaryButton from "../../components/common/Button";

/*
PropertyDetails component displays the main details of a property.
Shows price, bedrooms, area, title, neighbourhood, and contact options.
*/

const PropertyDetails = ({ currentProperty, formatCurrency }) => (
  <div className="bg-white p-6 mb-0 w-full">
    <div className="flex flex-col gap-2 w-full">
      {/* Share and Like buttons */}
      <div className="flex items-center justify-end gap-2 border-b-2 border-gray-300 pb-4 w-full">
        <a
          href="#"
          className="bg-transparent shadow-none p-0 text-gray-500 hover:text-blue-700 w-auto h-auto transition-colors"
          title="Share"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
        </a>
        <a
          href="#"
          className="bg-transparent shadow-none p-0 text-gray-500 hover:text-red-600 w-auto h-auto transition-colors"
          title="Like"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </a>
      </div>
      {/* Price, bedrooms, and area */}
      <div className="text-2xl font-bold text-gray-900">
        {formatCurrency(currentProperty?.price)}{" "}
        <span className="text-sm font-medium">
          <span className="pe-2">{currentProperty?.bedrooms} bed</span>
          <span className="border-l-2 pl-2 ps-2">
            {currentProperty?.floorarea_min
              ? `${currentProperty?.floorarea_min} sqm`
              : ""}
          </span>
        </span>
      </div>
      {/* Property title */}
      <div className="text-md text-gray-800 font-medium mt-1">
        {currentProperty.title}
      </div>
      {/* Neighbourhood */}
      <div className="text-sm text-gray-600 mt-2">
        {currentProperty.neighbourhood}
      </div>
      {/* Contact prompt */}
      <div className="flex items-center gap-2 mt-2">
        <svg
          className="w-5 h-5 text-yellow-700"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7m-9 2v7a2 2 0 002 2h4a2 2 0 002-2v-7m-6 0h6"
          />
        </svg>
        <span className="text-yellow-700 font-semibold underline cursor-pointer">
          Please contact us
        </span>
      </div>
    </div>
    {/* Contact agent button */}
    <PrimaryButton className="mt-6 !rounded-none">CONTACT AGENT</PrimaryButton>
  </div>
);

export default PropertyDetails;

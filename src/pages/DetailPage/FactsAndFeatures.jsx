import React from "react";
import PrimaryButton from "../../components/common/Button";

/*
FactsAndFeatures component displays key property facts and features.
Shows neighbourhood, price per sqm, and buttons for brochure and floor plan.
*/

const FactsAndFeatures = ({ currentProperty }) => {
  console.log("FactsAndFeatures currentProperty:", currentProperty);
  return (
    <div className="bg-white rounded-lg p-6 pt-2">
      <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
        FACTS & FEATURES
      </h2>
      <table className="w-full">
        <tbody>
          {/* Neighbourhood */}
          <tr className="border-b border-gray-100">
            <td className="text-gray-600 font-semibold text-md py-2 text-left align-middle w-1/2">
              Neighbourhood:
            </td>
            <td className="font-medium text-sm py-2 text-center align-middle w-1/2">
              {currentProperty.neighbourhood}
            </td>
          </tr>
          {/* Price per sqm */}
          <tr className="border-b border-gray-100">
            <td className="text-gray-600 font-semibold text-md py-2 text-left align-middle w-1/2">
              Price per sqm:
            </td>
            <td className="font-medium text-sm py-2 text-center align-middle w-1/2">
              {currentProperty?.pricePerSqm
                ? `€${currentProperty.pricePerSqm?.toLocaleString()}`
                : "N/A"}
            </td>
          </tr>
          {/* Brochure download button */}
          <tr className="border-b border-gray-100">
            <td className="text-gray-600 font-semibold text-md py-2 text-left align-middle w-1/2">
              Brochure:
            </td>
            <td className="py-2 text-left w-1/2">
              <PrimaryButton className="!bg-transparent !font-medium !text-sm !shadow-none !p-0 !text-black hover:!underline w-auto h-auto focus:!outline-none focus:!ring-0">
                <span className="border-b">Download Brochure</span>
              </PrimaryButton>
            </td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="text-gray-600 font-semibold text-md py-2 text-left align-left w-1/2">
              Floor plan:
            </td>
            <td className="py-2 text-left w-1/2">
              <PrimaryButton className="!bg-transparent !font-medium !text-sm !shadow-none !p-0 !text-black hover:!underline w-auto h-auto focus:!outline-none focus:!ring-0">
                <span className="border-b">View Floorplan</span>
              </PrimaryButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FactsAndFeatures;

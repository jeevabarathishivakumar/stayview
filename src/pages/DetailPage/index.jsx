import React, { useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/common/Header";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PrimaryButton from "../../components/common/Button";
import { formatCurrency } from "../../utils/validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import new components
import ImageGalleryModal from "./ImageGalleryModal";
import MainImageSection from "./MainImageSection";
import PropertyDetails from "./PropertyDetails";
import FactsAndFeatures from "./FactsAndFeatures";
import DescriptionSection from "./DescriptionSection";
import AgentAndLocation from "./AgentAndLocation";
import Footer from "../../components/common/Footer";

/*
DetailPage displays all information for a single property.
Handles loading, error, and not-found states.
Shows images, details, features, description, and agent info.
*/

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const mainImageRef = useRef(null);

  const [showGallery, setShowGallery] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  // Get property data from location state or fallback to null
  const property = location.state?.property || null;

  // Normalize property data for display
  const currentProperty = property
    ? {
        ...(property.attributes || property),
        images:
          (
            property.attributes?.images?.map((img) => img.url) ||
            property.images?.map((img) => img.url) ||
            []
          )?.length > 0
            ? property.attributes?.images?.map((img) => img.url) ||
              property.images?.map((img) => img.url)
            : [property.thumbnail || property.attributes?.thumbnail].filter(Boolean),
        bedrooms:
          property.attributes?.bedrooms ??
          property.attributes?.bedroom ??
          property.bedrooms ??
          property.bedroom ??
          0,
        neighbourhood:
          property.attributes?.display_address ||
          property.display_address ||
          property.attributes?.address?.address2 ||
          property.address?.address2 ||
          "",
        agent: {
          name:
            property.attributes?.crm_negotiator_id?.name ||
            property.agent?.name ||
            "",
          title:
            property.attributes?.crm_negotiator_id?.job_title ||
            property.agent?.title ||
            "",
          phone:
            property.attributes?.crm_negotiator_id?.work_phone ||
            property.agent?.phone ||
            "",
          email:
            property.attributes?.crm_negotiator_id?.email ||
            property.agent?.email ||
            "",
          image:
            property.attributes?.crm_negotiator_id?.profile_img ||
            property.agent?.image ||
            "https://ui-avatars.com/api/?name=Agent",
        },
        area: property.attributes?.area || property.area || "",
        pricePerSqm:
          property.attributes?.pricePerSqm ||
          (property.attributes?.price &&
          property.attributes?.area &&
          !isNaN(property.attributes.price) &&
          !isNaN(property.attributes.area)
            ? Math.round(property.attributes.price / property.attributes.area)
            : undefined),
        description:
          property.attributes?.description || property.description || "",
        location:
          property.attributes?.display_address ||
          property.display_address ||
          "",
        price: property.attributes?.price || property.price || 0,
        title: property.attributes?.title || property.title || "",
        floorarea_min: property.attributes?.floorarea_min || property.floorarea_min || "",
      }
    : null;

  const isLoading = !property;
  const error = !property;

  // Show loading spinner if property data is not available
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="STAY View" />
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
        <Footer />
      </div>
    );
  }

  // Show error message if property not found
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="STAY VIEW" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">😞</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Property not found
            </h3>
            <p className="text-gray-600 mb-4">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <PrimaryButton onClick={() => navigate("/")}>
              Back to Search
            </PrimaryButton>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="STAY VIEW" />

      {/* Modal for image gallery */}
      <ImageGalleryModal
        show={showGallery}
        onClose={() => setShowGallery(false)}
        images={currentProperty.images}
        startIndex={galleryStartIndex}
        setStartIndex={setGalleryStartIndex}
      />

      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <PrimaryButton
          onClick={() => navigate("/")}
          className="flex items-center text-blue-700 hover:text-blue-900 mb-6 font-medium !bg-transparent !text-blue-700 !shadow-none !px-0 !py-0"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Search
        </PrimaryButton>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Images */}
          <MainImageSection
            images={currentProperty.images}
            title={currentProperty.title}
            setShowGallery={setShowGallery}
            setGalleryStartIndex={setGalleryStartIndex}
            mainImageRef={mainImageRef}
            toast={toast}
          />

          {/* Right: Details */}
          <div>
            {/* Property details section */}
            <PropertyDetails currentProperty={currentProperty} formatCurrency={formatCurrency} />
            {/* Facts and features section */}
            <FactsAndFeatures currentProperty={currentProperty} />
            {/* Description section */}
            <DescriptionSection description={currentProperty.description} />
            {/* Agent and location section */}
            <AgentAndLocation agent={currentProperty.agent} location={currentProperty.location} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DetailPage;
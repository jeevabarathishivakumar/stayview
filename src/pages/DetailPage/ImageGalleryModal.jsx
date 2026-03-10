import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import PrimaryButton from "../../components/common/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";

/*
ImageGalleryModal component displays a modal with a carousel of property images.
Handles keyboard navigation, custom arrows, and disables background scroll.
*/

const ImageGalleryModal = ({
  show,
  onClose,
  images,
  startIndex,
  setStartIndex,
}) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [show]);

  // Don't render modal if not shown
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-2">
      <div
        className="relative w-full max-w-3xl mx-auto bg-white rounded-xl shadow-2xl animate-fadeIn
        sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl
        p-2 sm:p-4"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Close button */}
        <PrimaryButton
          className="!absolute !top-2 !right-2 !z-10 !bg-white !rounded-full !p-0.5 md:!p-2 !shadow hover:!bg-gray-100 focus:!outline-none focus:!ring-2 focus:!ring-blue-500 w-auto h-auto"
          style={{ width: "auto", height: "auto" }}
          onClick={onClose}
          aria-label="Close gallery"
        >
          <svg
            className="w-7 h-7 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </PrimaryButton>
        {/* Image carousel */}
        <Carousel
          selectedItem={startIndex}
          showThumbs={true}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay={true}
          interval={1000}
          className="property-carousel"
          thumbWidth={100}
          stopOnHover={true}
          // Custom previous arrow
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <PrimaryButton
                type="button"
                onClick={onClickHandler}
                title={label}
                className="!absolute !left-2 !top-1/2 -translate-y-1/2 !z-20 !bg-white !border !border-blue-600 !text-blue-700 hover:!bg-blue-600 hover:!text-white !rounded-full !shadow-lg w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 !h-10 !w-10 flex items-center justify-center transition focus:!outline-none focus:!ring-2 focus:!ring-blue-500 !p-2"
                style={{
                  boxShadow: "0 2px 12px rgba(37,99,235,0.15)",
                  width: "",
                  height: "",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15 19l-7-7 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </PrimaryButton>
            )
          }
          // Custom next arrow
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <PrimaryButton
                type="button"
                onClick={onClickHandler}
                title={label}
                className="!absolute  !right-2 !top-1/2 -translate-y-1/2 !z-20 !bg-white !border !border-blue-600 !text-blue-700 hover:!bg-blue-600 hover:!text-white !rounded-full !shadow-lg w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 !h-10 !w-10 flex items-center justify-center transition focus:!outline-none focus:!ring-2 focus:!ring-blue-500 !p-2"
                style={{
                  boxShadow: "0 2px 12px rgba(37,99,235,0.15)",
                  width: "",
                  height: "",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </PrimaryButton>
            )
          }
        >
          {/* Render each image in the carousel */}
          {images.map((img, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center"
              style={{ minHeight: "50vh" }}
            >
              <img
                src={img}
                alt={`Property ${idx + 1}`}
                className="cover max-h-[60vh] w-full rounded-lg"
                style={{ maxHeight: "60vh" }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ImageGalleryModal;
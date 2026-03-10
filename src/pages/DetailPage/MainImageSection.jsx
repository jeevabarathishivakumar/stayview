import React from "react";
import PrimaryButton from "../../components/common/Button";

/*
MainImageSection component displays the main property image and quick actions.
Includes gallery open button and Picture-in-Picture (PiP) support.
*/

const MainImageSection = ({
  images,
  title,
  setShowGallery,
  setGalleryStartIndex,
  mainImageRef,
  toast,
}) => (
  <div>
    <div className="relative bg-white shadow-md overflow-hidden mb-4">
      {/* Main property image */}
      <img
        src={images[0]}
        alt={title}
        className="main-property-image w-full h-64 sm:h-96 object-cover cursor-pointer"
        ref={mainImageRef}
      />
      <div className="absolute bottom-4 right-4 flex gap-3">
        {/* Gallery Icon */}
        <PrimaryButton
          className="!bg-white !p-2 !rounded-full !shadow hover:!bg-blue-100 !border !border-blue-500 w-auto h-auto"
          onClick={() => {
            setShowGallery(true);
            setGalleryStartIndex(0);
          }}
          aria-label="Open gallery"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
        </PrimaryButton>
        {/* PiP Icon */}
        <PrimaryButton
          className="!bg-white !p-2 !rounded-full !shadow hover:!bg-blue-100 !border !border-blue-500 w-auto h-auto"
          onClick={async () => {
            const img = mainImageRef.current;
            if (
              img &&
              document.pictureInPictureEnabled &&
              img.requestPictureInPicture
            ) {
              try {
                await img.requestPictureInPicture();
              } catch (e) {
                toast?.error("Picture-in-Picture failed or is not supported for this image.");
              }
            } else {
              if (img && img.src) {
                window.open(img.src, "_blank", "noopener,noreferrer");
              } else {
                toast?.error("Picture-in-Picture is not supported in this browser.");
              }
            }
          }}
          aria-label="Picture-in-Picture"
        >
          <svg width="24" height="24" fill="none" stroke="#2563eb" strokeWidth="2">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <rect x="13" y="13" width="6" height="4" rx="1" fill="#2563eb" stroke="#2563eb" />
          </svg>
        </PrimaryButton>
      </div>
    </div>
    {/* Thumbnails for additional images */}
    {images.length > 1 && (
      <div className="grid grid-cols-2 gap-4">
        {images.slice(1, 3).map((img, idx) => (
          <div
            key={idx}
            className="relative bg-white shadow-md overflow-hidden cursor-pointer"
            onClick={() => {
              setShowGallery(true);
              setGalleryStartIndex(idx + 1);
            }}
          >
            <img
              src={img}
              alt={`Property ${idx + 2}`}
              className="h-40 sm:h-48 object-cover w-full"
            />
          </div>
        ))}
      </div>
    )}
  </div>
);

export default MainImageSection;
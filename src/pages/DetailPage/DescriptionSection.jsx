/*
DescriptionSection component displays the full property description.
*/

import React from "react";

const DescriptionSection = ({ description }) => (
  <div className="bg-white  pb-2 p-6 pt-2">
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default DescriptionSection;
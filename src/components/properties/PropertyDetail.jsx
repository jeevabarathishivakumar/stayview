/*
Displays detailed information for a single property.
Shows price, bedrooms, size, agent info, features, and description.
*/

const PropertyDetail = ({ property }) => {
  // Show loading message if property data is not available
  if (!property) return <div className="text-center py-10">Loading property details...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Property price */}
      <h1 className="text-3xl font-bold mb-2">
        {new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR' }).format(property.price)}
      </h1>
      {/* Bedrooms and size */}
      <p className="text-xl mb-6">
        {property.bedrooms} bed | {property.size} sqm
      </p>
      {/* Short description */}
      <p className="mb-8 text-gray-700">
        {property.bedrooms} bedroom apartment for sale in {property.neighborhood}
      </p>
      {/* Contact button */}
      <div className="mb-8">
        <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
          Contact Us
        </button>
      </div>
      {/* Agent and features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          {/* Agent info */}
          <h2 className="text-xl font-bold mb-4">CONTACT AGENT</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p className="font-semibold">{property.agent.name}</p>
            <p>{property.agent.role}</p>
            <p>{property.agent.phone}</p>
            <p>{property.agent.email}</p>
          </div>
        </div>
        <div>
          {/* Property facts and features */}
          <h2 className="text-xl font-bold mb-4">FACTS & FEATURES</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Neighbourhood:</span> {property.neighborhood}</p>
            <p><span className="font-semibold">Price per sqm:</span> 
              {new Intl.NumberFormat('en-EU', { 
                style: 'currency', 
                currency: 'EUR' 
              }).format(property.price / property.size)}
            </p>
            <p className="text-blue-600 cursor-pointer">Download Brochure</p>
            <p className="text-blue-600 cursor-pointer">View Floorplan</p>
          </div>
        </div>
      </div>
      {/* Full description */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Description</h2>
        <p className="text-gray-700">{property.description}</p>
      </div>
    </div>
  );
};

export default PropertyDetail;
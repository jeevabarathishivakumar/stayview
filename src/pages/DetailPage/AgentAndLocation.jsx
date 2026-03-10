/*
AgentAndLocation component displays agent contact info and a map for the property location.
Includes phone and email links, and an embedded Google Map.
*/

import React from "react";

const AgentAndLocation = ({ agent, location }) => (
  <div className="bg-white p-6">
    {/* Agent info section */}
    <div className="flex items-center mb-4">
      <img
        src={agent.image}
        alt={agent.name}
        className="w-18 h-18 object-cover mr-4"
      />
      <div>
        <h4 className="font-semibold text-gray-900">{agent.name}</h4>
        <p className="text-sm text-gray-600">{agent.title}</p>
        <div className="flex items-center mt-2 space-x-4">
          {/* Phone link */}
          <a
            href={`tel:${agent.phone}`}
            className="flex items-center text-gray-600 hover:text-blue-700"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {agent.phone}
          </a>
          {/* Email link */}
          <a
            href={`mailto:${agent.email}`}
            className="flex items-center text-gray-600 hover:text-blue-700 border-l ps-2"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Email
          </a>
        </div>
      </div>
    </div>
    {/* Embedded Google Map for property location */}
    <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mt-4 overflow-hidden">
      <div className="w-full h-full">
        <iframe
          title="Property Location"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: "160px", borderRadius: "0.5rem" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`}
        ></iframe>
      </div>
    </div>
  </div>
);

export default AgentAndLocation;
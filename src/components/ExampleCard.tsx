import React from "react";

const ExampleCard = () => {
  return (
    <div className="bg-surface p-6 rounded-lg border border-custom max-w-md">
      <h3 className="text-primary text-xl font-semibold mb-4">Example Card</h3>
      <p className="text-main mb-4">
        This is the main text using text-main class
      </p>
      <p className="text-secondary mb-4">
        This is secondary text using text-secondary class
      </p>

      {/* Status indicators */}
      <div className="flex gap-2 mb-4">
        <span className="bg-success text-white px-3 py-1 rounded-full text-sm">
          Success
        </span>
        <span className="bg-warning text-black px-3 py-1 rounded-full text-sm">
          Warning
        </span>
        <span className="bg-danger text-white px-3 py-1 rounded-full text-sm">
          Error
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition-all">
          Primary Action
        </button>
        <button className="border border-custom text-secondary px-4 py-2 rounded-md hover:text-main transition-colors">
          Secondary Action
        </button>
      </div>
    </div>
  );
};

export default ExampleCard;

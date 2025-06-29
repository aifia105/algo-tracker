import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-custom rounded-full animate-spin border-t-primary"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse border-t-blue-400 opacity-75"></div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-main mb-2 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Loading...
          </h2>
          <p className="text-secondary text-sm">
            Please wait while we prepare your experience
          </p>
        </div>

        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

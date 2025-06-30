"use client";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useAuthStore } from "@/stores/authStore";
import { PlusIcon } from "@/components/icons/Icons";
import ProblemEntryForm from "@/components/ProblemEntryForm";

const DashboardPage = () => {
  const [toggleProblemEntryForm, setToggleProblemEntryForm] = useState(false);

  const handleProblemEntryFormToggle = () => {
    setToggleProblemEntryForm(true);
  };

  return (
    <>
      {/* Problem Entry Form */}
      {toggleProblemEntryForm && (
        <ProblemEntryForm toggle={setToggleProblemEntryForm} />
      )}
      <div className="p-6">
        {/* Header */}

        <div className="flex justify-end mt-4  mb-10">
          <button
            onClick={handleProblemEntryFormToggle}
            disabled={toggleProblemEntryForm}
            className="bg-primary flex items-center gap-2 justify-center text-white px-4 py-3 rounded-lg text-md font-medium hover:bg-opacity-80 transition-all shadow-lg"
          >
            <PlusIcon className="w-5 h-5" />
            Add Problem
          </button>
        </div>

        <header className="bg-surface p-4 rounded-lg border border-custom mb-6">
          <h1 className="text-primary text-2xl font-bold mb-2">Dashboard</h1>
          <p className="text-secondary">Welcome back to your coding journey</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Success Card */}
          <div className="bg-surface p-6 rounded-lg border border-custom">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-main font-semibold">Problems Solved</h3>
              <span className="text-success text-2xl font-bold">42</span>
            </div>
            <p className="text-secondary text-sm">Keep up the great work!</p>
          </div>

          {/* Warning Card */}
          <div className="bg-surface p-6 rounded-lg border border-custom">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-main font-semibold">Streak Days</h3>
              <span className="text-warning text-2xl font-bold">7</span>
            </div>
            <p className="text-secondary text-sm">Don't break the streak!</p>
          </div>

          {/* Primary Card */}
          <div className="bg-surface p-6 rounded-lg border border-custom">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-main font-semibold">Total Time</h3>
              <span className="text-primary text-2xl font-bold">24h</span>
            </div>
            <p className="text-secondary text-sm">Time well invested</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-surface p-6 rounded-lg border border-custom">
          <h3 className="text-main text-lg font-semibold mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition-all">
              Start Coding
            </button>
            <button className="bg-success text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition-all">
              View Progress
            </button>
            <button className="bg-warning text-black px-4 py-2 rounded-md hover:bg-opacity-80 transition-all">
              Review Mistakes
            </button>
            <button className="border border-custom text-secondary px-4 py-2 rounded-md hover:text-main hover:border-primary transition-all">
              Settings
            </button>
          </div>
        </div>

        {/* Error State Example */}
        <div className="mt-6 bg-surface p-4 rounded-lg border border-custom">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-danger rounded-full"></div>
            <p className="text-danger font-medium">Connection Error</p>
          </div>
          <p className="text-secondary text-sm mt-2 ml-6">
            Unable to sync with LeetCode. Please check your internet connection.
          </p>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

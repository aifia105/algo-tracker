"use client";
import HistoryStats from "@/components/HistoryStats";
import { useProblemStore } from "@/stores/problemStore";
import React from "react";

const Progress = () => {
  const {
    getProblems,
    loading,
    error,
    problems,
    getProblemsTags,
    problemTags,
  } = useProblemStore();
  return (
    <div className="p-6">
      <header className="bg-surface p-6 rounded-lg border border-custom mb-6">
        <h1 className="text-primary text-3xl font-bold mb-2">Progress</h1>
        <p className="text-secondary">
          Keep track of your coding journey and progress
        </p>

        <HistoryStats problems={problems} />
      </header>

      <div className="bg-surface p-4 rounded-lg border border-custom mb-6">
        <p className="text-main">Progress content goes here...</p>
      </div>
    </div>
  );
};

export default Progress;

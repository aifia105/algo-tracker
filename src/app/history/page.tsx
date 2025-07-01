"use client";
import { useProblemStore } from "@/stores/problemStore";
import { Problem } from "@/types";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import HistoryStats from "@/components/HistoryStats";
import FilterProblems from "@/components/FilterProblems";
import Card from "@/components/Card";

const History = () => {
  const { getProblems, loading, error, problems } = useProblemStore();
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");

  useEffect(() => {
    getProblems();
  }, [getProblems]);

  useEffect(() => {
    let filtered = problems;

    if (filterStatus !== "all") {
      filtered = filtered.filter((p) => p.status === filterStatus);
    }

    if (filterDifficulty !== "all") {
      filtered = filtered.filter((p) => p.difficulty === filterDifficulty);
    }

    setFilteredProblems(filtered);
  }, [problems, filterStatus, filterDifficulty]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="bg-surface p-6 rounded-lg border border-custom mb-6">
        <h1 className="text-primary text-3xl font-bold mb-2">
          Problem History
        </h1>
        <p className="text-secondary">
          Track your coding progress and review past solutions
        </p>

        <HistoryStats problems={problems} />
      </header>

      <FilterProblems
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterDifficulty={filterDifficulty}
        setFilterDifficulty={setFilterDifficulty}
        problemsLength={problems.length}
        filteredProblemsLength={filteredProblems.length}
      />

      {error && (
        <div className="bg-surface p-4 rounded-lg border border-custom mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-danger rounded-full"></div>
            <p className="text-danger font-medium">Error Loading History</p>
          </div>
          <p className="text-secondary text-sm mt-2 ml-6">{error}</p>
        </div>
      )}

      {filteredProblems.length === 0 ? (
        <div className="bg-surface p-8 rounded-lg border border-custom text-center">
          <div className="text-6xl text-secondary mb-4">📚</div>
          <h3 className="text-xl font-semibold text-main mb-2">
            No Problems Found
          </h3>
          <p className="text-secondary">
            {problems.length === 0
              ? "Start your coding journey by adding your first problem!"
              : "No problems match your current filters. Try adjusting the filter criteria."}
          </p>
        </div>
      ) : (
        <Card filteredProblems={filteredProblems} />
      )}
    </div>
  );
};

export default History;

"use client";
import { useProblemStore } from "@/stores/problemStore";
import { Problem } from "@/types";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import HistoryStats from "@/components/HistoryStats";
import FilterProblems from "@/components/FilterProblems";
import Card from "@/components/Card";
import Search from "@/components/Search";

const History = () => {
  const {
    getProblems,
    loading,
    error,
    problems,
    getProblemsTags,
    problemTags,
  } = useProblemStore();
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [filterTag, setFilterTag] = useState<string>("all");
  const [filterTimeTaken, setFilterTimeTaken] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    getProblems();
    getProblemsTags();
  }, [getProblems, getProblemsTags]);

  useEffect(() => {
    let filtered = problems;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((p) => {
        const titleMatch = p.problemTitle.toLowerCase().includes(query);

        const tagMatch = p.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );

        const difficultyMatch = p.difficulty.toLowerCase().includes(query);

        const idMatch = p.problemId.toLowerCase().includes(query);

        return titleMatch || tagMatch || difficultyMatch || idMatch;
      });
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((p) => p.status === filterStatus);
    }

    if (filterDifficulty !== "all") {
      filtered = filtered.filter((p) => p.difficulty === filterDifficulty);
    }

    if (filterTag !== "all") {
      filtered = filtered.filter((p) => p.tags.includes(filterTag));
    }

    if (filterTimeTaken !== "all") {
      if (filterTimeTaken === "5+") {
        filtered = filtered.filter((p) => p.timeTaken > 5);
      } else {
        const timeValue = parseInt(filterTimeTaken);
        filtered = filtered.filter((p) => p.timeTaken === timeValue);
      }
    }

    setFilteredProblems(filtered);
  }, [
    problems,
    filterStatus,
    filterDifficulty,
    filterTag,
    filterTimeTaken,
    searchQuery,
  ]);

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
      </header>

      <FilterProblems
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterDifficulty={filterDifficulty}
        setFilterDifficulty={setFilterDifficulty}
        filterTag={filterTag}
        setFilterTag={setFilterTag}
        filterTimeTaken={filterTimeTaken}
        setFilterTimeTaken={setFilterTimeTaken}
        problemsLength={problems.length}
        filteredProblemsLength={filteredProblems.length}
        problemTags={problemTags}
      />

      <Search
        className="mb-6"
        placeholder="Search by title, tags, difficulty or ID..."
        value={searchQuery}
        onChange={setSearchQuery}
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
              : searchQuery
              ? `No problems match your search "${searchQuery}". Try a different search term or adjust your filters.`
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

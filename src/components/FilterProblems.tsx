import { Difficulty, Status } from "@/types";
import React from "react";
import CustomSelect from "./CustomSelect";

type FilterProps = {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterDifficulty: string;
  setFilterDifficulty: (difficulty: string) => void;
  problemsLength: number;
  filteredProblemsLength: number;
};

const FilterProblems = ({
  filterStatus,
  setFilterStatus,
  filterDifficulty,
  setFilterDifficulty,
  problemsLength,
  filteredProblemsLength,
}: FilterProps) => {
  return (
    <div className="bg-surface p-4 rounded-lg border border-custom mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-main font-medium">Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-background border border-custom rounded-lg px-3 py-1 text-main focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All</option>
            <option value={Status.Solved}>Solved</option>
            <option value={Status.Attempted}>Attempted</option>
            <option value={Status.Skipped}>Skipped</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-main font-medium">Difficulty:</label>
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="bg-background border border-custom rounded-lg px-3 py-1 text-main focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All</option>
            <option value={Difficulty.Easy}>Easy</option>
            <option value={Difficulty.Medium}>Medium</option>
            <option value={Difficulty.Hard}>Hard</option>
            <option value={Difficulty.SuperHard}>Super Hard</option>
          </select>
        </div>

        <div className="ml-auto text-secondary">
          {filteredProblemsLength} of {problemsLength} problems
        </div>
      </div>
    </div>
  );
};

export default FilterProblems;

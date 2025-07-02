import { Difficulty, Status } from "@/types";
import React from "react";
import CustomSelect from "./CustomSelect";

type FilterProps = {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterDifficulty: string;
  setFilterDifficulty: (difficulty: string) => void;
  filterTag: string;
  setFilterTag: (tag: string) => void;
  filterTimeTaken: string;
  setFilterTimeTaken: (timeTaken: string) => void;
  problemsLength: number;
  filteredProblemsLength: number;
  problemTags: string[] | undefined;
};

const FilterProblems = ({
  filterStatus,
  setFilterStatus,
  filterDifficulty,
  setFilterDifficulty,
  filterTag,
  setFilterTag,
  filterTimeTaken,
  setFilterTimeTaken,
  problemsLength,
  filteredProblemsLength,
  problemTags,
}: FilterProps) => {
  return (
    <div className="bg-surface p-4 rounded-lg border border-custom mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-main font-medium text-sm">Status:</label>
          <CustomSelect
            options={[
              { value: "all", label: "All" },
              { value: Status.Solved, label: "Solved" },
              { value: Status.Attempted, label: "Attempted" },
              { value: Status.Skipped, label: "Skipped" },
            ]}
            value={filterStatus}
            onChange={setFilterStatus}
            className="min-w-[120px] [&>div:first-child]:py-1.5 [&>div:first-child]:px-2.5 [&>div:first-child]:text-sm [&_div]:py-1.5 [&_div]:px-2.5 [&_div]:text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-main font-medium text-sm">Difficulty:</label>
          <CustomSelect
            options={[
              { value: "all", label: "All" },
              { value: Difficulty.Easy, label: "Easy" },
              { value: Difficulty.Medium, label: "Medium" },
              { value: Difficulty.Hard, label: "Hard" },
              { value: Difficulty.SuperHard, label: "Super Hard" },
            ]}
            value={filterDifficulty}
            onChange={setFilterDifficulty}
            className="min-w-[120px] [&>div:first-child]:py-1.5 [&>div:first-child]:px-2.5 [&>div:first-child]:text-sm [&_div]:py-1.5 [&_div]:px-2.5 [&_div]:text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-main font-medium text-sm">Tag:</label>
          <CustomSelect
            options={[
              { value: "all", label: "All Tags" },
              ...(problemTags?.map((tag) => ({ value: tag, label: tag })) ||
                []),
            ]}
            value={filterTag}
            onChange={setFilterTag}
            className="min-w-[140px] capitalize [&>div:first-child]:py-1.5 [&>div:first-child]:px-2.5 [&>div:first-child]:text-sm [&_div]:py-1.5 [&_div]:px-2.5 [&_div]:text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-main font-medium text-sm">Time Taken:</label>
          <CustomSelect
            options={[
              { value: "all", label: "All Times" },
              { value: "1", label: "1 min" },
              { value: "2", label: "2 min" },
              { value: "3", label: "3 min" },
              { value: "4", label: "4 min" },
              { value: "5", label: "5 min" },
              { value: "5+", label: "Plus 5 min" },
            ]}
            value={filterTimeTaken}
            onChange={setFilterTimeTaken}
            className="min-w-[160px] [&>div:first-child]:py-1.5 [&>div:first-child]:px-2.5 [&>div:first-child]:text-sm [&_div]:py-1.5 [&_div]:px-2.5 [&_div]:text-sm"
          />
        </div>

        <div className="ml-auto text-secondary">
          {filteredProblemsLength} of {problemsLength} problems
        </div>
      </div>
    </div>
  );
};

export default FilterProblems;

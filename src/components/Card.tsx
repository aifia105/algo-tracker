import { Difficulty, Problem, Status } from "@/types";
import React from "react";

type CardProps = {
  filteredProblems: Problem[];
};

const Card = ({ filteredProblems }: CardProps) => {
  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case Difficulty.Easy:
        return "text-success";
      case Difficulty.Medium:
        return "text-warning";
      case Difficulty.Hard:
        return "text-danger";
      case Difficulty.SuperHard:
        return "text-danger";
      default:
        return "text-secondary";
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.Solved:
        return "bg-success";
      case Status.Attempted:
        return "bg-warning";
      case Status.Skipped:
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProblems.map((problem, index) => (
        <div
          key={problem.id || `${problem.problemId}-${problem.userId}-${index}`}
          className="bg-surface p-6 rounded-lg border border-custom hover:border-primary transition-all group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-main font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                {problem.problemTitle}
              </h3>
              <a
                href={problem.problemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm hover:underline"
              >
                #{problem.problemId}
              </a>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                problem.status
              )} text-white`}
            >
              {problem.status}
            </span>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-secondary text-sm">Difficulty:</span>
              <span
                className={`font-medium ${getDifficultyColor(
                  problem.difficulty
                )}`}
              >
                {problem.difficulty}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary text-sm">Language:</span>
              <span className="text-main font-medium">{problem.language}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary text-sm">Time Taken:</span>
              <span className="text-main font-medium">
                {problem.timeTaken}m
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary text-sm">Attempts:</span>
              <span className="text-main font-medium">{problem.attempts}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary text-sm">Date:</span>
              <span className="text-main font-medium">
                {new Date(problem.dateSolved).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="mb-4 flex gap-3">
            {/* <span className="text-secondary text-sm">Tags:</span> */}
            {problem.tags && problem.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {problem.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-background px-2 py-1 rounded-md text-xs text-secondary border border-custom"
                  >
                    {tag}
                  </span>
                ))}
                {problem.tags.length > 3 && (
                  <span className="bg-background px-2 py-1 rounded-md text-xs text-secondary border border-custom">
                    +{problem.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-custom pt-4 flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-secondary text-sm">Cognitive Load:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-full border ${
                      level <= problem.cognitiveLoad
                        ? "bg-primary border-custom"
                        : "bg-transparent border-[#70737c]"
                    }`}
                  />
                ))}
              </div>
            </div>
            <button className="text-secondary text-sm cursor-pointer hover:underline">
              Notes
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;

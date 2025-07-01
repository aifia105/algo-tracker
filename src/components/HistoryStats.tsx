import { Problem, Status } from "@/types";
import React from "react";

type HistoryStatsProps = {
  problems: Problem[];
};

const HistoryStats = ({ problems }: HistoryStatsProps) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div className="text-center">
        <div className="text-2xl font-bold text-success">
          {problems.filter((p) => p.status === Status.Solved).length}
        </div>
        <div className="text-md text-secondary">Solved</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-warning">
          {problems.filter((p) => p.status === Status.Attempted).length}
        </div>
        <div className="text-md text-secondary">Attempted</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-primary">{problems.length}</div>
        <div className="text-md text-secondary">Total</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-main">
          {problems.length > 0
            ? formatTime(
                Math.round(
                  problems.reduce((acc, p) => acc + p.timeTaken, 0) /
                    problems.length
                )
              )
            : "0m"}
        </div>
        <div className="text-md text-secondary">Avg Time</div>
      </div>
    </div>
  );
};

export default HistoryStats;

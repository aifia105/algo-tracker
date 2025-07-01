export type User = {
  id: string;
  username: string;
  email: string;
};
export type Problem = {
  id?: string;
  problemId: string;
  problemTitle: string;
  problemUrl: string;
  userId: string;
  difficulty: Difficulty;
  language: string;
  attempts: number;
  tags: string[];
  status: Status;
  timeTaken: number;
  cognitiveLoad: number;
  dateSolved: string;
  notes?: string;
};

export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
  SuperHard = "Super Hard",
}

export enum Status {
  Solved = "Solved",
  Attempted = "Attempted",
  Skipped = "Skipped",
}

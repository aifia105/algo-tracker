import { Problem } from "@/types";
import { useAuthStore } from "./authStore";
import { create } from "zustand";
import { addProblem, getProblems } from "@/utils/problem";

type problemState = {
  problems: Problem[];
  loading: boolean;
  error: string | null;
  selectedProblem: Problem | null;
  addProblem: (problem: Problem) => Promise<Problem | undefined>;
  getProblems: () => Promise<Problem[] | undefined>;
  setSelectedProblem: (problem: Problem | null) => void;
  clearError: () => void;
};

export const useProblemStore = create<problemState>((set, get) => ({
  problems: [],
  loading: false,
  error: null,
  selectedProblem: null,

  addProblem: async (problem) => {
    const token = useAuthStore.getState().token;

    if (!token) {
      set({ error: "Authentication token not found" });
      return;
    }

    set({ loading: true, error: null });
    try {
      const data = await addProblem(problem, token);

      set((state) => ({
        problems: [...state.problems, data],
        loading: false,
      }));
      return data;
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Error adding problem",
      });
    }
  },

  getProblems: async () => {
    const token = useAuthStore.getState().token;

    if (!token) {
      set({ error: "Authentication token not found" });
      return;
    }

    set({ loading: true, error: null });
    try {
      const data = await getProblems(token);
      set({ problems: data, loading: false });
      return data;
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error ? error.message : "Error fetching problems",
      });
    }
  },

  setSelectedProblem: (problem) => {
    set({ selectedProblem: problem });
  },

  clearError: () => {
    set({ error: null });
  },
}));

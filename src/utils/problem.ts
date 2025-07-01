import { Problem } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addProblem = async (problem: Problem, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/problems/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(problem),
    });

    if (!response.ok) {
      throw new Error("Failed to add problem");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding problem:", error);
    throw error;
  }
};

export const getProblems = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/problems/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch problems");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching problems:", error);
    throw error;
  }
};

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const login = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data;
};
export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  const data = await response.json();
  return data;
};

export const validateToken = async (token: string) => {
  const response = await fetch(`${BASE_URL}/api/auth/validate-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error("Token validation failed");
  }

  const data = await response.json();
  return data;
};

export const forgotPassword = async (email: string) => {
  const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Forgot password request failed");
  }

  const data = await response.json();
  return data;
};

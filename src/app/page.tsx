"use client";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import { useAuthStore } from "@/stores/authStore";

const Home = () => {
  const { isAuthenticated, token } = useAuthStore();

  const token2 =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || sessionStorage.getItem("token")
      : null;

  console.log("isAuthenticated:", isAuthenticated);
  console.log("token:", token);
  console.log("token2:", token2);

  useEffect(() => {
    if (isAuthenticated && token) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/auth/login";
    }
  }, [isAuthenticated, token]);

  return <Loading />;
};

export default Home;

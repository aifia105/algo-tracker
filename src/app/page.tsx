"use client";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import { useAuthStore } from "@/stores/authStore";

const Home = () => {
  const { isAuthenticated, token } = useAuthStore();

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

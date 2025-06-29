"use client";
import { useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import { useAuthStore } from "@/stores/authStore";

const DashboardPage = () => {
  const { isAuthenticated, token } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      window.location.href = "/auth/login";
    }
  }, [isAuthenticated, token]);

  if (!isAuthenticated || !token) {
    return <Loading />;
  }

  return <Dashboard />;
};

export default DashboardPage;

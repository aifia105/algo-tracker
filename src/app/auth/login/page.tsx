"use client";

import VantaBackground from "@/components/VantaBackground";
import { EyeIcon, EyeOffIcon, LoadingSpinner } from "@/components/icons/Icons";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

const LoginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof LoginSchema>;

const Login = () => {
  const { login, loading, error, forgotPassword } = useAuthStore();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = React.useState("");
  const [openForgotPassword, setOpenForgotPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting: formIsSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  React.useEffect(() => {
    reset({
      email: "",
      password: "",
      rememberMe: false,
    });
  }, [reset]);

  const isFormSubmitting = loading || formIsSubmitting;

  const onSaveHandler = async (data: LoginFormData) => {
    try {
      const res = await login(data.email, data.password, data.rememberMe);
      if (res) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const forgotPasswordHandler = async (email: string) => {
    try {
      if (email) {
        await forgotPassword(email);
      }
      router.push("/auth/login");
    } catch (error) {
      console.error("Forgot password request failed:", error);
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenForgotPassword((prev) => !prev);
  };

  return (
    <div className="h-screen bg-background relative overflow-hidden">
      <VantaBackground />
      <div className="absolute flex flex-col items-center justify-center h-full w-full z-[9999]">
        {openForgotPassword ? (
          <div className="bg-surface p-6 rounded-lg border border-custom max-w-md">
            <h3 className="text-primary text-xl font-semibold mb-4">
              Forgot Password
            </h3>
            <p className="text-main mb-4">
              Enter your email to receive a link to reset your password
            </p>
            <form>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={forgotPasswordEmail}
                onChange={(e) => {
                  setForgotPasswordEmail(e.target.value);
                  forgotPasswordHandler(e.target.value);
                }}
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded hover:bg-primary/80 transition-colors"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setOpenForgotPassword(false)}
                className="mt-4 text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <div className="backdrop-blur-sm bg-surface/80 p-8 rounded-2xl border border-custom shadow-2xl w-[480px] transform transition-all duration-300">
            <h1 className="text-4xl font-bold mb-8 text-center text-main bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>

            <form onSubmit={handleSubmit(onSaveHandler)} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-secondary"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  disabled={isFormSubmitting}
                  className={`w-full px-4 py-3 border rounded-xl bg-surface text-main placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-custom"
                  } ${isFormSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  placeholder="Enter your email"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  autoComplete="email"
                  data-form-type="other"
                />
                {errors.email && (
                  <p id="email-error" className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-secondary"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    disabled={isFormSubmitting}
                    className={`w-full px-4 py-3 pr-12 border rounded-xl bg-surface text-main placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-custom"
                    } ${
                      isFormSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    placeholder="Enter your password"
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    autoComplete="password"
                    data-form-type="other"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isFormSubmitting}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-main transition-colors duration-200 ${
                      isFormSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-red-400 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label
                  htmlFor="rememberMe"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    id="rememberMe"
                    type="checkbox"
                    {...register("rememberMe")}
                    disabled={isFormSubmitting}
                    className={`w-4 h-4 bg-surface border-custom rounded focus:ring-primary focus:ring-2 accent-primary ${
                      isFormSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                  <span className="text-secondary">Remember me</span>
                </label>
                <button
                  onClick={handleForgotPasswordSubmit}
                  type="button"
                  className="text-primary hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <button
                disabled={!isValid || isFormSubmitting}
                type="submit"
                className={`w-full font-semibold px-6 py-3 rounded-xl transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  !isValid || isFormSubmitting
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-primary text-white hover:opacity-80 hover:scale-105 hover:shadow-lg"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isFormSubmitting && (
                    <LoadingSpinner className="h-4 w-4 text-current" />
                  )}
                  {isFormSubmitting ? "Logging in..." : "Sign In"}
                </span>
              </button>

              <div className="text-center">
                <span className="text-secondary text-sm">
                  Don't have an account?
                </span>
                <Link
                  href="/auth/register"
                  className="text-primary hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

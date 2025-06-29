"use client";

import VantaBackground from "@/components/VantaBackground";
import { EyeIcon, EyeOffIcon, LoadingSpinner } from "@/components/icons/Icons";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be less than 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeToTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must agree to the Terms of Service and Privacy Policy"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof RegisterSchema>;

const Register = () => {
  const { registerUser, loading, error, clearError } = useAuthStore();
  const router = useRouter();
  const [clientError, setClientError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting: formIsSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  React.useEffect(() => {
    reset({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    });
  }, [reset]);

  const isFormSubmitting = loading || formIsSubmitting;

  const onSaveHandler = async (data: RegisterFormData) => {
    setClientError(null);
    clearError();

    try {
      if (!data.agreeToTerms) {
        setClientError(
          "You must agree to the Terms of Service and Privacy Policy"
        );
        return;
      }
      if (data.password !== data.confirmPassword) {
        setClientError("Passwords do not match");
        return;
      }

      const res = await registerUser(data.username, data.email, data.password);
      if (res) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <div className="h-screen bg-background relative overflow-hidden">
      <VantaBackground />
      <div className="absolute flex flex-col items-center justify-center h-full w-full z-[9999]">
        <div className="backdrop-blur-sm bg-surface/80 p-8 rounded-2xl border border-custom shadow-2xl w-[480px] transform transition-all duration-300">
          <h1 className="text-4xl font-bold mb-8 text-center text-main bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Create Account
          </h1>

          <form onSubmit={handleSubmit(onSaveHandler)} className="space-y-6">
            {(error || clientError) && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm">
                {clientError || error}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-secondary"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                {...register("username")}
                disabled={isFormSubmitting}
                className={`w-full px-4 py-3 border rounded-xl bg-surface text-main placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                  errors.username
                    ? "border-red-500 focus:ring-red-500"
                    : "border-custom"
                } ${isFormSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                placeholder="Enter your username"
                aria-invalid={errors.username ? "true" : "false"}
                aria-describedby={
                  errors.username ? "username-error" : undefined
                }
                autoComplete="username"
                data-form-type="other"
              />
              {errors.username && (
                <p id="username-error" className="text-red-400 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

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
                  } ${isFormSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  placeholder="Enter your password"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  autoComplete="new-password"
                  data-form-type="other"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isFormSubmitting}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-main transition-colors duration-200 ${
                    isFormSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
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

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-secondary"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  disabled={isFormSubmitting}
                  className={`w-full px-4 py-3 pr-12 border rounded-xl bg-surface text-main placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-custom"
                  } ${isFormSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  placeholder="Confirm your password"
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  aria-describedby={
                    errors.confirmPassword ? "confirmPassword-error" : undefined
                  }
                  autoComplete="new-password"
                  data-form-type="other"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isFormSubmitting}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-main transition-colors duration-200 ${
                    isFormSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-start text-sm">
              <label
                htmlFor="agreeToTerms"
                className="flex items-start space-x-2 cursor-pointer"
              >
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  {...register("agreeToTerms")}
                  disabled={isFormSubmitting}
                  className={`w-4 h-4 mt-0.5 bg-surface border-custom rounded focus:ring-primary focus:ring-2 accent-primary ${
                    isFormSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  } ${errors.agreeToTerms ? "border-red-500" : ""}`}
                  aria-invalid={errors.agreeToTerms ? "true" : "false"}
                  aria-describedby={
                    errors.agreeToTerms ? "agreeToTerms-error" : undefined
                  }
                />
                <span className="text-secondary">
                  I agree to the
                  <button
                    type="button"
                    className="text-primary hover:text-blue-400 transition-colors duration-200"
                  >
                    Terms of Service
                  </button>
                  and
                  <button
                    type="button"
                    className="text-primary hover:text-blue-400 transition-colors duration-200"
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p id="agreeToTerms-error" className="text-red-400 text-sm -mt-4">
                {errors.agreeToTerms.message}
              </p>
            )}

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
                {isFormSubmitting ? "Creating Account..." : "Create Account"}
              </span>
            </button>

            <div className="text-center">
              <span className="text-secondary text-sm">
                Already have an account?
              </span>
              <Link
                href="/auth/login"
                className="text-primary hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

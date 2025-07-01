import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomSelect from "./CustomSelect";
import { useAuthStore } from "@/stores/authStore";
import { useProblemStore } from "@/stores/problemStore";
import { Difficulty, Status } from "@/types";
import { CancelIcon, ErrorIcon } from "./icons/Icons";

type ProblemEntryFormProps = { toggle?: (value: boolean) => void };

const ProblemEntrySchema = z.object({
  problemId: z.string().min(1, "Problem ID is required"),
  problemTitle: z.string().min(1, "Problem title is required"),
  problemUrl: z.string().min(1, "Problem URL is required"),
  difficulty: z.nativeEnum(Difficulty),
  language: z.string().min(1, "Language is required"),
  timeTaken: z.number().min(1, "Time taken must be greater than 0"),
  status: z.nativeEnum(Status),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  dateSolved: z.date().min(new Date("2000-01-01"), "Date must be valid"),
  cognitiveLoad: z.number().min(1, "Cognitive load must be between 1-5").max(5),
  attempts: z.number().min(1, "Attempts must be at least 1"),
  notes: z.string().optional(),
});

type ProblemEntry = z.infer<typeof ProblemEntrySchema>;

const ProblemEntryForm = ({ toggle }: ProblemEntryFormProps) => {
  const [tagsInput, setTagsInput] = React.useState("");
  const { user } = useAuthStore();
  const { addProblem, loading, error, clearError } = useProblemStore();
  const [authError, setAuthError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting: formIsSubmitting },
  } = useForm<ProblemEntry>({
    defaultValues: {
      problemId: "",
      problemTitle: "",
      problemUrl: "",
      difficulty: Difficulty.Easy,
      language: "",
      timeTaken: 1,
      status: Status.Attempted,
      tags: [],
      dateSolved: new Date(),
      cognitiveLoad: 1,
      attempts: 1,
      notes: "",
    },
    resolver: zodResolver(ProblemEntrySchema),
    mode: "onChange",
  });

  const difficultyValue = watch("difficulty");
  const statusValue = watch("status");

  const difficultyOptions = [
    { value: Difficulty.Easy, label: "Easy" },
    { value: Difficulty.Medium, label: "Medium" },
    { value: Difficulty.Hard, label: "Hard" },
    { value: Difficulty.SuperHard, label: "Super Hard" },
  ];

  const statusOptions = [
    { value: Status.Solved, label: "Solved" },
    { value: Status.Attempted, label: "Attempted" },
    { value: Status.Skipped, label: "Skipped" },
  ];

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagsInput(value);
    const tagsArray = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setValue("tags", tagsArray, { shouldValidate: true });

    if (error) {
      clearError();
    }
    if (authError) {
      setAuthError(null);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && toggle) {
      toggle(false);
    }
  };

  const onSaveHandler = async (data: ProblemEntry) => {
    try {
      if (!user) {
        setAuthError("User not authenticated");
        window.location.href = "/auth/login";
        return;
      }

      clearError();
      setAuthError(null);

      const problemData = {
        ...data,
        tags: data.tags.map((tag) => tag.trim()),
        dateSolved: data.dateSolved.toISOString(),
        userId: user.id,
      };

      const result = await addProblem(problemData);

      if (result) {
        reset();
        setTagsInput("");
        if (toggle) toggle(false);
      }
    } catch (error) {
      console.error("Failed to save problem entry:", error);
    }
  };

  const handleInputFocus = () => {
    if (error) {
      clearError();
    }
    if (authError) {
      setAuthError(null);
    }
  };

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="backdrop-blur-sm bg-surface/80 p-8 rounded-2xl border border-custom shadow-2xl w-[600px] max-h-[90vh] overflow-y-auto transform transition-all duration-300 scrollbar-hide">
        <h2 className="text-3xl font-bold mb-8 text-center text-main bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          Add New Problem
        </h2>

        {/* Loading Indicator */}
        {(loading || formIsSubmitting) && (
          <div className="flex items-center justify-center mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-secondary">
              {formIsSubmitting ? "Submitting..." : "Processing..."}
            </span>
          </div>
        )}

        {(error || authError) && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ErrorIcon />
              </div>
              <div className="ml-3">
                <p className="text-red-400 font-medium">
                  {authError
                    ? "Authentication Error"
                    : "Error submitting problem"}
                </p>
                <p className="text-red-300 text-sm mt-1">
                  {authError || error}
                </p>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    clearError();
                    setAuthError(null);
                  }}
                  className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                >
                  <CancelIcon />
                </button>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSaveHandler)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="problemId"
                className="block text-sm font-medium text-secondary"
              >
                Problem ID
              </label>
              <input
                id="problemId"
                type="text"
                {...register("problemId")}
                disabled={formIsSubmitting || loading}
                onFocus={handleInputFocus}
                className={`w-full px-4 py-3 border rounded-xl bg-surface text-main placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                  errors.problemId
                    ? "border-red-500 focus:ring-red-500"
                    : "border-custom"
                } ${
                  formIsSubmitting || loading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                placeholder="e.g. LC-001"
              />
              {errors.problemId && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.problemId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-secondary"
              >
                Difficulty
              </label>
              <CustomSelect
                options={difficultyOptions}
                value={difficultyValue}
                onChange={(value) => {
                  handleInputFocus();
                  setValue("difficulty", value as any, {
                    shouldValidate: true,
                  });
                }}
                placeholder="Select difficulty"
                disabled={formIsSubmitting || loading}
                error={!!errors.difficulty}
              />
              {errors.difficulty && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.difficulty.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="problemTitle"
              className="block text-sm font-medium text-secondary"
            >
              Problem Title
            </label>
            <input
              id="problemTitle"
              type="text"
              {...register("problemTitle")}
              disabled={formIsSubmitting || loading}
              onFocus={handleInputFocus}
              className={`w-full px-4 py-3 border rounded-xl bg-surface text-main placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                errors.problemTitle
                  ? "border-red-500 focus:ring-red-500"
                  : "border-custom"
              } ${
                formIsSubmitting || loading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              placeholder="Enter problem title"
            />
            {errors.problemTitle && (
              <p className="text-red-400 text-sm mt-1">
                {errors.problemTitle.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="problemUrl"
              className="block text-sm font-medium text-secondary"
            >
              Problem URL
            </label>
            <input
              id="problemUrl"
              type="url"
              {...register("problemUrl")}
              disabled={formIsSubmitting || loading}
              onFocus={handleInputFocus}
              className={`w-full px-4 py-3 border rounded-xl bg-surface text-main placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                errors.problemUrl
                  ? "border-red-500 focus:ring-red-500"
                  : "border-custom"
              } ${
                formIsSubmitting || loading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              placeholder="https://leetcode.com/problems/..."
            />
            {errors.problemUrl && (
              <p className="text-red-400 text-sm mt-1">
                {errors.problemUrl.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="language"
                className="block text-sm font-medium text-secondary"
              >
                Language
              </label>
              <input
                id="language"
                type="text"
                {...register("language")}
                disabled={formIsSubmitting || loading}
                onFocus={handleInputFocus}
                className={`w-full px-4 py-3 border rounded-xl bg-surface text-main placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                  errors.language
                    ? "border-red-500 focus:ring-red-500"
                    : "border-custom"
                } ${
                  formIsSubmitting || loading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                placeholder="e.g. JavaScript, Python"
              />
              {errors.language && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.language.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-secondary"
              >
                Status
              </label>
              <CustomSelect
                options={statusOptions}
                value={statusValue}
                onChange={(value) => {
                  handleInputFocus();
                  setValue("status", value as any, { shouldValidate: true });
                }}
                placeholder="Select status"
                disabled={formIsSubmitting || loading}
                error={!!errors.status}
              />
              {errors.status && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="timeTaken"
                className="block text-sm font-medium text-secondary"
              >
                Time Taken (min)
              </label>
              <input
                id="timeTaken"
                type="number"
                {...register("timeTaken", { valueAsNumber: true })}
                disabled={formIsSubmitting || loading}
                onFocus={handleInputFocus}
                className={`w-full px-4 py-3 border rounded-xl bg-surface text-main placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                  errors.timeTaken
                    ? "border-red-500 focus:ring-red-500"
                    : "border-custom"
                } ${
                  formIsSubmitting || loading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                placeholder="1"
                min="1"
              />
              {errors.timeTaken && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.timeTaken.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="attempts"
                className="block text-sm font-medium text-secondary"
              >
                Attempts
              </label>
              <input
                id="attempts"
                type="number"
                {...register("attempts", { valueAsNumber: true })}
                disabled={formIsSubmitting || loading}
                onFocus={handleInputFocus}
                className={`w-full px-4 py-3 border rounded-xl bg-surface text-main placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                  errors.attempts
                    ? "border-red-500 focus:ring-red-500"
                    : "border-custom"
                } ${
                  formIsSubmitting || loading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                placeholder="1"
                min="1"
              />
              {errors.attempts && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.attempts.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="cognitiveLoad"
                className="block text-sm font-medium text-secondary"
              >
                Cognitive Load (1-5)
              </label>
              <input
                id="cognitiveLoad"
                type="number"
                {...register("cognitiveLoad", { valueAsNumber: true })}
                disabled={formIsSubmitting || loading}
                onFocus={handleInputFocus}
                className={`w-full px-4 py-3 border rounded-xl bg-surface text-main placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                  errors.cognitiveLoad
                    ? "border-red-500 focus:ring-red-500"
                    : "border-custom"
                } ${
                  formIsSubmitting || loading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                placeholder="3"
                min="1"
                max="5"
              />
              {errors.cognitiveLoad && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.cognitiveLoad.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-secondary"
            >
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              type="text"
              value={tagsInput}
              onChange={handleTagsChange}
              disabled={formIsSubmitting || loading}
              className={`w-full px-4 py-3 border rounded-xl bg-surface text-main placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                errors.tags
                  ? "border-red-500 focus:ring-red-500"
                  : "border-custom"
              } ${
                formIsSubmitting || loading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              placeholder="array, two-pointers, dynamic-programming"
            />
            {errors.tags && (
              <p className="text-red-400 text-sm mt-1">{errors.tags.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="dateSolved"
              className="block text-sm font-medium text-secondary"
            >
              Date Solved
            </label>
            <input
              id="dateSolved"
              type="date"
              {...register("dateSolved", { valueAsDate: true })}
              disabled={formIsSubmitting || loading}
              onFocus={handleInputFocus}
              className={`w-full px-4 py-3 border rounded-xl bg-surface text-main focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
                errors.dateSolved
                  ? "border-red-500 focus:ring-red-500"
                  : "border-custom"
              } ${
                formIsSubmitting || loading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            />
            {errors.dateSolved && (
              <p className="text-red-400 text-sm mt-1">
                {errors.dateSolved.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-secondary"
            >
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              {...register("notes")}
              disabled={formIsSubmitting || loading}
              onFocus={handleInputFocus}
              className={`w-full px-4 py-3 border rounded-xl bg-surface text-main placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none ${
                errors.notes
                  ? "border-red-500 focus:ring-red-500"
                  : "border-custom"
              } ${
                formIsSubmitting || loading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              placeholder="Additional notes about the problem or solution..."
            />
            {errors.notes && (
              <p className="text-red-400 text-sm mt-1">
                {errors.notes.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                clearError();
                setAuthError(null);
                toggle && toggle(false);
              }}
              disabled={formIsSubmitting || loading}
              className={`flex-1 font-semibold px-6 py-3 rounded-xl bg-gray-500/20 text-secondary border border-custom hover:bg-gray-500/30 hover:text-main transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/50 ${
                formIsSubmitting || loading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || formIsSubmitting || loading}
              className={`flex-1 font-semibold px-6 py-3 rounded-xl transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                !isValid || formIsSubmitting || loading
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-primary text-white hover:opacity-80 hover:scale-105 hover:shadow-lg"
              }`}
            >
              {formIsSubmitting || loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding...
                </div>
              ) : (
                "Add Problem"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProblemEntryForm;

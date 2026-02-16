import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import type { FormFields } from "../../schemas/login.schema";
import { useState } from "react";
import { loginUser } from "../../services/auth.service";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      setIsLoading(true);
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });
      setUser({ email: response.user.email, id: response.user.id });
      navigate(location.state?.from.pathname || "/");
    } catch (error: unknown) {
      setError("root", {
        message: error instanceof Error ? error.message : "Registration failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="space-y-3"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="on"
    >
      <input
        {...register("email")}
        type="text"
        placeholder="Email"
        className="
                w-full rounded-md border
                border-zinc-300 dark:border-zinc-700
                bg-white dark:bg-zinc-800
                px-3 py-2
                text-sm
                focus:outline-none focus:ring-2
                focus:ring-blue-500
                "
      />
      {errors.email && (
        <div className="rounded bg-red-100 text-red-700 p-2 text-sm text-center">
          {errors.email.message}
        </div>
      )}

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="
                w-full rounded-md border
                border-zinc-300 dark:border-zinc-700
                bg-white dark:bg-zinc-800
                px-3 py-2
                text-sm
                focus:outline-none focus:ring-2
                focus:ring-blue-500
                "
      />
      {errors.password && (
        <div className="rounded bg-red-100 text-red-700 p-2 text-sm text-center">
          {errors.password.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="
                w-full rounded-md
                bg-blue-600 hover:bg-blue-700
                text-white
                py-2 text-sm font-medium
                transition
                "
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
      {errors.root && (
        <div className="rounded bg-red-100 text-red-700 p-2 text-sm text-center">
          {errors.root.message}
        </div>
      )}
    </form>
  );
}

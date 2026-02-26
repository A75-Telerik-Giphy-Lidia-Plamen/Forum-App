import type { UseFormSetError } from 'react-hook-form';
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { FormFields } from "../schemas/login.schema";
import { loginUser } from "../services/auth.service";


export function useLogin(
  setError: UseFormSetError<FormFields>
) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function submit(data: FormFields) {
    try {
      setIsLoading(true);

      await loginUser({
        email: data.email,
        password: data.password,
      });

      navigate(location.state?.from?.pathname || "/", {
        replace: true,
      });

    } catch (error: unknown) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Login failed",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return { submit, isLoading };
}

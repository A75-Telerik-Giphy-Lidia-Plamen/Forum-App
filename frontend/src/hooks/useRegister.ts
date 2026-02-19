import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { registerUser } from "../services/auth.service";
import type { FormFields } from "../schemas/auth.schema";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const register = async (data: FormFields) => {
    try {
      setIsLoading(true);

      const response = await registerUser({
        email: data.email,
        password: data.password,
        username: data.username,
      });

      setUser({
        email: response.user?.email,
        id: response.user?.id,
      });

      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
}

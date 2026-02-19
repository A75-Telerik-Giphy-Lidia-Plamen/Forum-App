import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";

import { schema, type FormFields } from "../../../schemas/auth.schema";
import { useRegister } from "../../../hooks/useRegister";
import { RegisterFields } from "./RegisterFields";
import { authFormStyles } from "../authForm.styles";
import { GoogleLoginButton } from "../../ui/GoogleLoginButton";
import { useGoogleAuth } from "../../../hooks/useGoogleAuth";

export default function RegisterForm() {
  const { register: submitRegister, isLoading } = useRegister();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await submitRegister(data);
    } catch (error: unknown) {
      setError("root", {
        message: error instanceof Error ? error.message : "Registration failed",
      });
    }
  };

  const { login, isLoading: isGoogleLoading } = useGoogleAuth((msg) =>
    setError("root", { message: msg })
  );


  return (
    <form className={authFormStyles.form} onSubmit={handleSubmit(onSubmit)}>
      <RegisterFields register={register} errors={errors} />

      <button type="submit" disabled={isLoading} className={authFormStyles.submitButton}>
        {isLoading ? "Loading..." : "Register"}
      </button>

      <GoogleLoginButton
        onClick={login}
        isLoading ={isGoogleLoading}
      />

      {errors.root && (
        <div className={authFormStyles.errorBox}>{errors.root.message}</div>
      )}
    </form>
  );
}

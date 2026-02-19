import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { FormFields } from "../../../schemas/login.schema";

import { useLogin } from "../../../hooks/useLogin";
import { useGoogleAuth } from "../../../hooks/useGoogleAuth";

import { LoginFields } from "./LoginFields";
import { GoogleLoginButton } from "../../ui/GoogleLoginButton";

import { authFormStyles as s } from "../authForm.styles";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>();

  // Email/password login
  const { submit, isLoading } = useLogin(setError);

  // Google login
  const { login: googleLogin, isLoading: isGoogleLoading } =
    useGoogleAuth((msg) =>
      setError("root", { message: msg })
    );

  const onSubmit: SubmitHandler<FormFields> = submit;

  return (
    <form
      className={s.form}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="on"
    >
      <LoginFields
        register={register}
        errors={errors}
      />

      <button
        type="submit"
        disabled={isLoading}
        className={s.submitButton}
      >
        {isLoading ? "Loading..." : "Login"}
      </button>

      {errors.root && (
        <div className={s.errorBox}>
          {errors.root.message}
        </div>
      )}

      <div className={s.divider}>or</div>

      <GoogleLoginButton
        onClick={googleLogin}
        isLoading={isGoogleLoading}
      />
    </form>
  );
}

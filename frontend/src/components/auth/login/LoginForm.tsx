import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { FormFields } from "../../../schemas/login.schema";
import { useLogin } from "../../../hooks/useLogin";
import { authFormStyles as s } from "../authForm.styles";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>();

  const { submit, isLoading } = useLogin(setError);

  const onSubmit: SubmitHandler<FormFields> = submit;

  return (
    <form
      className={s.form}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="on"
    >
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className={s.input}
      />

      {errors.email && (
        <div className={s.errorBox}>
          {errors.email.message}
        </div>
      )}

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className={s.input}
      />

      {errors.password && (
        <div className={s.errorBox}>
          {errors.password.message}
        </div>
      )}

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
    </form>
  );
}

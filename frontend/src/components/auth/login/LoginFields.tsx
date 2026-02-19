import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormFields } from "../../../schemas/login.schema";
import { authFormStyles as s } from "../authForm.styles";

type Props = {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
};

export function LoginFields({ register, errors }: Props) {
  return (
    <>
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
    </>
  );
}

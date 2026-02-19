import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormFields } from "../../../schemas/auth.schema";
import { authFormStyles } from "../authForm.styles";


interface Props {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
}

export function RegisterFields({ register, errors }: Props) {
  return (
    <>
      <input {...register("email")} type="text" placeholder="Email" className={authFormStyles.input} />
      {errors.email && <div className={authFormStyles.errorBox}>{errors.email.message}</div>}

      <input {...register("username")} type="text" placeholder="Username" className={authFormStyles.input} />
      {errors.username && <div className={authFormStyles.errorBox}>{errors.username.message}</div>}

      <input {...register("password")} type="password" placeholder="Password" className={authFormStyles.input} />
      {errors.password && <div className={authFormStyles.errorBox}>{errors.password.message}</div>}

      <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" className={authFormStyles.input} />
      {errors.confirmPassword && <div className={authFormStyles.errorBox}>{errors.confirmPassword.message}</div>}
    </>
  );
}

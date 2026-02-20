import { Link } from "react-router-dom";
import RegisterForm from "../../components/auth/register/RegisterForm";
import { registerPageStyles as s } from "./registerPage.styles";

export default function Register() {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.card}>
          <h1 className={s.title}>
            Join Our Community
          </h1>

          <p className={s.subtitle}>
            Help preserve traditional knowledge for future generations
          </p>

          <div className="mt-6">
            <RegisterForm />
          </div>

          <p className={s.footerText}>
            Already have an account?{" "}
            <Link to="/login" className={s.link}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

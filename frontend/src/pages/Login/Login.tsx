import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/login/LoginForm";
import { loginPageStyles as s } from "./loginPage.styles";

export default function Login() {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.card}>
          <h1 className={s.title}>
            Welcome Back
          </h1>

          <p className={s.subtitle}>
            Sign in to continue sharing knowledge
          </p>

          <div className="mt-6">
            <LoginForm />
          </div>

          <p className={s.footerText}>
            Don't have an account?{" "}
            <Link to="/register" className={s.link}>
              Join the community
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
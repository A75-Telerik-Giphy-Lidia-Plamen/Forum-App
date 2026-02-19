import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import { useUser } from "../hooks/useUser";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    const handleOAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        navigate("/login", { replace: true });
        return;
      }

      const user = data.session.user;

      setUser({
        id: user.id,
        email: user.email,
      });

      navigate("/", { replace: true });
    };

    handleOAuth();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Signing you in...
    </div>
  );
}

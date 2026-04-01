import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token); // Keydi token-ka
      navigate("/"); // Aad Home
    }
  }, [searchParams]);

  return <div>Loading...</div>;
};
export default AuthSuccess;

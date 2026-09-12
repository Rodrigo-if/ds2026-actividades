import React from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../components/Login";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/");
  };

  return <Login onLoginSuccess={handleLoginSuccess} />;
};

export default LoginPage;
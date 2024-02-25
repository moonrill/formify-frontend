import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CheckIfLoggedIn = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.accessToken) {
      navigate("/login");
    }
  }, [navigate]);
};

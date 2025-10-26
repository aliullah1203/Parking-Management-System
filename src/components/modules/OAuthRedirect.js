// src/components/modules/OAuthRedirect.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthRedirect({ setUser }) {
  // <-- ✅ accept setUser here
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const userParam = params.get("user");

    if (accessToken && userParam) {
      try {
        // ✅ Decode the user info safely
        const decodedUser = JSON.parse(decodeURIComponent(userParam));

        // ✅ Save everything in localStorage
        localStorage.setItem("accessToken", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("loggedInUser", JSON.stringify(decodedUser));

        // ✅ Update React state in App.js immediately
        setUser(decodedUser);

        // ✅ Redirect to dashboard
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("OAuth redirect error:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, setUser]);

  return <div>Redirecting...</div>;
}

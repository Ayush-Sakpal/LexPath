import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AuthButton({ type }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleClick = () => {
    if (type === "logout") {
      logout();
      navigate("/login"); // Redirect after logout
    } else if (type === "login") {
      navigate("/login"); // Redirect to login page
    } else if (type === "signup") {
      navigate("/signup"); // Redirect to signup page
    }
  };

  const label = type === "logout" ? "Logout" : type === "login" ? "Login" : "Signup";

  return (
    <button
      className="hover:cursor-pointer hover:bg-slate-700 border-2 border-white rounded px-4 py-2 transition"
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

export default AuthButton;

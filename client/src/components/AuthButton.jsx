import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AuthButton() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleClick = () => {
    if (user) {
      logout();
      navigate("/login"); // Redirect after logout
    } else {
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <button
      className="hover:cursor-pointer hover:bg-slate-700 border-2 border-white rounded px-4 py-2"
      onClick={handleClick}
    >
      {user ? "Logout" : "Login"}
    </button>
  );
}

export default AuthButton;
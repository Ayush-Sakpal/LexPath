import AuthButton from "./AuthButton";
import NavbarButton from "./NavbarButton";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <div className="bg-accentPrimary px-9 py-4 text-white shadow-xl sticky top-0">
      <ul className="flex justify-between items-center">
        <div>
          <NavbarButton name="Home" to="/" />
          <NavbarButton name="Colleges" to="/colleges" />
          <NavbarButton name="Careers" to="/careers" />
          <NavbarButton name="Mock Tests" to="/mock_tests" />
          <NavbarButton name="Jobs" to="/jobs" />
          <NavbarButton name="Dashboard" to="/dashboard" />
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="font-semibold">Hi, {user.name}</span>
              <AuthButton name="Logout" />
            </>
          ) : (
            <>
              <AuthButton name="Login" />
              <AuthButton name="Signup" />
            </>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
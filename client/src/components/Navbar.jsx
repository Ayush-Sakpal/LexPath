import AuthButton from "./AuthButton";
import NavbarButton from "./NavbarButton";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <div className="bg-accentPrimary px-9 py-4 text-white shadow-xl sticky top-0 z-50">
      <ul className="flex justify-between items-center">
        <div className="flex gap-2">
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
              <AuthButton type="logout" />
            </>
          ) : (
            <>
              <AuthButton type="login" />
              <AuthButton type="signup" />
            </>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Navbar;

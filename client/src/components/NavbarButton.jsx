import { Link } from "react-router-dom";

function NavbarButton({ name, to }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 rounded hover:bg-white hover:text-accentPrimary font-medium transition"
    >
      {name}
    </Link>
  );
}

export default NavbarButton;

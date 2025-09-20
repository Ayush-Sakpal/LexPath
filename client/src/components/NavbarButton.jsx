import { Link } from "react-router-dom";

function NavbarButton({ name, to }) {
  return (
    <Link
      to={to}
      className="hover:cursor-pointer hover:bg-slate-700 rounded px-4 py-2"
    >
      {name}
    </Link>
  );
}

export default NavbarButton;

import { useNavigate } from "react-router-dom";

function AuthButton(props) {
  const navigate = useNavigate();

  return (
    <button 
      className="hover:cursor-pointer hover:bg-slate-700 border-2 border-white rounded px-4 py-2"
      onClick={() => navigate(`/${props.name.toLowerCase()}`)}
    >
      {props.name}
  </button>);
}

export default AuthButton;
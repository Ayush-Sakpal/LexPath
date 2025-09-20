function AuthButton(props) {
  return <button className="hover:cursor-pointer hover:bg-slate-700 border-2 border-white rounded px-4 py-2">
    {props.name}
  </button>
}

export default AuthButton;
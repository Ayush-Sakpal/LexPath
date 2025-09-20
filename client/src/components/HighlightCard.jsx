function HighlightCard(props) {
  return <div className="bg-white rounded shadow-xs hover:cursor-pointer hover:shadow-xl text-xl transition">
    <div className="block h-36 my-1">
      {props.icon}
    </div>

    <div className="my-4">
      {props.title}
    </div>
    
  </div>
}

export default HighlightCard;
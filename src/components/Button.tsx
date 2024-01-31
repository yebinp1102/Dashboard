
type Props = {
  color: string, 
  bgColor: string, 
  text: string, 
  borderRadius: string,
  size: string,
  link?: string;
}

const Button = ({color, bgColor, text, borderRadius, size}: Props) => {
  return (
    <button 
      type="button" 
      style={{backgroundColor: bgColor, color, borderRadius}} 
      className={`text-${size} px-3 py-1.5 hover:drop-shadow-xl`}
    >
      {text}
    </button>
  )
}

export default Button
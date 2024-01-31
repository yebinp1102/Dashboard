import { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../context/contextProvider";

type NavProps = {
  title: string;
  customFunc: React.Dispatch<React.SetStateAction<any>>;
  icon: React.ReactNode; // IconType
  color: string;
  dotColor?: string;
}

const NavButton = ({title, customFunc, icon, color, dotColor}: NavProps) => (
  <TooltipComponent content={title} position="BottomCenter" style={{color}} className="relative text-xl rounded-full p-3 hover:bg-light-gray">
    <button type="button" onClick={customFunc}>
      <span style={{background: dotColor}} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"/>{icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const {setActiveMenu, screenSize, setScreenSize} = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  },[])

  useEffect(() => {
    if(screenSize && screenSize <= 900){
      setActiveMenu(false);
    }else{
      setActiveMenu(true)
    }
  },[screenSize])

  return (
    <div className="flex justify-between md:mx-6 p-2 relative">
      <NavButton title="Menu" customFunc={() => setActiveMenu((prev) => !prev)} color="blue" icon={<AiOutlineMenu />} />
    </div>
  )
}

export default Navbar
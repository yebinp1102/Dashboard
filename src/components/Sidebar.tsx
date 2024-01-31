import { Link, NavLink } from 'react-router-dom';
import { SiShazam } from "react-icons/si";
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links } from '../data/dummy';
import { useStateContext } from '../context/contextProvider';

const SideBar = () => {
  const {activeMenu, setActiveMenu, screenSize} = useStateContext();

  const activeLink = 'flex items-center gap-5 pl-7 pt-3 pb-2.5 rounded-lg text-white text-md m-2 bg-slate-700';
  const notActiveLink = 'flex items-center gap-5 pl-7 pt-3 pb-2.5 rounded-lg text-md m-2 text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-gray-400 hover:text-white';

  const handleCloseSidebar = () => {
    if(activeMenu && screenSize && screenSize <= 900){
      setActiveMenu(false);
    }
  }

  return (
    <div className='ml-3 h-screen pb-10 overflow-auto md:overflow-hidden md:hover:overflow-auto`'>
      {activeMenu && (
        <>
          <div className='flex justify-between items-center'>
            <Link to="/" onClick={() => handleCloseSidebar} className='flex items-end justify-start gap-2 ml-3 mt-8 text-xl tracking-tight text-[#056531]'>
              <SiShazam className="text-3xl mb-1"/> 
              <span className='font-black font-point text-2xl pt-1'>따릉이</span>
              <span className='text-lg font-semibold text-gray-500 tracking-tighter leading-[14px]'>
                <p className=' font-point'>Seoul</p>
                <p className='font-point'>Bike</p>
              </span>
            </Link>
            <TooltipComponent content={"Menu"} position="BottomCenter">
              <button type="button" onClick={() => setActiveMenu((prevActiveState) => !prevActiveState)} className='text-xl rounded-full p-4 hover:bg-light-gray mt-4 block md:hidden'>
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className='mt-14'>
            {links.map(item => (
              <div key={item.title} className='mb-16 border-b border-slate-300 pb-4 last:border-none'>
                <p className='flex items-center gap-2 text-gray-400 m-3'>
                  <span className='text-xl'>{item.icon}</span>
                  <span>{item.title}</span>
                </p>
                {item.links.map(link => (
                  <NavLink to={`/${link.linkTo}`} key={link.name} onClick={() => handleCloseSidebar} className={({ isActive }) => isActive ? activeLink : notActiveLink}>
                    <span className=''>{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SideBar
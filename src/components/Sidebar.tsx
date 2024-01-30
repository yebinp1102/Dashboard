import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links } from '../data/dummy';
import { useStateContext } from '../context/contextProvider';

const Sidebar = () => {
  const {activeMenu, setActiveMenu} = useStateContext();

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const notActiveLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray';

  return (
    <div className='ml-3 h-screen pb-10 overflow-auto md:overflow-hidden md:hover:overflow-auto'>
      {activeMenu && (
        <>
          <div className='flex justify-between items-center'>
            <Link to="/" onClick={() => setActiveMenu(false)} className='items-center gap-3 ml-3 mt-4 flex text-xl tracking-tight dark:text-white text-slate-900'>
              <SiShopware className="text-3xl"/> <span className='font-black font-point'>Shoppy</span>
            </Link>
            <TooltipComponent content={"Menu"} position="BottomCenter">
              <button type="button" onClick={() => setActiveMenu((prevActiveState) => !prevActiveState)} className='text-xl rounded-full p-4 hover:bg-light-gray mt-4 block md:hidden'>
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className='mt-10'>
            {links.map(item => (
              <div key={item.title}>
                <p className='text-gray-400 m-3 mt-4 uppercase'>{item.title}</p>
                {item.links.map(link => (
                  <NavLink to={`/${link.name}`} key={link.name} onClick={() => {}} className={({ isActive }) => isActive ? activeLink : notActiveLink}>
                    {link.icon} <span className='capitalize'>{link.name}</span>
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

export default Sidebar
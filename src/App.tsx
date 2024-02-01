import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent} from '@syncfusion/ej2-react-popups';
import { Navbar, SideBar } from './components';
import './App.css';
import { useStateContext } from './context/contextProvider';
import UserAnalysis from './pages/UserAnalysis';
import Test from './pages/Test';
import ReturnBike from './pages/ReturnBike';
import RentBike from './pages/RentBike';

const App = () => {
  const {activeMenu} = useStateContext();

  return (
    <div>
      <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>
          <div className='fixed right-4 bottom-4' style={{ zIndex: '1000'}}>
            <TooltipComponent content="Settings" position="TopCenter" >
              <button 
                type='button' 
                className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white'
                style={{background: 'blue', borderRadius: '50%'}}  
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {activeMenu ? (
            <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
              <SideBar />
            </div>
          ): (
            <div className='w-0 dark:bg-secondary-dark-bg'>
              <SideBar />
            </div>
          )}

          <div className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`}>
            <div className="fixed md:static dark:bg-main-dark-bg navbar w-full">
                <Navbar />
            </div>
          
            {/* Routes */}
            <div>
              <Routes>
                {/* Dashboard */}
                <Route path='/' element={"Home"} />

                {/* introduction */}
                <Route path='/introduction' element={"Introduction"} />
                <Route path='/rent' element={<RentBike />} />
                <Route path='/return' element={<ReturnBike />} />
                <Route path='/search/station' element={"Search station"} />

                {/* analysis */}
                <Route path='/monthly/usage' element={<UserAnalysis />} />
                <Route path='/monthly/new_user' element={<Test />} />

              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

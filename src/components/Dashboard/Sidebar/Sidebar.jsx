import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { BsFillHouseAddFill, BsFingerprint } from 'react-icons/bs'
// import { GrUserAdmin } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { Link } from 'react-router-dom'
import useRole from '../../../hooks/useRole'
import MenuItem from './Sidebar/Menu/MenuItem'
import HostMenu from './Sidebar/HostMenu'
import GuestMenu from './Sidebar/Menu/GusetMenu'
import AddRoom from '../../../pages/Dashboard/Host/AddRoom'
import AdminMenu from './Sidebar/Menu/AdminMenu'
import ToggleBtn from '../../Shared/Button/ToggleBtn'



const Sidebar = () => {
  const { logOut } = useAuth()
  const [role]= useRole()
  console.log(role)
  const [isActive, setActive] = useState(false)
  const[toggle, setToggle]= useState(false)


  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  const toggleHandler=(e)=>{
    console.log(e.target.checked)
    setToggle( e.target.checked) 

  }
  return (
    <>
    
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
           
                <h1 className=' text-red-400 font-bold text-2xl'>Travel BR</h1>
            </Link>
          </div>
        </div>

        <button
          onClick={toggleHandler}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
              <Link to='/'>
               
                <h1 className=' text-red-400 font-bold text-2xl'>Travel BR</h1>
              </Link>
              
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}
            {role==='host' && <ToggleBtn  toggleHandler={toggleHandler} toggle={toggle} />}

            {/*  Menu Items */}
            <nav>
              {/* Statistics */}

              <MenuItem label={'Statistics'} address={'/dashboard'} icon={BsGraphUp} />
         
              

              {/* Add Room */}
              {/* <MenuItem label={'Add Room'} address={'add-room'}  icon={BsFillHouseAddFill}/> */}
           
              {/* My Listing */}
              {/* <MenuItem label={'My Listings'} address={'my-listings'} icon={BsFillHouseAddFill} />  */}

              {role ==='host' ?  toggle ? <HostMenu /> : <GuestMenu /> : undefined}
              {role ==='guest' && <GuestMenu />}
              {role === 'admin' && <AdminMenu /> }
          
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <MenuItem label={'Profile'}  address={'/dashboard/profile'} icon={FcSettings} />
     
          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
import React, {useState, useEffect} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {FaHeart} from 'react-icons/fa'
import {CgBoard, CgUser} from 'react-icons/cg'
import { BiLogOut } from 'react-icons/bi'
import Footer from './Components/Footer/Footer'
import MobileFooter from './Components/Footer/MobileFooter'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage  from  "react-secure-storage";
import SideBar from './Pages/Dashboard/Sidebar' 
import Axios from 'axios'
import SearchBar from './Components/SearchBar'

function Structure({dataUser, setLoginStateParent, loginStateParent, children}) {

  /* NAVBAR */
  const hover = "hover:text-subMain transitions text-white"
  const Hover = ({isActive}) => (isActive ? 'text-subMain' : hover);
  const navigate = useNavigate()
  const [nbrFav, setNbrFav] = useState(0)

  function logout() {
    setLoginStateParent(false)
    secureLocalStorage.removeItem('LOGIN_STATE')
    Axios.get("https://cheatsheet-mysql.herokuapp.com/logout")
    navigate("/")
  }
  const [login, setLogin] = useState(false)

  useEffect(() => {
    setNbrFav(Object.values(dataUser).length)
  }, [dataUser]);

  useEffect(() => {
    if (loginStateParent === true) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [loginStateParent]);

  return (
    <div className="bg-main text-white">
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          {/* Logo */}
          <div className="col-span-1 lg:block" hidden>
            <Link to="/">
              <img src='/images/LogoNavbar.png' alt='Logo' className='w-full h-12 object-contain'></img>
            </Link>
          </div>
          <SearchBar />

          {/* Menu */}
          <div className="col-span-3 font-meduim text-sm hidden xl:gap-14 2xl:gap-16 justify-between lg:flex xl:justify-end items-center">
            <NavLink to="/cheats" className={Hover}>
              Cheats
            </NavLink>
            <NavLink to="/news" className={Hover}>
              News
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact Us
            </NavLink>
            {(
              login === false
              && 
              <NavLink to="/login" className={Hover}>
                <CgUser className="w-8 h-8"/>
              </NavLink>
              )||
              <>
                <NavLink to="/profile" className={Hover}>
                  <CgBoard className="w-8 h-8"/>
                </NavLink>
                <button className="hover:text-subMain transitions text-white" onClick={logout}>
                  <BiLogOut className="w-8 h-8"/>
                </button>
                <NavLink to="/favorites" className={`${Hover} relative`}>
                  <FaHeart className="w-6 h-6"/>
                  <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                    {nbrFav}
                  </div>
                </NavLink>
              </>
            }
          </div>
        </div>
      </div>
      <SideBar setLoginState={setLoginStateParent} loginState={loginStateParent}>
        {children}
      </SideBar>
      <Footer/>
      <MobileFooter nbrFav={nbrFav} loginStateParent={loginStateParent}/>
    </div>
  )
}

export default Structure
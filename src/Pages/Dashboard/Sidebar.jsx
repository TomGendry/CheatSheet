import React, { useEffect, useState } from 'react'
import {BsFillGridFill, BsCardImage} from 'react-icons/bs'
import {FaListAlt, FaUsers, FaHeart} from 'react-icons/fa'
import {RiLockPasswordFill, RiMovie2Fill} from 'react-icons/ri'
import {HiViewGridAdd} from 'react-icons/hi'
import {FiSettings} from 'react-icons/fi'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import secureLocalStorage from 'react-secure-storage'

function Sidebar({setLoginState, loginState, children}) {
    const active = "bg-dryGray text-subMain"
    const hover = "hover:text-white hover:bg-main"
    const inActive = "rounded font-medium text-sm transitions flex gap-3 items-center p-4"
    const Hover = ({isActive}) => isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;
    
    Axios.defaults.withCredentials = true;
    const location = useLocation();
    const navigate = useNavigate()
    const [admin, setAdmin] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);

    const SideLinks = [
        {
            name: "Dashboard",
            link: "/dashboard",
            icon: BsFillGridFill,
            admin: true
        },
        {
            name: "Cheats List",
            link: "/cheatslist",
            icon: FaListAlt,
            admin: true
        },
        {
            name: "Add Cheat",
            link: "/addcheat",
            icon: RiMovie2Fill,
            admin: true
        },
        {
            name: "Categories",
            link: "/categories",
            icon: HiViewGridAdd,
            admin: true
        },
        {
            name: "Images",
            link: "/images",
            icon: BsCardImage,
            admin: true
        },
        {
            name: "Users",
            link: "/users",
            icon: FaUsers,
            admin: true
        },
        {
            name: "Update Profile",
            link: "/profile",
            icon: FiSettings,
            admin: false
        },
        {
            name: "Favorites Cheats",
            link: "/favorites",
            icon: FaHeart,
            admin: false
        },
        {
            name: "Change Password",
            link: "/password",
            icon: RiLockPasswordFill,
            admin: false
        }
      ]

    const arrayPathName = [
        "/modifycheat","/profile","/dashboard","/password","/favorites","/cheatslist","/images","/categories","/users","/addcheat"
    ]
    
    useEffect(() => {
        Axios.get("https://cheatsheet-mysql.herokuapp.com/login").then((response) => {
            if (response.data.loggedIn === true) {
                if (response.data.user[0].admin === 1) {
                    setAdmin(true)
                } else {
                    setAdmin(false)
                }
            } else {
                secureLocalStorage.removeItem('LOGIN_STATE')
                setLoginState(false)
                navigate('/')
            }
        })
    }, [loginState]);

    useEffect(() => {
        if (arrayPathName.includes(location.pathname)) {
            setShowSideBar(true)
        } else {
            setShowSideBar(false)
        }
    }, [location])

    return (
        <>
        {showSideBar ?
        <div className="min-h-screen container mx-auto px-2">
            <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
                <div className="col-span-2">
                    <div className="sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
                        { 
                            SideLinks.filter((link) => {
                                if (link.admin === false) {
                                    return true
                                } else if (link.admin === true && admin === true) {
                                    return true
                                } else {
                                    return false
                                }
                            }).map((link, index) => (
                                <NavLink to={link.link} key={index} className={Hover}>
                                    <link.icon/> <p>{link.name}</p>
                                </NavLink>
                            ))
                        }
                        
                    </div>
                </div>
                <div 
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="10"
                data-aos-offse="100"
                className="col-span-6 rounded-md bg-dry border border-gray-800 p-6">
                    {children}
                </div>
            </div>
        </div>
        :
        <>{children}</>
        }
        </>
  )

}

export default Sidebar
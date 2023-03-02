import React from 'react'
import { BsCollectionPlay } from 'react-icons/bs'
import { FiHeart, FiUserCheck } from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import { NavLink } from 'react-router-dom'

function MobileFooter({nbrFav, login}) {

  const active = "bg-white text-main"
  const inActive = "transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3"

  const Hover = ({isActive}) => isActive ? `${active} ${inActive}` : inActive

  return (
    <>
        <div className="flex-btn h-full bg-white rounded cursor-pointer overflow-y-hidden flex-grow w-full">
            {/* Drawer */}

        </div>
        <footer className='lg:hidden fixed z-50 bottom-0 w-full px-1'>
            <div className="bg-dry flex-btn w-full p-1 border-t-gray-100 border-t">
                <NavLink to="/cheats" className={Hover}>
                    <BsCollectionPlay />
                </NavLink>
                <NavLink to="/" className={Hover}>
                    <AiFillHome />
                </NavLink>
                {login === false
                &&
                (<NavLink to="/login" className={Hover}>
                    <FiUserCheck />
                </NavLink>)
                ||
                (<NavLink to="/favorites" className={Hover}>
                    <div className="relative">
                        <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                            {nbrFav}
                        </div>
                        <FiHeart/>
                    </div>
                </NavLink>)}
            </div>
        </footer>
    </>
  )
}

export default MobileFooter
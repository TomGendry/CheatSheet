import React from 'react'
import {FaRegCalendarAlt} from 'react-icons/fa'

function FlexCheatItems({cheat}) {
  return (
    <>
        <>
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{cheat.categories}</span>
        </div>
        <div className="flex items-center gap-2">
            <FaRegCalendarAlt className="text-subMain w-3 h-3" />
            <span className="text-sm font-medium">{cheat.date}</span>
        </div>
        </>
        
    </>
  )
}

export default FlexCheatItems
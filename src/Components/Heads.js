import React from 'react'

function Heads({title}) {
  return (
    <div className="w-full bg-deepGray lg:h-64 relative overflow-hidden rounded-md">
        <img src='/images/Head.jpg' alt='News' className='w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0'/>
        <div className="absolute lg:top-24 top-16 w-full flex-colo">
            <h1 className="text-2xl lg:text-h1 text-white text-center font-bold">{title && title}</h1>
        </div>
    </div>
  )
}

export default Heads
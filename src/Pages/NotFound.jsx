import React from 'react'
import { Link } from 'react-router-dom'
import {BiHomeAlt} from 'react-icons/bi'

function NotFound({db}) {
  
  return (
    <div className="flex-colo gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6">
      {db === true ? (
        <>
          <img className='w-full h-96 object-contain' src='/images/404.png' alt='Not Found'/>
          <h1 className="text-4xl font-bold">Connection Database failed</h1>
          <p className="font-medium text-border leading-6 text-center">
            The website didn't succeed to connect to database
          </p>
        </>
      ):
      (
      <>
        <img className='w-full h-96 object-contain' src='/images/404.png' alt='Not Found'/>
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="font-medium text-border leading-6 text-center">
          The page you are looking for doesn't exist. You may have mistyped the URL
        </p>
        <Link to="/" className="bg-subMain text-white flex-rows gap-4 hover:text-main font-medium py-2 px-4 rounded-md">
          <BiHomeAlt/> Home
        </Link>
      </>
      )}
    </div>
  )
}

export default NotFound
import React from 'react'
import Uploader from '../../Components/Uploader'
import {Input} from '../../Components/UsedInput'

function Profile({user}) {
  return (
        <div className='flex flex-col gap-6'>
            <h2 className="text-xl font-bold">Profile of {user ? user.username : "ERROR LOADING NAME"}</h2>
            <Uploader />
            <Input
                label="Full Name"
                placeholder="Full Name"
                type="text"
                bg={true}
                />
            <Input
                label="Email"
                placeholder="fenrir@gmail.com"
                type="email"
                bg={true}
                />
            <div className="flex gap-2 flex-wrap sm:flex-row justify-between items-center my-4">
                <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
                    Update Profile
                </button>
                <button className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
                    Delete Account
                </button>
            </div>
        </div>
  )
}

export default Profile
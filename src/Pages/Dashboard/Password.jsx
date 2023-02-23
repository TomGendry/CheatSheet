import React, { useState } from 'react'
import {Input} from '../../Components/UsedInput'

function Password() {

  const [prevPass, setPrevPass] = useState()
  const [newPass, setNewPass] = useState()
  const [newPassConf, setNewPassConf] = useState()
  const [error, setError] = useState();

  function createError(phrase) {
    return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
        <p>{phrase}</p>
    </div>
  }

  function changePassword() {
    if (newPass && prevPass && newPassConf && newPass.toString().toLowerCase() === newPassConf.toString().toLowerCase()) {

    } else {

    }
  }

  return (
        <div className='flex flex-col gap-6'>
            {error}
            <h2 className="text-xl font-bold">Change Password</h2>
            <Input
                label="Previous Password"
                placeholder="**********"
                type="password"
                bg={true}
                onChange={e => setPrevPass(e.target.value)}
                />
            <Input
                label="New Password"
                placeholder="**********"
                type="password"
                bg={true}
                onChange={e => setNewPass(e.target.value)}
                />
            <Input
                label="Confirm Password"
                placeholder="**********"
                type="password"
                bg={true}
                onChange={e => setNewPassConf(e.target.value)}
                />
            <div className="flex justify-end items-center my-4">
                <button onClick={() => changePassword()} className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
                    Change Password
                </button>
            </div>
        </div>
  )
}

export default Password
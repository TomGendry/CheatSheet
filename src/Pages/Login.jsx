import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../Components/UsedInput'
import {FiLogIn} from 'react-icons/fi'
import Axios from 'axios'

function Login({setUser, setLoginStateParent}) {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate()
  
  function createError(phrase) {
    return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
        <p>{phrase}</p>
    </div>
  }

  Axios.defaults.withCredentials = true;
  const checkLogin = () => {
    if (username == null || password == null || username.length < 1 || password < 1) {
        const temp = createError("Please fill in the fields before validating")
        setError(temp)
    } else {
        Axios.post('https://cheatsheet-mysql.herokuapp.com/login',{data:{
            username: username,
            password: password,
        },
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          }).then((response) => {
            if (response.data === false) {
                const temp = createError("Connection failed")
                setPassword("")
                setError(temp)
            } else {
                setLoginStateParent(true)
                setUser({username: username})
                navigate("/")
            }
        })
    }
  }

  useEffect(() => {
    Axios.get("https://cheatsheet-mysql.herokuapp.com/login").then((response) => {
        if (response.data.loggedIn === true) {
            navigate("/dashboard")
        }
    })
  }, [])

  return (
    <div className="container mx-auto px-2 my-24 flex-colo">
        <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border">
            <img src="/images/LogoNavbar.png" alt="Logo" className='w-full h-14 object-contain'/>
            {error}
            <Input label="name" placeholder="fenrir" type="text" bg={true} onChange={e => setUsername(e.target.value)} value={username}/>
            <Input label="Password" placeholder="********" type="password" bg={true} onChange={e => setPassword(e.target.value)} value={password}/>
            <button onClick={checkLogin} className='bg-subMain transitions hover: hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'>
                <FiLogIn/> Sign In
            </button>
            <p className="text-center text-border">
                Don't have an account ? {" "}
                <Link to="/register" className='text-dryGray font-semibold ml-2'>Sign Up</Link>
            </p>
        </div>
    </div>
  )
}

export default Login
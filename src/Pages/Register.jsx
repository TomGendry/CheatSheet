import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../Components/UsedInput'
import {FiLogIn} from 'react-icons/fi'
import Axios from 'axios';

function Register({setUser, setLoginStateParent}) {

  const [fullName, setFullName] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordConf, setPasswordConf] = useState()
  const navigate = useNavigate()
  const [error, setError] = useState();

  useEffect(() => {
    Axios.get("https://cheatsheet-mysql.herokuapp.com/login").then((response) => {
        if (response.data.loggedIn === true) {
            navigate("/login")
        }
    })
  }, [])

  function createError(phrase) {
    return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
        <p>{phrase}</p>
    </div>
  }

  const addCheater = () => {
    if(fullName && username && password && email && fullName.length > 4 && username.length > 4 && password.length > 5) {
        Axios.post('https://cheatsheet-mysql.herokuapp.com/create',{
            fullName: fullName,
            username: username,
            password: password,
            email: email,
        }).then(() => {
            setLoginStateParent(true)
            setUser({username: username})
            navigate("/")
        })
    } else {
        const temp = createError("An error occured with the field value !")
        setError(temp)
    }
  }

  return (
        <div className="container mx-auto px-2 my-24 flex-colo">
            <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border">
                <img src="/images/LogoNavbar.png" alt="Logo" className='w-full h-14 object-contain'/>
                {error}
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} label="FullName" placeholder="Fenrir Author" type="text" bg={true}/>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} label="Username" placeholder="Fenrir" type="text" bg={true}/>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="fenrir@gmail.com" type="email" bg={true}/>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="********" type="password" bg={true}/>
                <Input value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} label="Password Conf" placeholder="********" type="password" bg={true}/>
                <button onClick={addCheater} className='bg-subMain transitions hover: hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'>
                    <FiLogIn/> Sign Up
                </button>
                <p className="text-center text-border">
                    Already have an account ? {" "}
                    <Link to="/login" className='text-dryGray font-semibold ml-2'>Sign In</Link>
                </p>
            </div>
        </div>
  )
}

export default Register
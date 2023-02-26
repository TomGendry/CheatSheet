import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Banner from '../Components/Home/Banner'
import LatestCheat from '../Components/Home/LatestCheat'

function HomeScreen({dataUser, setDataUser, loginState}) {

  const [data, setData] = useState([])
  const [error, setError] = useState("");

  function createError(phrase) {
    return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
        <p>{phrase}</p>
    </div>
  }
  
  useEffect(() => {
    Axios.get('https://cheatsheet-mysql.herokuapp.com/getAllCheats', {
      withCredentials: true,
    })
    .then((response) => {
        if (response.data === false) {
            const temp = createError("Connection failed")
            setError(temp)
        } else {
            setData(response.data.cheats)
            setError("")
            if (response.data.userFavorites !== []) {
                const objData = response.data.userFavorites[0].favorites.split(",")
                objData.pop()
                setDataUser(objData)    
            }
        }
    }).catch(err => setError(createError(err)))
  }, [])
  

  return (
    <div className='container mx-auto min-h-screen px-2 mb-6'>
      <Banner setDataUser={setDataUser} dataUser={dataUser} loginState={loginState} data={data}/>
      <LatestCheat setDataUser={setDataUser} dataUser={dataUser} loginState={loginState} data={data}/>      
    </div>
  )
}

export default HomeScreen
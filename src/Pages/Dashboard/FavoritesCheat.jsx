import React, { useEffect } from 'react'
import { useState } from 'react'
import TableCheat from '../../Components/TableCheat'
import Axios from 'axios'

function FavoritesCheat({dataUser, setDataUser}) {

  const [data,setData] = useState([])
  const [error, setError] = useState(null);
  const [tempRefresh, setTempRefresh] = useState(false)

  function createError(phrase) {
    return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
        <p>{phrase}</p>
    </div>
  }

  function createSuccess(phrase) {
    return <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 w-full" role="alert">
        <p>{phrase}</p>
    </div>
  }

  useEffect(() => {
    if (tempRefresh === true) {
        const tempSUCCESS = createSuccess("You successfully remove a favorite !")
        setError(tempSUCCESS)
        setTempRefresh(false)
    }
  }, [tempRefresh])

  useEffect(() => {
    Axios.get('https://cheatsheet-mysql.herokuapp.com/getFavorites')
    .then((response) => {
        if (response.data === false) {
            const temp = createError("Connection failed")
            setError(temp)
        } else {
            setData(response.data)
        }
    }).catch(err => setError(createError(err)))
  }, [])

  return (
        <div className="flex flex-col gap-6">
            {error}
            <div className="flex-btn gap-2">
                <h2 className="text-xl font-bold">Favorites Cheats</h2>
                <button className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded">
                    Delete All
                </button>
            </div>
            <TableCheat dataUser={dataUser} setDataUser={setDataUser} data={data} admin={false} fav={true} setTempRefresh={setTempRefresh} setData={setData} getData={data}/>
        </div>
  )
}

export default FavoritesCheat
import React, {useEffect, useState} from 'react'
import TableCheat from '../../../Components/TableCheat'
import Axios from 'axios'

function CheatsList() {

  const [data, setData] = useState([])
  const [error, setError] = useState(null);

  function createError(phrase) {
    return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
        <p>{phrase}</p>
    </div>
  }

  useEffect(() => {
    Axios.get('https://cheatsheet-mysql.herokuapp.com/getAllCheats')
    .then((response) => {
        if (response.data === false) {
            const temp = createError("Connection failed")
            setError(temp)
        } else {
            setData(response.data.cheats)
        }
    }).catch(err => setError(createError(err)))
  }, [])

  return (
    <>
        <div className="flex flex-col gap-6">
          {error}
            <div className="flex-btn gap-2">
                <h2 className="text-xl font-bold">Cheats List</h2>
                <button className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded">
                    Delete All
                </button>
            </div>
            <TableCheat data={data} admin={true} />
        </div>
    </>
  )
}

export default CheatsList
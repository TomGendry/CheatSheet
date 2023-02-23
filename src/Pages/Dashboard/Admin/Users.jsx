import React, {useState, useEffect} from 'react'
import TableCategories from '../../../Components/TableCategories'
import Axios from 'axios'


function Users() {

  const [data, setData] = useState([])
  const [error, setError] = useState(null);

  function createError(phrase) {
    return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
        <p>{phrase}</p>
    </div>
  }

  useEffect(() => {
    Axios.get('https://cheatsheet-mysql.herokuapp.com/getAllUsers')
    .then((response) => {
        if (response.data == false) {
            const temp = createError("Connection failed")
            setError(temp)
        } else {
            setData(response.data)
        }
    }).catch(err => setError(createError(err)))
  }, [])

    return (
        <>
            {error}
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Users List</h2>
                <TableCategories data={data} users={true} />
            </div>
        </>
      )
}

export default Users
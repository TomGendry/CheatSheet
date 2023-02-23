import React, {useEffect, useState} from 'react'
import { FaRegListAlt, FaUser } from 'react-icons/fa'
import { HiViewGridAdd } from 'react-icons/hi'
import TableCheat from '../../../Components/TableCheat'
import Axios from 'axios';

function Dashboard() {

  const [error, setError] = useState(null);
  const [cheatsList, setCheatsList] = useState([])
  const [categoriesList, setCategoriesList] = useState([])
  const [cheatersList, setCheatersList] = useState([])

  function createError(phrase) {
    return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
        <p>{phrase}</p>
    </div>
  }

  useEffect(() => {
    Axios.get('https://cheatsheet-mysql.herokuapp.com/getAll')
    .then((response) => {
        if (response.data === false) {
            const temp = createError("Connection failed")
            setError(temp)
        } else {
            setCheatsList(response.data[0].cheats)
            setCategoriesList(response.data[0].categories)
            setCheatersList(response.data[0].cheaters)
        }
    }).catch(err => setError(createError(err)))
  }, [])


  const DashboardData = [
    {
        bg: "bg-orange-600",
        icon: FaRegListAlt,
        title: "Total Cheats",
        total: cheatsList.length
    },
    {
        bg: "bg-blue-700",
        icon: HiViewGridAdd,
        title: "Total Categories",
        total: categoriesList.length
    },
    {
        bg: "bg-green-600",
        icon: FaUser,
        title: "Total Users",
        total: cheatersList.length
    }
  ]

  return (
    <>
        {error}
        <h2 className="text-xl font-bold">Dashboard</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {DashboardData.map((data, index) => (
                <div key={index} className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2">
                    <div className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}>
                        <data.icon className='text-2xl text-white' />
                    </div>
                    <div className="col-span-3">
                        <h2>{data.title}</h2>
                        <p className='mt-2 font-bold'>{data.total}</p>
                    </div>
                </div>
            ))}
        </div>
        <h3 className='text-md font-medium my-6 text-border'>Recent Cheats</h3>
        <TableCheat data={cheatsList.slice(0,5)} admin={true}/>
    </>
  )
}

export default Dashboard
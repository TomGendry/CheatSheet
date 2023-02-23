import React, {useState} from 'react'
import { FaCloudDownloadAlt, FaEdit } from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import {GoEye} from 'react-icons/go'
import Axios from 'axios'

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

const Rows = (dataUser, setDataUser, item, i, admin, navigate, fav, setError, setTempRefresh, setData, getData) => {

    function redirectToModify(item) {
       if (admin === true) {
        navigate('/modifycheat', { state: {
            id: item.id,
            title: item.title,
            category: item.category,
            description: item.description,
            language: item.language,
            date: item.date,
            core: item.core
        } });
       }
    }

    function createError(phrase) {
        return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
            <p>{phrase}</p>
        </div>
      }

    let tempIfFav = <></>

    function deleteFavorite() {
        Axios.post('https://cheatsheet-mysql.herokuapp.com/deleteFavorite',{
            cheatID: item.id,
        }).then((response) => {
            if (response.data === false) {
                const temp = createError("Connection failed")
                setError(temp)
            } else {
                setTempRefresh(true)
                setData(getData.filter(itemFilter => itemFilter.id !== item.id))
                
                let temp = Object.values(dataUser);
                temp = temp.filter(function (element) {
                return element !== item.id.toString();
                });
                let filteredObj = Object.assign({}, temp);
                setDataUser(filteredObj);
            }
        })
    }

    if (fav === true) {
        tempIfFav = 
        <button onClick={() => deleteFavorite()} className="bg-subMain hover:bg-main border border-subMain text-white rounded flex-colo w-6   h-6 ">
                                <MdDelete/>
                            </button>
    }

    return (
        <tr key={i}>
            <td className={`${Text}`}>
                <img className='h-18 w-14 rounded-md object-cover'
                src={`/images/cheats/${item?.category}-AFFICHE.jpg`}
                alt={item.name}
                />
            </td>
            <td className={`${Text} truncate`}>{item.title}</td>
            <td className={`${Text}`}>{item.category}</td>
            <td className={`${Text}`}>{item.language}</td>
            <td className={`${Text} text-xs`}>{item.date}</td>
            <td className={`${Text} float-right flex-rows gap-2 py-8`}>
                {
                    (admin && fav !== true)? (
                        <>
                            <button onClick={() => redirectToModify(item)} className="border border-border hover:text-green-500 hover:border-green-500 bg-dry flex-rows gap-2 text-border rounded py-1 px-2 ">
                                Edit <FaEdit className='text-green-500'/>
                            </button>
                            <button className="bg-subMain hover:bg-main border border-subMain text-white rounded flex-colo w-6   h-6 ">
                                <MdDelete/>
                            </button>
                        </>
                    ) : 
                    (
                        <>
                            <button className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2 ">
                                Download <FaCloudDownloadAlt className='text-green-500'/>
                            </button>
                            <Link  to={`/cheat/${item?.id}`} className="bg-subMain text-white rounded flex-colo w-6   h-6 ">
                                <GoEye/>
                            </Link>
                            {tempIfFav}
                        </>
                    )
                }
            </td>
        </tr>
    )
}

function TableCheat({dataUser, setDataUser, data, admin, fav, setTempRefresh, setData, getData}) {

  let navigate = useNavigate()
  const [error,setError] = useState()

  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
        {error}
        <table className="w-full table-auto birder border-border divide-y divide-border">
            <thead>
                <tr className="bg-dryGray">
                    <th scope="col" className={`${Head}`}>Image</th>
                    <th scope="col" className={`${Head}`}>Title</th>
                    <th scope="col" className={`${Head}`}>Category</th>
                    <th scope="col" className={`${Head}`}>Language</th>
                    <th scope="col" className={`${Head}`}>Date</th>
                    <th scope="col" className={`${Head} text-end`}>Actions</th>
                </tr>
            </thead>
            <tbody className="bg-main divide-y divide-gray-800">
                {data.map((item, index) => Rows(dataUser, setDataUser, item, index, admin, navigate, fav, setError, setTempRefresh, setData, getData))}
            </tbody>
        </table>
    </div>
  )
}

export default TableCheat
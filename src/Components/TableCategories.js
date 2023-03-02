import React from 'react'
import { FaEdit } from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import { data } from 'autoprefixer'

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";
let Admin = "";

const Rows = (item, i, users, OnEditFunction) => {
    if (item.admin === 1) {
        Admin = "bg-star"
    } else {
        Admin = ""
    }
    return (
        <tr key={i} className={`${Admin}`}>
            {
                users ? (
                    <>
                        <td className={`${Text}`}>
                            <img className='h-18 w-14 rounded-full object-cover'
                            src={`/images/user.jpg`}
                            alt="Image"
                            />
                        </td>
                        <td className={`${Text}`}>{item.id}</td>
                        <td className={`${Text}`}>{item.create_at}</td>
                        <td className={`${Text}`}>{item.fullName}</td>
                        <td className={`${Text}`}>{item.email}</td>

                        <td className={`${Text} float-right flex-rows gap-2 py-8`}>
                            <button className="bg-subMain hover:bg-main border border-subMain text-white rounded flex-colo w-6   h-6 ">
                                <MdDelete/>
                            </button>
                        </td>
                    </>
                )
                :
                (
                    <>
                        <td className={`${Text} font-bold`}>{item.id}</td>
                        <td className={`${Text}`}>
                            <img className='h-18 w-14 rounded-md object-cover'
                            src={`/images/cheats/${item?.title}-AFFICHE.jpg`}
                            alt={item?.title}
                            />
                        </td>
                        <td className={`${Text}`}>
                            <img className='h-20 auto rounded-md object-cover'
                            src={`/images/cheats/SMALL${item?.title}.jpg`}
                            alt={item?.title}
                            />
                        </td>
                        <td className={`${Text}`}>
                            <img className='h-24 auto rounded-md object-cover'
                            src={`/images/cheats/${item?.title}.jpg`}
                            alt={item?.title}
                            />
                        </td>
                        <td className={`${Text} text-center`}>{item.title}</td>
                        <td className={`${Text} float-right flex-rows gap-2 py-8`}>
                            <button onClick={() => OnEditFunction(item)} className="border border-border hover:text-green-500 hover:border-green-500 bg-dry flex-rows gap-2 text-border rounded py-1 px-2 ">
                                Edit <FaEdit className='text-green-500'/>
                            </button>
                            <button className="bg-subMain hover:bg-main border border-subMain text-white rounded flex-colo w-6   h-6 ">
                                <MdDelete/>
                            </button>
                        </td>
                    </>
                )
            }
        </tr>
    )
}

function TableCategories({data, users, OnEditFunction}) {

  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
        <table className="w-full table-auto divide-y divide-border">
            <thead>
                <tr className="bg-dryGray">
                    {
                        users ? (
                            <>
                                <th scope="col" className={`${Head}`}>Image</th>
                                <th scope="col" className={`${Head}`}>Id</th>
                                <th scope="col" className={`${Head}`}>Date</th>
                                <th scope="col" className={`${Head}`}>Full Name</th>
                                <th scope="col" className={`${Head}`}>Email</th>
                            </>
                        ) 
                        : 
                        (
                            <>
                                <th scope="col" className={`${Head}`}>Id</th>
                                <th scope="col" className={`${Head}`}>Image Affiche</th>
                                <th scope="col" className={`${Head}`}>Image Small</th>
                                <th scope="col" className={`${Head}`}>Image Banner</th>
                                <th scope="col" className={`${Head}`}>Title</th>
                            </> 
                        )
                    }
                    
                    <th scope="col" className={`${Head} text-end`}>Actions</th>
                </tr>
            </thead>
            <tbody className="bg-main divide-y divide-gray-800">
                {data.map((item, index) => Rows(item, index, users, OnEditFunction))}
            </tbody>
        </table>
    </div>
  )
}

export default TableCategories
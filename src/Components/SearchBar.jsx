import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SearchBar() {

  const [value, setValue] = useState('')
  const [data, setData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('https://cheatsheet-mysql.herokuapp.com/getAllCheats')
    .then((response) => {
        if (response.data !== false) {
            setData(response.data.cheats)
        }
    })
  }, [])

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (searchTerm) => {
    navigate('/cheat/' + searchTerm)
    setValue("")
  }

  return (
    <div className="col-span-3">
        <form action="" className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
                <button onClick={() => onSearch(value)} type="submit" className="bg-subMain w-12 flex-colo h-12 rounded-l text-white ">
                <FaSearch />
                </button>
                <input value={value} onChange={onChange} type="text" placeholder='Search Cheat' className='font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black'/>
        </form>
        <div className="bg-dryGray rounded -mt-1">
                {data.filter(item => {
                    const searchTerm = value.toLowerCase()
                    const title = item.title.toLowerCase()
                    const category = item.category.toLowerCase()
                    return searchTerm && (title.startsWith(searchTerm) || category.startsWith(searchTerm))&& title !== searchTerm
                }).map((item, index) => <div onClick={() => onSearch(item.id)} key={index} className='cursor-pointer hover:bg-dryGrayHover drowdown-row pl-3 py-3 border-b border-border border-opacity-20 text-gray-700'>
                    <span className='text-subMain'>{item.category}</span> <span className='text-star'>|</span> <span className='font-semibold'>{item.title}</span>
                </div>)}
            </div>
    </div>
  )
}

export default SearchBar
import React from 'react'
import Heads from '../Components/Heads'
import NewsList from '../Components/News/NewsList'
import {Input} from '../Components/UsedInput'
import { useState } from 'react'

function News() {

  const [fieldOfSearch, setFieldOfSearch] = useState()
  const [valueToSend, setValueToSend] = useState("cybersecurity")

  return (
    <>
        <div className="min-height-screen container mx-auto px-2 my-6">
            <Heads title="News" />
            <div className="xl:py-10 py-5 px-4">
              <Input label="Field of Search" placeholder="cybersecurity" type="text" bg={true} onChange={e => setFieldOfSearch(e.target.value)} value={fieldOfSearch}/>
              <button onClick={e => setValueToSend(fieldOfSearch)} className='mt-4 bg-subMain transitions hover: hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'>Search</button>
              <div className="grid grid-flow-row xl:grid-cols-1 gap-4 xl:gap-16 items-center"> 
                  <NewsList fos={valueToSend}/>
              </div>
            </div>
        </div>
    </>
  )
}

export default News
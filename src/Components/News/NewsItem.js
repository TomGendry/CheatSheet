import React from 'react'
import {FaRegCalendarAlt} from 'react-icons/fa'

function NewsItem({title, description, url, urlToImage, source, date}) {
  const dateEtHeure = date.split("T");
  return (
    <a href={url} target="_blank" rel="noreferrer">
        <div className='newsITEM pb-4 p-1 hover:scale-95 transitions relative rounded overflow-hidden'>
            <img src={urlToImage} alt={title} className='w-full h-32 object-cover' />
            <h1 className="font-semibold text-2xl text-center my-3 mx-2">{title}</h1>
            <p className='mx-6 font-medium text-justify'>{description}</p>
            <div className='flex-btn3 right-0 text-white px-4 py-3 w-full'>
              <span className="text-sm font-medium px-2"><strong>Source: </strong>{source}</span>
            </div>
            <div className='flex-btn3 right-0 text-white px-4 w-full'>
              <FaRegCalendarAlt className="text-subMain w-3 h-3" />
              <span className="text-sm font-medium px-2">{dateEtHeure[0]} {dateEtHeure[1].slice(0, -1)}</span>
            </div>
        </div>
    </a>
  )
}

export default NewsItem
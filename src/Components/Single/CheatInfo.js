import React, {useEffect} from 'react'
import { FaHeart, FaShareAlt, FaHeartBroken } from 'react-icons/fa'
import FlexCheatItems from '../FlexCheatItems'
import Axios from 'axios'

function CheatInfo({loginState, dataUser, setDataUser, cheat, setModalOpen}) {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function addToFavorite(id) {
    Axios.post("https://cheatsheet-mysql.herokuapp.com/addFavorite", {
      cheatID: id,
    }).then((response) => {
        if (response.data !== false) {
          let temp = Object.values(dataUser);
          temp.push(id.toString())
          let obj = Object.assign({}, temp);
          setDataUser(obj)
        }
    });
  }

  function deleteFavorite(id) {
    Axios.post("https://cheatsheet-mysql.herokuapp.com/deleteFavorite", {
      cheatID: id,
    }).then((response) => {
      if (response.data !== false) {
        let temp = Object.values(dataUser);
        temp = temp.filter(function (element) {
          return element !== id.toString();
        });
        let filteredObj = Object.assign({}, temp);
        setDataUser(filteredObj);
      }
    });
  }

  function getElement(id) {
    let returnElement = (<></>)
    if (Object.values(dataUser).includes(id.toString())) {
      returnElement = (
        <button
          onClick={() => deleteFavorite(id)}
          className='bg-dry py-4 hover:bg-subMain transitions border-2 border-subMain rounded-full flex-rows gap-4 w-full sm:py-3'
        >
          <FaHeartBroken />
        </button>
      );
    } else {
      returnElement = (
        <button
          onClick={() => addToFavorite(id)}
          className='bg-subMain py-4 hover:bg-dry hover:border-subMain transitions border-2 border-dry rounded-full flex-rows gap-4 w-full sm:py-3'
        >
          <FaHeart />
        </button>
      );
    }

    return returnElement;
  }

  return (
    <div className='w-full xl:h-[calc(70vh)] relative text-white'>
      <img src={`/images/cheats/${cheat?.category}.jpg`} alt={cheat.title} className="w-full hidden xl:inline-block h-full object-cover" />

      <div className="xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0">
        <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8">
          <div className='xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden'>
            <img src={`/images/cheats/${cheat?.category}-AFFICHE.jpg`} alt={cheat.title} className="w-full h-full object-cover"/>
          </div>
          <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center">
            <div className="col-span-3 flex flex-col gap-10">
              {/* TITLE */}
              <h1 className="xl:text-4xl font-sans text-2xl font-bold">
                {cheat?.title}
              </h1>
              {/* FLEX ITEM */}
              <div className="flex items-center gap-4 font-medium text-dryGray">
                <div className="flex-colo bg-subMain text-xs px-2 py-1">
                  {cheat.language}
                </div>
                <FlexCheatItems cheat={cheat && cheat} />
              </div>
              {/* DESCRIPTION */}
              <p className="text-text text-sm leading-7">{cheat?.description}</p>
              <div className="grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg">
                {/* SHARE */}
                <div className="col-span-1 flex-colo border-r border-border">
                  <button onClick={() => setModalOpen(true)} className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20">
                    <FaShareAlt />
                  </button> 
                </div>
                {/* Review */}
                <div className="col-span-2 flex-colo font-medium text-sm">
                    <p>
                      Review : {" "}
                      <span className="ml-2 truncate">{cheat?.reviews ? cheat.reviews : 0}</span>
                    </p>
                </div>
                {/* Favorite */}
                <div className="sm:col-span-2 col-span-3 flex justify-end font-medium text-sm">
                  {/*<div className='bg-dry py-4 hover:bg-subMain transitions border-2 border-subMain rounded-full flex-rows gap-4 w-full sm:py-3'>
                    <FaHeart className='w-3 h-3'/> Favorite
                  </div>*/}
                  {loginState === true ?
                  getElement(cheat?.id)
                  :
                  <></>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CheatInfo
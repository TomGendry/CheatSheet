import React from 'react'
import { Link } from 'react-router-dom';
import {FaHeart,FaRegCalendarAlt, FaHeartBroken} from 'react-icons/fa'
import Axios from 'axios';

function Cheat({setDataUser, dataUser, loginState, cheat}) {

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
          className="h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-2 border-white rounded-md bg-gray-700 bg-opacity-30 text-subMain"
        >
          <FaHeartBroken />
        </button>
      );
    } else {
      returnElement = (
        <button
          onClick={() => addToFavorite(id)}
          className="h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-2 border-subMain rounded-md bg-subMain text-white"
        >
          <FaHeart />
        </button>
      );
    }

    return returnElement;
  }

  return (
    <>
      <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/cheat/${(cheat?.id)}`} className="w-full">
          <img src={`/images/cheats/SMALL${cheat?.category}.jpg`} alt={cheat?.title} className="w-full h-80 object-cover"/>
        </Link>
        <div className="absolute flex-btn gap-2 top-0 right-0 left-0 bg-black bg-opacity-60 text-white px-4 py-3">
          <h3 className="font-semibold">{cheat.title}</h3>
          
          {loginState === true ?
            getElement(cheat.id)
          :
          (<></>)
          }
        </div>
        <div className="absolute flex-btn2 bottom-0 left-0 bg-black bg-opacity-60 text-white px-4 py-3 w-full">
          <FaRegCalendarAlt className="text-subMain w-3 h-3" />
          <span className="text-sm font-medium px-2">{cheat.date}</span>
        </div>
      </div>
    </>
  )
}

export default Cheat;
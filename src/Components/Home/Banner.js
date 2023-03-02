import React from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import FlexCheatItems from "../FlexCheatItems";
import { Link } from "react-router-dom";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import Axios from "axios";

function Banner({ loginState, data, dataUser, setDataUser }) {

  function AddToFavorite(id) {
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
          className="bg-subMain hover:text-white transitions text-subMain px-8 py-3 rounded text-sm bg-opacity-30"
        >
          <FaHeartBroken />
        </button>
      );
    } else {
      returnElement = (
        <button
          onClick={() => AddToFavorite(id)}
          className="bg-white hover:text-subMain transitions text-white px-8 py-3 rounded text-sm bg-opacity-30"
        >
          <FaHeart />
        </button>
      );
    }

    return returnElement;
  }

  return (
    <div className="relative overflow-hidden w-full">
      <Swiper
        direction="vertical"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={1000}
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full xl:h-96 bg-dry lg:h-64 h-48"
      >
        {data.slice(0, 6).map((cheat, index) => (
          <SwiperSlide key={index} className="relative rounded overflow-hidden">
            <img
              src={`/images/cheats/${cheat.category}.jpg`}
              alt={cheat.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
              <h1 className="xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold">
                {cheat.title}
              </h1>
              <h2 className="xl:text-2sm font-sans sm:text-2sm text-sm font-normal max-w-md sm:block hidden">
                {cheat.description}
              </h2>
              <div className="flex gap-5 items-center text-dryGray">
                <FlexCheatItems cheat={cheat} />
              </div>
              <div className="flex gap-5 items-center">
                <Link
                  to={`/cheat/${cheat.id}`}
                  className="bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs"
                >
                  Cheat Now
                </Link>
                {loginState === true ? getElement(cheat.id) : <></>}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;

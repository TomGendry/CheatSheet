import React from 'react'
import Titles from '../Titles'
import {FaSkull} from 'react-icons/fa'
import Cheat from '../Cheat'

function LatestCheat({setDataUser, dataUser, loginState, data}) {
  
  return (
    <div className="my-16">
      <Titles title="Latesttrt Cheat" Icon={FaSkull} />
      <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.slice(0,8).map((cheat, index) => (
          <Cheat setDataUser={setDataUser} dataUser={dataUser} loginState={loginState} key={index} cheat={cheat}/>
        ))}
      </div>
    </div>
  )
}

export default LatestCheat
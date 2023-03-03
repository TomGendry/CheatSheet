import React from 'react'
import { useParams } from 'react-router-dom'
import CheatInfo from '../Components/Single/CheatInfo'
import CheatRate from '../Components/Single/CheatRate'
import CheatCore from '../Components/Single/CheatCore'
import Titles from '../Components/Titles'
import { BsCollectionFill } from 'react-icons/bs'
import ShareModal from '../Components/Modals/ShareModal'
import { useState, useEffect } from 'react'
import Axios from 'axios'

function SingleCheat({loginState, dataUser, setDataUser}) {
    const {id} = useParams()
    /*const RelatedCheats = Cheats.filter(
      (m) => m.categories === cheat.categories
    )*/
    const [modalOpen, setModalOpen] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null);

    function createError(phrase) {
      return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
          <p>{phrase}</p>
      </div>
    }
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await Axios.post('https://cheatsheet-mysql.herokuapp.com/getCheat', { id: id });
          setData(response.data[0]);
          setError(null);
        } catch (err) {
          setData(null)
          setError(createError(err));
        }
      };
      fetchData();
    }, [id]);


  return (
    <>
        {error}
        {data === null ?
        <>
          <ShareModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          cheat={data}
          />
          <CheatInfo loginState={loginState} dataUser={dataUser} setDataUser={setDataUser} cheat={data} setModalOpen={setModalOpen}/>
          <CheatCore cheat={data}/>
          <CheatRate cheat={data}/>
          <div className="my-16">
            <Titles title="Related Cheats" Icon={BsCollectionFill} />
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {
                      /*RelatedCheats.map((cheat, index) => (
                          <Cheat key={index} cheat={cheat} />
                      ))*/
                  }
              </div>
          </div>
        </>
        :
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
          <p>ERROR DATABASE</p>
        </div>  
      }
    </>
  )
}

export default SingleCheat
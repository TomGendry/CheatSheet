import React, {useState, useEffect} from 'react'
import Filters from './Filters'
import Cheat from '../Components/Cheat'
import { CgSpinner } from 'react-icons/cg'
import Axios from 'axios'

function CheatsPage() {

  const [data, setData] = useState([])
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('')
  const [resultNbr, setResultNbr] = useState(0)
  let arrayFiltered = []

  function createError(phrase) {
    return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
        <p>{phrase}</p>
    </div>
  }
  useEffect(() => {
    Axios.get('https://cheatsheet-mysql.herokuapp.com/getAllCheats')
    .then((response) => {
        if (response.data === false) {
            const temp = createError("Connection failed")
            setError(temp)
        } else {
            setData(response.data.cheats)
            setError("")
        }
    }).catch(err => setError(createError(err)))
  }, [])

    const maxPage = 10
    const [page, setPage] = useState(maxPage)
    const handleLoadingMore = () => {
        setPage(page + maxPage)
    }

    arrayFiltered = data.filter((cheat) => {
        let tempCat = false
        let tempRates = false

        if (search.category === 'All Categories') {
            tempCat = true   
        } else if (search.category === cheat.category) {
            tempCat = true
        }

        if (search.rates === "All Rates") {
            tempRates = true
        } else if ((parseFloat(search.rates.charAt(0)) < Math.ceil(cheat.rate)) && parseFloat(search.rates.charAt(0)) >= Math.floor(cheat.rate)) {
            tempRates = true
        }

        if (tempCat === true && tempRates === true) {
            return true
        }
        
    }).slice(0,page).map((cheat, index) => (
        <Cheat key={index} cheat={cheat} />
    ))

  return (
    <>    
        {error}    
        <div className="min-height-screen container mx-auto px-2 my-6">
            <Filters searchField={setSearch}/>
            <p className="text-lg font-medium my-6">
                Total <span className="font-bold text-subMain">{arrayFiltered.length}</span>{' '} items Found
            </p>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                {
                    arrayFiltered          
                }
            </div>
            {/* Loading More */}
            {data?.length >= maxPage && (
                <div className="w-full flex-colo md:my-20 my-10">
                    <button onClick={handleLoadingMore} className="flex-rows gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-subMain">
                        Loading More <CgSpinner className='animate-spin' />
                    </button>
                </div>
            )}
        </div>
    </>
  )
}

export default CheatsPage
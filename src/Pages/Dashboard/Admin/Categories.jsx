import React, { useEffect, useState } from 'react'
import TableCategories from '../../../Components/TableCategories'
import { HiPlusCircle } from 'react-icons/hi'
import CategoriesModal from '../../../Components/Modals/CategoriesModal'
import Axios from 'axios'

function Categories() {

  const [data, setData] = useState([])
  const [error, setError] = useState(null);

  function createError(phrase) {
    return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
        <p>{phrase}</p>
    </div>
  }

  useEffect(() => {
    Axios.get('https://cheatsheet-mysql.herokuapp.com/getAllCategories')
    .then((response) => {
        if (response.data == false) {
            const temp = createError("Connection failed")
            setError(temp)
        } else {
            setData(response.data)
        }
    }).catch(err => setError(createError(err)))
  }, [])

    const [modalOpen, setModalOpen] = useState(false)
    const [Category, setCategory] = useState();

    const OnEditFunction = (id) => {
        setCategory(id);
        setModalOpen(!modalOpen);
    }

    useEffect(() => {
        if (modalOpen === false) {
            setCategory();
        }
    }, [modalOpen])

    return (
        <>
            {error}
            <CategoriesModal modalOpen={modalOpen} setModalOpen={setModalOpen} category={Category}/>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className="text-xl font-bold">Categories List</h2>
                    <button
                    onClick={() => setModalOpen(true)}
                    className="bg-subMain flex-rows gap-4  font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded">
                        <HiPlusCircle /> Create
                    </button>
                </div>
                <TableCategories data={data} users={false} OnEditFunction={OnEditFunction}/>
            </div>
        </>
      )
}

export default Categories
import React, { useEffect, useState } from 'react'
import { Input, Select } from '../UsedInput'

function TitleModal({modifyData, setModifyData, coreData, setCoreData, setIsOpenTitleModal}) {

    const [title, setTitle] = useState(null)
    const [typeTitle, setTypeTitle] = useState("H1")
    const [isModify, setIsModify] = useState(false)
    const [saveModify, setSaveModify] = useState(null)

    const typeTitleList = [
        {
            title: "Title 1",
            value: "H1"
        },
        {
            title: "Title 2",
            value: "H2"
        },
        {
            title: "Title 3",
            value: "H3"
        }
    ]

    useEffect(() => {
        if (modifyData != null) {
            const data = coreData[modifyData];
            setTypeTitle(data.typeTitle)
            setTitle(data.title)
            setSaveModify(modifyData)
            setModifyData(null)
            setIsModify(true)
        }
    }, []);

    const handleCloseTitleModal = () => {
      setIsOpenTitleModal(false);
    };

    const modifyTitle = () => {
        setIsOpenTitleModal(false)
        const newData = [...coreData];
        newData[saveModify] = { type: "TITLE", typeTitle: typeTitle, title: title };
        setCoreData(newData);
    }

    const addTitle = () => {
        setIsOpenTitleModal(false)
        setCoreData([...coreData, { type: "TITLE", typeTitle: typeTitle, title: title }]);
      };

  return (
    <div className="absolute inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto bg-main text-white rounded-2xl">
          <div className="">
            <h2 className="text-3xl font-bold text-center mb-10">{(isModify === true) ? "Modify Title" : "Add Title"}</h2>
            <div className="w-full grid md:grid-cols-1 gap-6">
              <Select space={true} label="Select Title" options={typeTitleList} onChange={(e) => setTypeTitle(e.target.value)}/>
              <Input label={"Title"} placeholder={"This is a title"} type={"text"} onChange={(e) => setTitle(e.target.value)} value={title}/>
            </div>
          </div>
          <div className="w-full grid md:grid-cols-2 gap-6 mt-10">
            <button
              onClick={handleCloseTitleModal}
              className="flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
              Close
            </button>
            {(isModify === true) ? 
            <button
            onClick={modifyTitle}
            className="flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
                Modify Title
            </button> 
            : 
            <button
              onClick={addTitle}
              className="flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
              Add Title
            </button>
            }
          </div>
        </div>
  )
}

export default TitleModal
import React, { useEffect, useState } from 'react'
import { Message, Select } from '../UsedInput'

function TextModal({modifyData, setModifyData, coreData, setCoreData, setIsOpenTextModal}) {

    const [text, setText] = useState("")
    const [typeText, setTypeText] = useState("Classic")
    const [isModify, setIsModify] = useState(false)
    const [saveModify, setSaveModify] = useState(null)

    const typeTextList = [
        {
            title: "Classic",
            value: "Classic"
        },
        {
            title: "Citation",
            value: "Citation"
        },
        {
            title: "Code",
            value: "Code"
        }
    ]

    useEffect(() => {
        if (modifyData != null) {
            const data = coreData[modifyData];
            setTypeText(data.type)
            setText(data.text)
            setSaveModify(modifyData)
            setModifyData(null)
            setIsModify(true)
        }
    }, []);

    const handleCloseTextModal = () => {
      setIsOpenTextModal(false);
    };

    const modifyText = () => {
        setIsOpenTextModal(false)
        const newData = [...coreData];
        newData[saveModify] = { type: "TEXT", typeText: typeText, text: text };
        setCoreData(newData);
    }

    const addText = () => {
        setIsOpenTextModal(false)
        setCoreData([...coreData, { type: "TEXT", typeText: typeText, text: text }]);
      };

  return (
    <div className="absolute inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto bg-main text-white rounded-2xl">
          <div className="">
            <h2 className="text-3xl font-bold text-center mb-10">{(isModify === true) ? "Modify Text" : "Add Text"}</h2>
            <div className="w-full grid md:grid-cols-1 gap-6">
              <Select space={true} label="Select Text type" options={typeTextList} onChange={(e) => setTypeText(e.target.value)}/>
              <Message label={"Texte"} placeholder={"This is a text"} onChange={(e) => setText(e.target.value)} value={text}/>
            </div>
          </div>
          <div className="w-full grid md:grid-cols-2 gap-6 mt-10">
            <button
              onClick={handleCloseTextModal}
              className="flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
              Close
            </button>
            {(isModify === true) ? 
            <button
            onClick={modifyText}
            className="flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
                Modify Text
            </button> 
            : 
            <button
              onClick={addText}
              className="flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
              Add Text
            </button>
            }
          </div>
        </div>
  )
}

export default TextModal
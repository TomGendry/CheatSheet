import React, { useEffect, useState } from 'react'
import Uploader from '../Uploader'
import { Select } from '../UsedInput'

function ImageModal({modifyData, setModifyData, coreData, setCoreData, setIsOpenImageModal}) {

    const [image, setImage] = useState(null)
    const [isModify, setIsModify] = useState(false)
    const [saveModify, setSaveModify] = useState(null)
    const [typeImage, setTypeImage] = useState("Size 1")


    useEffect(() => {
        if (modifyData != null) {
            const data = coreData[modifyData];
            setImage(data.image)
            setSaveModify(modifyData)
            setModifyData(null)
            setIsModify(true)
            setTypeImage(data.typeImage)
        }
    }, []);

    const handleCloseImageModal = () => {
      setIsOpenImageModal(false);
    };

    const modifyImage = () => {
        setIsOpenImageModal(false)
        const newData = [...coreData];
        newData[saveModify] = { type: "IMAGE", typeImage: typeImage, image: image };
        setCoreData(newData);
    }

    const addImage = () => {
        setIsOpenImageModal(false)
        setCoreData([...coreData, { type: "IMAGE", typeImage: typeImage, image: image }]);
      };

      const typeImageList = [
        {
            title: "Size 1",
            value: "Size 1"
        },
        {
            title: "Size 2",
            value: "Size 2"
        },
        {
            title: "Size 3",
            value: "Size 3"
        }
    ]

  return (
    <div className="absolute inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto bg-main text-white rounded-2xl">
          <div className="">
            <h2 className="text-3xl font-bold text-center mb-10">{(isModify === true) ? "Modify Image" : "Add Image"}</h2>
            <div className="w-full grid md:grid-cols-1 gap-6">
              <Select space={true} label="Select Image type" options={typeImageList} onChange={(e) => setTypeImage(e.target.value)}/>
              <Uploader file={image} setFile={setImage} setIsOpenImageModal={setIsOpenImageModal} />
            </div>
          </div>
          <div className="w-full grid md:grid-cols-2 gap-6 mt-10">
            <button
              onClick={handleCloseImageModal}
              className="flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
              Close
            </button>
            {(isModify === true) ? 
            <button
            onClick={modifyImage}
            className="flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
                Modify Image
            </button> 
            : 
            <button
              onClick={addImage}
              className="flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
              Add Image
            </button>
            }
          </div>
        </div>
  )
}

export default ImageModal
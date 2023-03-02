import React, { useEffect } from 'react'
import {ImUpload} from 'react-icons/im'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Axios from "axios";
import axios from "axios";
import TableModal from "../../../Components/Modals/TableModal";
import {BiUpArrowAlt, BiDownArrowAlt} from 'react-icons/bi'
import {RxDoubleArrowUp, RxDoubleArrowDown} from 'react-icons/rx'
import TitleModal from "../../../Components/Modals/TitleModal";
import TextModal from "../../../Components/Modals/TextModal";
import ListModal from "../../../Components/Modals/ListModal";
import ImageModal from "../../../Components/Modals/ImageModal";
import { Input, Select } from "../../../Components/UsedInput";

function ModifyCheat() {
  
  const navigate = useNavigate()
  const location = useLocation()
  const [title, setTitle] = useState("")
  const [language, setLanguage] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [coreData, setCoreData] = useState([]);
  const [error, setError] = useState("");
  const [categoryList, setCategoryList] = useState([])
  const [isOpenTableModal, setIsOpenTableModal] = useState(false);
  const [isOpenTitleModal, setIsOpenTitleModal] = useState(false);
  const [isOpenTextModal, setIsOpenTextModal] = useState(false);
  const [isOpenListModal, setIsOpenListModal] = useState(false);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [modifyData, setModifyData] = useState(null)
  const [goUp,setGoUp] = useState(null)
  const [goDown,setGoDown] = useState(null)
  const [direction,setDirection] = useState(null)

  useEffect(() => {
    
    if (location.state === null) {
        navigate("/dashboard")
    } else {
        setTitle(location.state.title)
        setLanguage(location.state.language)
        setCategory(location.state.category)
        setDescription(location.state.description)
        let temp = atob(location.state.core)
        let splitData = temp.split("|-|");
        splitData.shift();
        const newData = splitData.map((element) => {
            let splidDataElement = element.split("|:|");
            if (splidDataElement[0] === "TITLE") {
                return { type: "TITLE", typeTitle: splidDataElement[1], title: splidDataElement[2]};
            } else if (splidDataElement[0] === "TEXT") {
                return { type: "TEXT", typeText: splidDataElement[1], text: splidDataElement[2]};
            } else if (splidDataElement[0] === "LIST" || splidDataElement[0] === "TABLE") {
                return JSON.parse(splidDataElement[1])
            } else if (splidDataElement[0] === "IMAGE") {

            }
        });
        setCoreData(newData)
        Axios.get('https://cheatsheet-mysql.herokuapp.com/getAllCategories')
        .then((response) => {
            if (response.data !== false) {
                setCategoryList(categoryList.concat(
                    response.data.map((item, index) => ({ title: item.title, value: item.title }))
                ));
            }
        })
        
    }
  }, []);

  const handleOpenTableModal = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    setIsOpenTableModal(true);
  };

  const handleOpenTitleModal = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    setIsOpenTitleModal(true);
  };

  const handleOpenTextModal = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    setIsOpenTextModal(true);
  };

  const handleOpenListModal = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    setIsOpenListModal(true);
  };

  const handleOpenImageModal = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    setIsOpenImageModal(true);
  };

  function upElement(index) {
    if (index !== 0) {
        const newData = [...coreData];
        const saveDataCurrent = newData[index]
        const saveDataUp = newData[index - 1]
        newData[index - 1] = saveDataCurrent
        newData[index] = saveDataUp
        setGoUp(index - 1)
        setGoDown(index)
        setCoreData(newData);
        setDirection(true)
    }
  }

  function downElement(index) {
    if (index !== Object.keys(coreData).length - 1) {
        const newData = [...coreData];
        const saveDataCurrent = newData[index]
        const saveDataUp = newData[index + 1]
        newData[index + 1] = saveDataCurrent
        newData[index] = saveDataUp
        setGoDown(index + 1)
        setGoUp(index)
        setCoreData(newData);
        setDirection(false)
    }
  }

  function modifyElement(index, type) {
    setModifyData(index)
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    if (type === "TABLE") {
        setIsOpenTableModal(true)
    } else if (type === "TITLE") {
        setIsOpenTitleModal(true)
    } else if (type === "TEXT") {
        setIsOpenTextModal(true)
    } else if (type === "LIST") {
        setIsOpenListModal(true)
    } else if (type === "IMAGE") {
      setIsOpenImageModal(true)
    }
  }

  function deleteElement(index) {
    const newArray = coreData.filter((item, indexFilter) => indexFilter !== index);
    setCoreData(newArray);
  }

  const typeLanguageList = [
    {
        title: "English",
        value: "English"
    },
    {
        title: "French",
        value: "French"
    }
  ]

  function createError(phrase) {
    return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
        <p>{phrase}</p>
    </div>
  }

  function createSuccess(phrase) {
    return <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 w-full" role="alert">
        <p>{phrase}</p>
    </div>
  }

  const submitModifyPage = async () => {
    
    let finalToBase64 = "";
  
    const promises = coreData.map(async (item) => {
      if (item) {
        if (item.type === "TABLE" || item.type === "LIST") {
          let temp = JSON.stringify(item);
          finalToBase64 = finalToBase64 + "|-|" + item.type + "|:|" + temp;
        } else if (item.type === "TITLE" || item.type === "TEXT") {
          let temp = "|-|" + item.type + "|:|" + (item.typeTitle ? item.typeTitle : item.typeText) + "|:|" + (item.title ? item.title : item.text);
          finalToBase64 = finalToBase64 + temp;
        } else if (item.type === "IMAGE") {
          const file = item.image;
          const formData = new FormData();
          formData.append('file', file);
    
          const response = await axios.post('https://cheatsheet-mysql.herokuapp.com/upload', formData);
          if (response.data !== false) {
            let temp = "|-|" + item.type + "|:|" + item.typeImage + "|:|" + response.data;
            finalToBase64 = finalToBase64 + temp;
          }
        }
      }
    });
  
    await Promise.all(promises);
    
    axios.post('https://cheatsheet-mysql.herokuapp.com/modifyCheat',{
        id: location.state.id,
        title: title,
        description: description,
        language: language,
        category: category,
        core: btoa(finalToBase64)
    }).then(() => {
        setTitle("")
        setDescription("")
        setCategory("")
        setCoreData([])
        setModifyData(null)
        navigate("/cheatslist")
    }).error(() => {
      setError(createError("ERROR WHILE MODIFYING !"))
    })

  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">Modify Cheat</h2>
      {error}
        <div className="w-full grid md:grid-cols-2 gap-6">
            <Input label={"Title"} placeholder={title} type={"text"} onChange={(e) => setTitle(e.target.value)} value={title || ""}/>
            <Input label={"Description"} placeholder={description} type={"text"} onChange={(e) => setDescription(e.target.value)} value={description || ""}/>
            <Select space={false} label="Select Language" options={typeLanguageList} onChange={(e) => setLanguage(e.target.value)}/>
            <Select space={false} label="Select Category" options={categoryList} onChange={(e) => setCategory(e.target.value)}/>
        </div>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <button
            onClick={handleOpenTableModal}
            className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded"
          >
            Add a Table
          </button>
          <button
            onClick={handleOpenTitleModal}
            className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded"
          >
            Add a Title
          </button>
          <button
            onClick={handleOpenTextModal}
            className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded"
          >
            Add a Text
          </button>
          <button
            onClick={handleOpenListModal}
            className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded"
          >
            Add a List
          </button>
        </div>
        <button
            onClick={handleOpenImageModal}
            className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded"
          >
            Add an Image
          </button>
      <div className="w-full mt-2 p-6 border bg-main border-border rounded">
        {coreData && (
            coreData.map((data, index) => {
                if(data?.type === "TABLE") {
                    return <div key={index} className={`mt-3 rounded py-3 text-center text-dry bg-dryGray`}>
                        <div>
                            {(goDown === index) &&
                            (
                                (direction === true) ? 
                                <RxDoubleArrowDown className="w-6 h-6 text-subMain"/>
                                : 
                                <RxDoubleArrowDown className="w-6 h-6 text-green-500"/> 
                            )}
                            
                            {(goUp === index) &&
                            (
                                (direction === true) ? 
                                <RxDoubleArrowUp className="w-6 h-6 text-green-500"/>
                                : 
                                <RxDoubleArrowUp className="w-6 h-6 text-subMain"/> 
                            )}
                            <span>Element {index} : TABLE <button onClick={() => modifyElement(index, "TABLE")} className="bg-dry rounded ml-3 p-3 text-white">Modify</button><button onClick={() => deleteElement(index)} className="bg-subMain rounded ml-3 p-3 text-white">Delete</button></span>
                            <span className="float-right mr-3 mt-1">
                                <div className="flex flex-col justify-between">
                                    {(index !== 0) && <BiUpArrowAlt onClick={() => upElement(index)} className="w-5 h-5 cursor-pointer hover:text-subMain"/>}
                                    {(index !== Object.keys(coreData).length - 1) && <BiDownArrowAlt onClick={() => downElement(index)} className="w-5 h-5 cursor-pointer hover:text-subMain"/>}
                                </div>
                            </span>
                        </div>
                    </div>
                    
                } else if (data?.type === "TITLE") {
                    let bg = null;
                    if (data?.typeTitle === "H1") {
                        bg = "bg-red-300"
                    } else if (data?.typeTitle === "H2") {
                        bg = "bg-green-300"
                    } else if (data?.typeTitle === "H3") {
                        bg = "bg-yellow-300"
                    }

                    return <div key={index} className={`mt-3 rounded py-3 text-center text-dry ${bg}`}>
                        <div>
                            {(goDown === index) &&
                            (
                                (direction === true) ? 
                                <RxDoubleArrowDown className="w-6 h-6 text-subMain"/>
                                : 
                                <RxDoubleArrowDown className="w-6 h-6 text-green-500"/> 
                            )}
                            
                            {(goUp === index) &&
                            (
                                (direction === true) ? 
                                <RxDoubleArrowUp className="w-6 h-6 text-green-500"/>
                                : 
                                <RxDoubleArrowUp className="w-6 h-6 text-subMain"/> 
                            )}
                            <span>Element {index} : TITLE {data?.typeTitle}<button onClick={() => modifyElement(index, "TITLE")} className="bg-dry rounded ml-3 p-3 text-white">Modify</button><button onClick={() => deleteElement(index)} className="bg-subMain rounded ml-3 p-3 text-white">Delete</button></span>
                            <span className="float-right mr-3 mt-1">
                                <div className="flex flex-col justify-between">
                                    {(index !== 0) && <BiUpArrowAlt onClick={() => upElement(index)} className="w-5 h-5 cursor-pointer hover:text-subMain"/>}
                                    {(index !== Object.keys(coreData).length - 1) && <BiDownArrowAlt onClick={() => downElement(index)} className="w-5 h-5 cursor-pointer hover:text-subMain"/>}
                                </div>
                            </span>
                        </div>
                    </div>
                } else if (data?.type === "TEXT") {
                    let bg = null;
                    if (data?.typeText === "Classic") {
                        bg = "bg-gray-400"
                    } else if (data?.typeText === "Citation") {
                        bg = "bg-cyan-700"
                    } else if (data?.typeText === "Code") {
                        bg = "bg-neutral-700"
                    }

                    return <div key={index} className={`mt-3 rounded py-3 text-center text-dry ${bg}`}>
                        <div>
                            {(goUp === index) &&
                            (
                                (direction === true) ? 
                                <RxDoubleArrowDown className="w-6 h-6 text-subMain"/>
                                : 
                                <RxDoubleArrowDown className="w-6 h-6 text-green-500"/> 
                            )}
                            
                            {(goDown === index) &&
                            (
                                (direction === true) ? 
                                <RxDoubleArrowUp className="w-6 h-6 text-green-500"/>
                                : 
                                <RxDoubleArrowUp className="w-6 h-6 text-subMain"/> 
                            )}
                            <span>Element {index} : TEXT {data?.typeText}<button onClick={() => modifyElement(index, "TEXT")} className="bg-dry rounded ml-3 p-3 text-white">Modify</button><button onClick={() => deleteElement(index)} className="bg-subMain rounded ml-3 p-3 text-white">Delete</button></span>
                            <span className="float-right mr-3 mt-1">
                                <div className="flex flex-col justify-between">
                                    {(index !== 0) && <BiUpArrowAlt onClick={() => upElement(index)} className="w-5 h-5 cursor-pointer hover:text-subMain"/>}
                                    {(index !== Object.keys(coreData).length - 1) && <BiDownArrowAlt onClick={() => downElement(index)} className="w-5 h-5 cursor-pointer hover:text-subMain"/>}
                                </div>
                            </span>
                        </div>
                    </div>
                } else if (data?.type === "LIST") {
                    let bg = null;
                    if (data?.typeList === "POINT") {
                        bg = "bg-indigo-500"
                    } else if (data?.typeList === "NUMBER") {
                        bg = "bg-rose-400"
                    }

                    return <div key={index} className={`mt-3 rounded py-3 text-center text-dry ${bg}`}>
                        <div>
                            {(goUp === index) &&
                            (
                                (direction === true) ? 
                                <RxDoubleArrowDown className="w-6 h-6 text-subMain"/>
                                : 
                                <RxDoubleArrowDown className="w-6 h-6 text-green-500"/> 
                            )}
                            
                            {(goDown === index) &&
                            (
                                (direction === true) ? 
                                <RxDoubleArrowUp className="w-6 h-6 text-green-500"/>
                                : 
                                <RxDoubleArrowUp className="w-6 h-6 text-subMain"/> 
                            )}
                            <span>Element {index} : LIST {data?.typeList}<button onClick={() => modifyElement(index, "LIST")} className="bg-dry rounded ml-3 p-3 text-white">Modify</button><button onClick={() => deleteElement(index)} className="bg-subMain rounded ml-3 p-3 text-white">Delete</button></span>
                            <span className="float-right mr-3 mt-1">
                                <div className="flex flex-col justify-between">
                                    {(index !== 0) && <BiUpArrowAlt onClick={() => upElement(index)} className="w-5 h-5 cursor-pointer hover:text-subMain"/>}
                                    {(index !== Object.keys(coreData).length - 1) && <BiDownArrowAlt onClick={() => downElement(index)} className="w-5 h-5 cursor-pointer hover:text-subMain"/>}
                                </div>
                            </span>
                        </div>
                    </div>
                } else if (data?.type === "LIST") {
                    let bg = null;
                    if (data?.typeList === "POINT") {
                        bg = "bg-indigo-500"
                    } else if (data?.typeList === "NUMBER") {
                        bg = "bg-rose-400"
                    }

                    return <div key={index} className={`mt-3 rounded py-3 text-center text-dry ${bg}`}>
                        <div>
                            {(goUp === index) &&
                            (
                                (direction === true) ? 
                                <RxDoubleArrowDown className="w-6 h-6 text-subMain"/>
                                : 
                                <RxDoubleArrowDown className="w-6 h-6 text-green-500"/> 
                            )}
                            
                            {(goDown === index) &&
                            (
                                (direction === true) ? 
                                <RxDoubleArrowUp className="w-6 h-6 text-green-500"/>
                                : 
                                <RxDoubleArrowUp className="w-6 h-6 text-subMain"/> 
                            )}
                            <span>Element {index} : LIST {data?.typeList}<button onClick={() => modifyElement(index, "LIST")} className="bg-dry rounded ml-3 p-3 text-white">Modify</button><button onClick={() => deleteElement(index)} className="bg-subMain rounded ml-3 p-3 text-white">Delete</button></span>
                            <span className="float-right mr-3 mt-1">
                                <div className="flex flex-col justify-between">
                                    {(index !== 0) && <BiUpArrowAlt onClick={() => upElement(index)} className="w-5 h-5 cursor-pointer hover:text-subMain"/>}
                                    {(index !== Object.keys(coreData).length - 1) && <BiDownArrowAlt onClick={() => downElement(index)} className="w-5 h-5 cursor-pointer hover:text-subMain"/>}
                                </div>
                            </span>
                        </div>
                    </div>
                }else if (data?.type === "IMAGE") {

                  return <div key={index} className={`mt-3 rounded py-3 text-center text-dry bg-lime-300`}>
                      <div>
                          {(goUp === index) &&
                          (
                              (direction === true) ? 
                              <RxDoubleArrowDown className="w-6 h-6 text-subMain"/>
                              : 
                              <RxDoubleArrowDown className="w-6 h-6 text-green-500"/> 
                          )}
                          
                          {(goDown === index) &&
                          (
                              (direction === true) ? 
                              <RxDoubleArrowUp className="w-6 h-6 text-green-500"/>
                              : 
                              <RxDoubleArrowUp className="w-6 h-6 text-subMain"/> 
                          )}
                          <span>Element {index} : IMAGE {data?.image.type}<button onClick={() => modifyElement(index, "IMAGE")} className="bg-dry rounded ml-3 p-3 text-white">Modify</button><button onClick={() => deleteElement(index)} className="bg-subMain rounded ml-3 p-3 text-white">Delete</button></span>
                          <img className="mx-auto h-20 w-auto" src={URL.createObjectURL(data?.image)} alt={data?.image.name} />
                          <span>{data?.image.name}</span>
                          <span className="float-right mr-3 mt-1">
                              <div className="flex flex-col justify-between">
                                  {(index !== 0) && <BiUpArrowAlt onClick={() => upElement(index)} className="w-5 h-5 cursor-pointer hover:text-subMain"/>}
                                  {(index !== Object.keys(coreData).length - 1) && <BiDownArrowAlt onClick={() => downElement(index)} className="w-5 h-5 cursor-pointer hover:text-subMain"/>}
                              </div>
                          </span>
                      </div>
                  </div>
              }
            } )
        )}
        
      </div>
      {Object.keys(coreData).length > 0 && (
        <button
        onClick={submitModifyPage}
        className="bg-star font-medium transitions hover:bg-main border border-star text-white py-3 px-6 rounded"
      >
        Submit new Cheat
  </button>
      )}
      {isOpenTableModal && (
        <TableModal modifyData={modifyData} setModifyData={setModifyData} coreData={coreData} setCoreData={setCoreData} setIsOpenTableModal={setIsOpenTableModal}/>
      )}
      {
        isOpenTitleModal && (
            <TitleModal modifyData={modifyData} setModifyData={setModifyData} coreData={coreData} setCoreData={setCoreData} setIsOpenTitleModal={setIsOpenTitleModal}/>
        )
      }
      {
        isOpenTextModal && (
            <TextModal modifyData={modifyData} setModifyData={setModifyData} coreData={coreData} setCoreData={setCoreData} setIsOpenTextModal={setIsOpenTextModal}/>
        )
      }
      {
        isOpenListModal && (
            <ListModal modifyData={modifyData} setModifyData={setModifyData} coreData={coreData} setCoreData={setCoreData} setIsOpenListModal={setIsOpenListModal}/>
        )
      }
      {
        isOpenImageModal && (
            <ImageModal modifyData={modifyData} setModifyData={setModifyData} coreData={coreData} setCoreData={setCoreData} setIsOpenImageModal={setIsOpenImageModal}/>
        )
      }
    </div>
  );
}

export default ModifyCheat
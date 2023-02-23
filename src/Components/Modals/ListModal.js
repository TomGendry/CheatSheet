import React, { useEffect, useState } from 'react'
import CustomCell from '../CustomCell';
import { Select } from '../UsedInput';

function ListModal({modifyData, setModifyData, coreData, setCoreData, setIsOpenListModal}) {

    const [dataRow, setDataRow] = useState({0: "LIST " + 0})
    const [typeList, setTypeList] = useState("POINT")
    const [isModify, setIsModify] = useState(false)
    const [saveModify, setSaveModify] = useState(null)
    const [rowNBR, setRowNBR] = useState(1)

    const typeListList = [
      {
          title: "POINT",
          value: "POINT"
      },
      {
          title: "NUMBER",
          value: "NUMBER"
      }
  ]

    useEffect(() => {
        if (modifyData != null) {
            const data = coreData[modifyData];
            setDataRow(data.dataRow)
            setSaveModify(modifyData)
            setModifyData(null)
            setIsModify(true)
        }
    }, []);

    const handleCloseListModal = () => {
      setIsOpenListModal(false);
    };

    const modifyList = () => {
        setIsOpenListModal(false)
        const newData = [...coreData];
        newData[saveModify] = { type: "LIST", typeList: typeList, dataRow: dataRow };
        setCoreData(newData);
    }

    const addList = () => {
        setIsOpenListModal(false)
        setCoreData([...coreData, { type: "LIST", typeList: typeList, dataRow: dataRow }]);
      };
  
    const handleClickListRow = (event, state) => {
      event.preventDefault();
      if (state === true) {
        setDataRow(
            prevState => {
                const newDataRow = {...prevState}
                let tempSize = rowNBR
                newDataRow[tempSize] = "LIST " + tempSize
                return newDataRow
            }
        )
        setRowNBR(rowNBR + 1)
      } else {
        if (rowNBR > 1) {
          setRowNBR(rowNBR - 1);
        }
      }
    };

  return (
    <div className="absolute inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto bg-main text-white rounded-2xl">
          <div className="">
            <h2 className="text-3xl font-bold text-center mb-10">{(isModify === true) ? "Modify List" : "Add List"}</h2>
            <div className="w-full grid md:grid-cols-2 gap-6 mb-3">
              <button
                onClick={(e) => handleClickListRow(e, true)}
                className="bg-dry py-3 border border-subMain hover:bg-subMain rounded"
              >
                Add row
              </button>
              <button
                onClick={(e) => handleClickListRow(e, false)}
                className="bg-dry py-3 border border-subMain hover:bg-subMain rounded"
              >
                Remove row
              </button>
            </div>
            <Select label="Select List type" options={typeListList} onChange={(e) => setTypeList(e.target.value)}/>
            <table className="table-auto w-full text-left mt-5">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                  LIST
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rowNBR }, (_, i) => (
                  <tr className="bg-gray-800 border-gray-700">
                    <CustomCell key={`${i}`} value={dataRow[`${i}`]} setData={setDataRow} data={dataRow} val={`${i}`}/>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full grid md:grid-cols-2 gap-6 mt-10">
            <button
              onClick={handleCloseListModal}
              className="flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
              Close
            </button>
            {(isModify === true) ? 
            <button
            onClick={modifyList}
            className="flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
                Modify List
            </button> 
            : 
            <button
              onClick={addList}
              className="flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
              Add List
            </button>
            }
          </div>
        </div>
  )
}

export default ListModal
import React, { useEffect, useState } from 'react'
import CustomCell from '../CustomCell';

function TableModal({modifyData, setModifyData, coreData, setCoreData, setIsOpenTableModal}) {

    const [rowNBR, setRowNBR] = useState(1);
    const [colNBR, setColNBR] = useState(1);
    const [dataRow, setDataRow] = useState({'0-0': "ROW 0-0"})
    const [dataCol, setDataCol] = useState({0: "COL " + 0})
    const [isModify, setIsModify] = useState(false)
    const [saveModify, setSaveModify] = useState(null)

    useEffect(() => {
        if (modifyData != null) {
            const data = coreData[modifyData];
            setDataRow(data.dataRow)
            setDataCol(data.dataCol)
            setColNBR(data.colNBR)
            setRowNBR(data.rowNBR)
            setSaveModify(modifyData)
            setModifyData(null)
            setIsModify(true)
        }
    }, []);

    const handleCloseTableModal = () => {
      setIsOpenTableModal(false);
    };

    const modifyTable = () => {
        setIsOpenTableModal(false)
        const newData = [...coreData];
        newData[saveModify] = { type: "TABLE", dataCol: dataCol, dataRow: dataRow, colNBR: colNBR, rowNBR: rowNBR };
        setCoreData(newData);
    }

    const addTable = () => {
        setIsOpenTableModal(false)
        setCoreData([...coreData, { type: "TABLE", dataCol: dataCol, dataRow: dataRow, colNBR: colNBR, rowNBR: rowNBR }]);
      };
  
    const handleClickTableCol = (event, state) => {
      event.preventDefault();
      if (state === true) {
        setColNBR(colNBR + 1);
        const size = Object.keys(dataCol).length
        setDataCol({...dataCol, [size]: "COL " + size})
        setDataRow(
            prevState => {
                const newDataRow = {...prevState}
                for (let i = 0; i < rowNBR; i++) {
                    let tempSize = `${i}-${size}`
                    newDataRow[tempSize] = "ROW " + tempSize
                }
                return newDataRow
            }
        )
      } else {
        if (colNBR > 1) {
          setColNBR(colNBR - 1);
        }
      }
    };
  
    const handleClickTableRow = (event, state) => {
      event.preventDefault();
      if (state === true) {
        setDataRow(
            prevState => {
                const newDataRow = {...prevState}
                for (let j = 0; j < colNBR; j++) {
                    let tempSize = `${rowNBR}-${j}`
                    newDataRow[tempSize] = "ROW " + tempSize
                }
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
            <h2 className="text-3xl font-bold text-center mb-10">{(isModify === true) ? "Modify Table" : "Add Table"}</h2>
            <div className="w-full grid md:grid-cols-2 gap-6">
              <button
                onClick={(e) => handleClickTableCol(e, true)}
                className="bg-dry py-3 border border-subMain hover:bg-subMain rounded"
              >
                Add column
              </button>
              <button
                onClick={(e) => handleClickTableRow(e, true)}
                className="bg-dry py-3 border border-subMain hover:bg-subMain rounded"
              >
                Add row
              </button>
            </div>
            <div className="w-full grid md:grid-cols-2 gap-6 mt-3">
              <button
                onClick={(e) => handleClickTableCol(e, false)}
                className="bg-dry py-3 border border-subMain hover:bg-subMain rounded"
              >
                Remove column
              </button>
              <button
                onClick={(e) => handleClickTableRow(e, false)}
                className="bg-dry py-3 border border-subMain hover:bg-subMain rounded"
              >
                Remove row
              </button>
            </div>
            <table className="table-auto w-full text-left mt-5">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                  {Array.from({ length: colNBR }, (_, i) => (
                    <CustomCell key={i} value={dataCol[i]} setData={setDataCol} data={dataCol} val={i}/>                  
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rowNBR }, (_, i) => (
                  <tr className="bg-gray-800 border-gray-700">
                    {Array.from({ length: colNBR }, (_, i2) => (
                      <CustomCell key={`${i}-${i2}`} value={dataRow[`${i}-${i2}`]} setData={setDataRow} data={dataRow} val={`${i}-${i2}`}/>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full grid md:grid-cols-2 gap-6 mt-10">
            <button
              onClick={handleCloseTableModal}
              className="flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
              Close
            </button>
            {(isModify === true) ? 
            <button
            onClick={modifyTable}
            className="flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
                Modify Table
            </button> 
            : 
            <button
              onClick={addTable}
              className="flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
            >
              Add Table
            </button>
            }
          </div>
        </div>
  )
}

export default TableModal
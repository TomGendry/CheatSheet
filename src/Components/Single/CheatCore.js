import React, { useEffect, useState } from 'react'
import {RiDoubleQuotesL, RiDoubleQuotesR} from 'react-icons/ri'

function CheatCore({ cheat }) {
  const [coreData, setCoreData] = useState([]);

  useEffect(() => {
    let temp = "";
    if (typeof cheat.core === "undefined") {
      temp = "";
    } else {
      temp = atob(cheat.core);
      let splitData = temp.split("|-|");
      splitData.shift();
      console.log("DATA", newData)
      const newData = splitData.map((element, index) => {
        let splidDataElement = element.split("|:|");
        console.log(splidDataElement)
        if (splidDataElement[0] === "TITLE") {
          if (splidDataElement[1] === "H1") {
            return <h1 key={index} className="xl:text-4xl truncate font-sans sm:text-2xl text-2xl font-bold my-4">{splidDataElement[2]}</h1>;
          } else if (splidDataElement[1] === "H2") {
            return <h2 key={index} className="xl:text-3xl truncate font-sans sm:text-1xl text-xm my-3">{splidDataElement[2]}</h2>;
          } else if (splidDataElement[1] === "H3") {
            return <h3 key={index} className="xl:text-2xl truncate font-sans sm:text-xl text-lg my-2">{splidDataElement[2]}</h3>;
          } 
        } else if (splidDataElement[0] === "LIST") {
          let tempList = JSON.parse(splidDataElement[1])
          let typeList = tempList.typeList
          let dataRow = Object.values(tempList.dataRow)
          const listAsLI = dataRow.map((itemList) => {
            return <li>{itemList}</li>
          })
          if (typeList === "POINT") {
            return <ul key={index} className='my-2 ml-4 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400'>{listAsLI}</ul>
          } else if (typeList === "NUMBER"){
            return <ul key={index} className='my-2 ml-4 max-w-md space-y-1 list-decimal text-gray-500 list-disc list-inside dark:text-gray-400'>{listAsLI}</ul>
          }
        } else if (splidDataElement[0] === "TABLE") {
          let tempTable = JSON.parse(splidDataElement[1])
          let dataCol = Object.values(tempTable.dataCol)
          
          return <div key={index} className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {dataCol.map((element, index) => {
                    return <th key={index} scope="col" className="px-6 py-3 text-white">
                      {element}
                    </th>
                  })}
                </tr>
              </thead>
              <tbody>
              {Object.entries(tempTable.dataRow).reduce((rows, [key, value]) => {
                const [row, col] = key.split("-");
                rows[row] = rows[row] || {};
                rows[row][col] = value;
                return rows;
              }, []).map((row, rowIndex) => (
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={rowIndex}>
                  {Array.from({ length: Object.keys(row).length }).map((_, colIndex) => (
                    <td scope='row' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" key={colIndex}>{row[colIndex] || ""}</td>
                  ))}
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        } else if (splidDataElement[0] === "TEXT") {
          if (splidDataElement[1] === "Classic") {
            return <p key={index} className='font-normal text-white '>{splidDataElement[2]}</p>
          } else if (splidDataElement[1] === "Citation") {
            return <p key={index} className='relative italic font-normal text-white mx-5 my-3'><RiDoubleQuotesL className='mb-3'/>{splidDataElement[2]}<RiDoubleQuotesR className='mt-3'/></p>
          } else if (splidDataElement[1] === "Code") {
            return <p key={index} className='font-normal text-white mx-3 bg-code p-3 rounded'>{splidDataElement[2]}</p>
          } 
        } else if (splidDataElement[0] === "IMAGE") {
          if (splidDataElement[1] === "Size 1") { 
             return <img key={index} src={splidDataElement[2]} className="h-auto w-72" alt="Image" />
          } else if (splidDataElement[1] === "Size 2") {
            return <img key={index} src={splidDataElement[2]} className="h-auto w-60" alt="Image" />           
          } else if (splidDataElement[1] === "Size 3") {
            return <img key={index} src={splidDataElement[2]} className="h-auto w-48" alt="Image" />            
          } else {
            return <img key={index} src={splidDataElement[2]} className="h-auto w-52" alt="Image" />
          }
        }
        return null;
      });
      setCoreData(newData);

      /** ASYNC AWAIT */


    }
  }, [])

  return (
    <div className="container mx-auto min-h-screen px-2 my-6">
      {coreData}
    </div>
  );
}

export default CheatCore;
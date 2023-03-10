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
      const newData = [];
      for (const element of splitData) {
        let splidDataElement = element.split("|:|");
        let result = null;

        if (splidDataElement[0] === "TITLE") {
          if (splidDataElement[1] === "H1") {
            result = <h1 className="xl:text-4xl truncate font-sans sm:text-2xl text-2xl font-bold my-4">{splidDataElement[2]}</h1>;
          } else if (splidDataElement[1] === "H2") {
            result = <h2 className="xl:text-3xl truncate font-sans sm:text-1xl text-xm my-3">{splidDataElement[2]}</h2>;
          } else if (splidDataElement[1] === "H3") {
            result = <h3 className="xl:text-2xl truncate font-sans sm:text-xl text-lg my-2">{splidDataElement[2]}</h3>;
          } 
        } else if (splidDataElement[0] === "LIST") {
          let tempList = JSON.parse(splidDataElement[1])
          let typeList = tempList.typeList
          let dataRow = Object.values(tempList.dataRow)
          const listAsLI = dataRow.map((itemList) => {
            return <li>{itemList}</li>
          })
          if (typeList === "POINT") {
            result = <ul className='my-2 ml-4 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400'>{listAsLI}</ul>
          } else if (typeList === "NUMBER"){
            result = <ul className='my-2 ml-4 max-w-md space-y-1 list-decimal text-gray-500 list-inside dark:text-gray-400'>{listAsLI}</ul>
          }
        } else if (splidDataElement[0] === "TABLE") {
          let tempTable = JSON.parse(splidDataElement[1])
          let dataCol = Object.values(tempTable.dataCol)
          
          result = <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            result = <p className='font-normal text-white text-justify'>{'\t' + splidDataElement[2]}</p>
          } else if (splidDataElement[1] === "Citation") {
            result = <p className='relative italic font-normal text-white mx-5 my-3'><RiDoubleQuotesL className='mb-3'/>{splidDataElement[2]}<RiDoubleQuotesR className='mt-3'/></p>
          } else if (splidDataElement[1] === "Code") {
            let codeSplit = splidDataElement[2].split(" ")
            let final = []
            for (let i = 0; i < codeSplit.length; i++) {
              const word = codeSplit[i];

              if (word.endsWith(".py")) {
                final.push(<span style={{color: "#27ae60"}}>{word}</span>)
              } else if (word.startsWith("-")) {
                final.push(<span style={{color: "#9b59b6"}}>{word}</span>)
              } else if (word === "SELECT" || word === "FROM" || word === "WHERE" || word === "INTO" || word === "RIGHT" || word === "LEFT" || word === "INNER" || word === "UPDATE"
              || word === "DELETE" || word === "INTO" || word === "INSERT" || word === "VALUES" || word === "FIND_IN_SET" || word === "REPLACE") {
                final.push(<span style={{color: "#3498db"}}>{word}</span>)
              } else if (word.toLowerCase() === "for" || word.toLowerCase() === "while" || word.toLowerCase() === "if" || word.toLowerCase() === "else"
              || word.toLowerCase() === "elif"){
                final.push(<span style={{color: "#ED4C67"}}>{word}</span>)
              } else if (word.toLowerCase() === "<p>" || word.toLowerCase() === "<p" || word.toLowerCase() === "</p>" ||
              word.toLowerCase() === "<span>" || word.toLowerCase() === "<span" || word.toLowerCase() === "</span>" ||
              word.toLowerCase() === "<h1>" ||  word.toLowerCase() === "<h1" || word.toLowerCase() === "</h1>" ||
              word.toLowerCase() === "<h2>" ||  word.toLowerCase() === "<h2" ||  word.toLowerCase() === "</h2>" ||
              word.toLowerCase() === "<h3>" ||  word.toLowerCase() === "<h3" ||  word.toLowerCase() === "</h3>" ||
              word.toLowerCase() === "<div>" || word.toLowerCase() === "<div" || word.toLowerCase() === "</div>" ||
              word.toLowerCase() === "<img>" || word.toLowerCase() === "<img" || word.toLowerCase() === "</img>" ||
              word.toLowerCase() === "<strong>" || word.toLowerCase() === "<strong" || word.toLowerCase() === "</strong>") {
                final.push(<span style={{color: "#833471"}}>{word}</span>)
              } else {
                final.push(<span style={{color: "#fff"}}>{word}</span>)
              }

            }
            const finalWithSpace = final.map((element) => <>{element} </>);
            const finalString = finalWithSpace.reduce((acc, curr) => [acc, curr]);
            console.log("FINAL",final)
            console.log("FINALWithSpace",finalWithSpace)
            console.log("FINALSTRING",finalString)
            result = <p className='font-normal text-white mx-3 bg-code p-3 rounded'>{finalString}</p>
          } 
        } else if (splidDataElement[0] === "IMAGE") {
          if (splidDataElement[1] === "Size 1") { 
            result = <div class="flex items-center justify-center m-5"><img src={splidDataElement[2]} className="h-[calc(40rem))]  w-auto" alt="Image" /></div>
          } else if (splidDataElement[1] === "Size 2") {
            result = <div class="flex items-center justify-center m-5"><img src={splidDataElement[2]} className="h-[calc(35rem))] w-auto" alt="Image" /></div>           
          } else if (splidDataElement[1] === "Size 3") {
            result = <div class="flex items-center justify-center m-5"><img src={splidDataElement[2]} className="h-[calc(30rem))] w-auto" alt="Image" /></div>            
          }
        }

        if (result !== null) {
          newData.push(result);
        }
      };
      
      setCoreData(newData);
    }
  }, [])

  return (
    <div className="container mx-auto min-h-screen px-2 my-6">
      {coreData}
    </div>
  );
}

export default CheatCore;
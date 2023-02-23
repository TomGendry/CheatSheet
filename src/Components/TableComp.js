import React from 'react'

function tablecomp({data}) {

    const keysName = Object.keys(data[0])

  return (
    <div class="mx-12 overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className='table-auto w-full text-sm text-left'>
            <thead className="text-xs uppercase bg-subMain text-white">
                <tr>
                    {
                        keysName.map((valHead, indexHead) => (
                            <th scope="col" class="py-3 px-6" key={indexHead}>{valHead}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((valueVAR, indexVAR) => (
                        <tr className="border-b bg-gray-800 border-gray-700" key={indexVAR}>
                            {
                                
                                Object.keys(valueVAR).map((indexVAR) => (
                                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white" key={indexVAR}>{valueVAR[indexVAR]}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default tablecomp
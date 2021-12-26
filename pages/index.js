import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { create } from 'ipfs-http-client'


export default function Home() {

  // const init = async () => {
  //   const client = create('https://ipfs.infura.io:5001/api/v0')
  //   const added = await client.add('hello world')
  //   console.log(added)
  // }


  return (
    <>
      {/* create text box align to center using tailwind */}
      <div className="flex flex-col items-center justify-center p-4 h-screen">
        <div className="relative w-1/2 p-8 bg-[#272525] shadow-xl mx-auto rounded">
          {/* create responsive row with two select */}
          <div className="flex flex-row items-center justify-center">
            <select className="bg-gray-800 text-white rounded-full px-4 py-2 m-2 col-start-3">
              <option>Select</option>
              <option>Option 1</option>
              </select>
               <select className="bg-gray-800 text-white rounded-full px-4 py-2 m-2 col-start-3">
              <option>Select</option>
              <option>Option 1</option>
              </select>
            </div>
          {/* create input box limit to 255 characters */}
          <textarea className="text-sm w-full p-2 max-w-xl ring-1 ring-gray-900/10 shadow-sm rounded-md dark:bg-[#333333] dark:ring-0 dark:highlight-white/5" type="text" rows="10" />
          {/* create button to submit text */}
          <button className="uppercase  w-full text-md bg-green-600 text-white p-2 rounded hover:bg-green-400 active:bg-green-600 font-bold transition duration-150 ease-in-out">Save</button>
        </div>
      </div>
    </>
  )
}

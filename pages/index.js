import Head from 'next/head'
import { useEffect, useState } from 'react'
import { create } from 'ipfs-http-client'
import languages from "../utils/language"


export default function Home() {

  const [content, setContent] = useState('')
  const [language, setLanguage] = useState()

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = {
      content,
      language,
      theme: 'a11y-dark',
    }
    const client = create('https://ipfs.infura.io:5001/api/v0')
    const hash = await client.add(JSON.stringify(data))
    console.log(hash)
    setContent('')
    setLanguage('')
    e.target.reset()
  }


  return (
    <div className="flex flex-col m-3">
      <form
      onSubmit={onSubmit}
      >
        <textarea
          required
          value={content}
          name="content"
          onChange={(e) => setContent(e.target.value)}
          className="text-sm w-full md:w-2/3 ring-gray-900/10 shadow-sm rounded-md dark:bg-[#333333] dark:ring-0 dark:highlight-white/5 resize-none p-3" type="text" rows="10" />
        <div className="w-full  md:w-80">
          <select
          value={language}
          name="language"
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-[#333333] text-white rounded-md p-4 mt-3">
            <option hidden>Select Syntax Highlighting</option>
            <option value="" key="">Default</option>
            {
              languages.map(language => (
                <option key={language} value={language}>
                  {/* capitalize first letter */}
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </option>
              ))
            }
          </select>
        </div>
        <button className="uppercase w-full mt-3  md:w-60 text-md bg-green-600 text-white p-2 rounded hover:bg-green-400 active:bg-green-600 font-bold transition duration-150 ease-in-out">Save</button>
      </form>
    </div>
  )
}

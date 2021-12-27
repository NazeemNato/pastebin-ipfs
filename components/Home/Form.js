import { useState } from 'react'
import { create } from 'ipfs-http-client'
import { useRouter } from "next/router"
import languages from "react-syntax-highlighter/dist/cjs/languages/prism/supported-languages"


export default function Form() {

    const [content, setContent] = useState('')
    const [language, setLanguage] = useState()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const data = {
                content,
                language: language || "textile",
                theme: 'a11yDark',
                createdAt: new Date().toISOString()
            }
            const client = create('https://ipfs.infura.io:5001/api/v0')
            const hash = await client.add(JSON.stringify(data))
            router.push(`/${hash.path}`)
        } catch (e) {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={onSubmit}
        >
            <textarea
                required
                value={content}
                name="content"
                placeholder="Paste your code / text here..."
                onChange={(e) => setContent(e.target.value)}
                className="text-sm w-full md:w-2/3 ring-gray-900/10 shadow-sm rounded-md bg-[#333333] ring-0 highlight-white/5 resize-none p-3" type="text" rows="10" />
            <div className="flex flex-col md:flex-row">
                <div className="">
                    <select
                        value={language}
                        name="language"
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-[#333333] text-white rounded-md p-4 mt-3 w-full  md:w-80">
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
                <div>
                    <button className="uppercase w-full mt-3 md:ml-3  md:w-80 text-md bg-green-600 text-white p-3 rounded hover:bg-green-400 active:bg-green-600 font-bold transition duration-150 ease-in-out"
                        disabled={loading}
                    >{
                            loading ? "Saving..." : "Save"
                        }</button>
                </div>
            </div>
        </form>
    )
}

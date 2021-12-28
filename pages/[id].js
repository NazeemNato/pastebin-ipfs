import { useRouter } from "next/router"
import { ViewBody, Loader } from '../components/View';
import { useState, useEffect } from 'react';
import { create } from 'ipfs-core'

export default function View() {

    const router = useRouter()
    const id = router.query.id
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            fetchData()
        }
    }, [id])

    const fetchData = async () => {
        try {
            const node = await create()
            const stream = node.cat(id)
            let response = ''
            for await (const chunk of stream) {
                // chunks of data are returned as a Buffer, convert it back to a string
                response += chunk.toString()
              }

            let data = JSON.parse(response)
            
            if (!data?.content) {
                setData({
                    content: `${data}`,
                    language: "textile",
                    createdAt: new Date().toISOString(),
                })
                setLoading(false)
            } else {
                // my expected format
                setData(data)
                setLoading(false)
            }

        } catch (e) {
            console.log(e)
            router.push('/')
        }
    }

    return (
        <>
            {
                loading && !data && <Loader />
            }
            {
                !loading && data && <ViewBody data={data} />
            }
        </>
    )
}
import { useRouter } from "next/router"
import { ViewBody, Loader } from '../components/View';
import { useState, useEffect } from 'react';
import axios from 'axios';



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
            const response = await axios.get("https://ipfs.infura.io/ipfs/" + id)
            if (!response.data?.content) {
                setData({
                    content: `${response.data}`,
                    language: "textile",
                    createdAt: new Date().toISOString(),
                })
                setLoading(false)
            } else {
                // my expected format
                setData(response.data)
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
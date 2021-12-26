import { create } from 'ipfs-http-client'
import Head from 'next/head'
import SyntaxHighlighter from 'react-syntax-highlighter';
import dark from 'react-syntax-highlighter/dist/cjs/styles/hljs/a11y-dark';
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactTimeAgo from 'react-time-ago'

export async function getServerSideProps({ params }) {

    try {

        const client = create('https://ipfs.infura.io:5001/api/v0')
        const stream = await client.cat(params.id)
        if (!stream) {
            return {
                props: {
                    error: true
                }
            }
        }
        let data = ''
        for await (const chunk of stream) {
            data += chunk.toString()
        }
        const parsed = JSON.parse(data)

        if(!parsed?.content) {
            return {
                redirect: {
                    destination: '/',
                }
            }
        }

        return {
            props: {
                ...parsed
            }
        }
    } catch (e) {
        console.log(e)
        return {
            redirect: {
                destination: '/',
            }
        }
    }
}

export default function View({ language, content, createdAt }) {

    const onShare = () => {
        if (window && window.navigator && window.navigator.share) {
            window.navigator.share({
                title: 'Ppaste Share',
                text: `${language.charAt(0).toUpperCase() + language.slice(1)} Snippet`,
                url: window.location.href
            })
        } else {
            alert('Share is not supported')
        }
    }


    return (
        <>
            <Head>
                <title> {language.charAt(0).toUpperCase() + language.slice(1)} Snippet / Ppaste</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="flex flex-col m-3">
                <div className="flex flex-row justify-end">
                    <div className="text-sm m-3 inline-flex items-center font-bold leading-sm ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>   <ReactTimeAgo date={createdAt} locale="en-US" />
                    </div>
                    <div className="text-md font-bold leading-sm m-3">
                        <button onClick={onShare}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-2/3 shadow-md rounded-md relative md:m-auto">

                    <CopyToClipboard
                        text={content}
                        className="clipboard"
                    >
                        <button type="button" aria-label="Copy to Clipboard Button" >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </CopyToClipboard>
                    <SyntaxHighlighter language={language} style={dark} customStyle={{ marginTop: 0, marginBottom: 0 }}>
                        {content}
                    </SyntaxHighlighter>
                </div>
            </div>
        </>
    )
}
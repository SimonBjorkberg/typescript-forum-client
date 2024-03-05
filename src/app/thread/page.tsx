'use client'

import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ProfileBar from '../components/ProfileBar'

export default function Thread() {
    const [thread, setThread] = useState({})
    const searchParams = useSearchParams()

    const id = searchParams.get('id')

    const getThread = async () => {
        const response: any = await axios.get(`http://localhost:5005/thread/getOne/${id}`)
        console.log(response.data.thread)
        setThread(response.data.thread)
    }

    useEffect(() => {
        getThread()
    }, [])

    return (
        <>
            <Navbar />
            <main className="w-full ml-5 flex flex-col">
                <ProfileBar />

                <div className=''>
                    <div className='h-full mt-[50px] bg-opacity-30 bg-neutral-800 border border-neutral-800 p-4'>
                        <p className='text-2xl border-b border-neutral-800 pb-2'>{thread.title}</p>
                        <div className='mt-5 p-4' dangerouslySetInnerHTML={{ __html: thread.content }}></div>
                    </div>
                </div>
            </main>
        </>
    );
}
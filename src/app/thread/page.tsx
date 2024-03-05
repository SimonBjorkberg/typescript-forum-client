'use client'

import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ProfileBar from '../components/ProfileBar'
import Image from 'next/image'
import icon from '../images/editIcon.png'

export default function Thread() {
    const [thread, setThread] = useState({})
    const [comment, setComment] = useState('')
    const searchParams = useSearchParams()
    const router = useRouter()

    const id = searchParams.get('id')

    const getThread = async () => {
        const response: any = await axios.get(`http://localhost:5005/thread/getOne/${id}`)
        setThread(response.data.thread)
    }

    const handleComment = (e: any) => {
        setComment(e.target.value)
    }

    useEffect(() => {
        getThread()
    }, [])

    return (
        <main className='flex h-screen w-[80%] mx-auto'>
            <Navbar />
            <div className="w-full ml-5 flex flex-col h-[90%] my-auto">
                <ProfileBar />
                <div className='w-full flex justify-end my-2 h-10'>
                    <button className="bg-[#214642] my-auto hover:bg-[#326a64] py-[6px] h-10 px-5" onClick={() => router.push(`/${thread.parentTopic}`)}>Back</button>
                </div>
                <div className='h-full bg-opacity-30 bg-neutral-800 border border-neutral-800 p-4 overflow-y-scroll'>
                    <div className='flex flex-col'>
                        <div>
                            <h1 className='text-4xl pb-2 flex justify-between'>{thread.title}
                                <span className='h-fit my-auto' onClick={() => router.push(`/thread/edit?id=${thread._id}`)}>
                                    <Image className='w-8 rounded-md border hover:bg-neutral-200 transition-all duration-200 bg-[#14b78f] hover:cursor-pointer border-neutral-900 p-1' src={icon} alt='' />
                                </span>
                            </h1>
                        </div>
                        <div className='flex pb-4 border-b border-neutral-800'>
                            <div className='bg-black w-12 h-12'></div>
                            <div className='flex flex-col text-sm font-light ml-2 justify-center'>
                                <p className='font-bold text-neutral-200'>By: {thread.author?.username},</p>
                                <p className='text-neutral-400'>At: {thread.createdAt} in {thread.parentTopic?.slice(0, 1).toUpperCase() + thread.parentTopic?.slice(1)}</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 border-neutral-700 pb-2 border-b mb-8' dangerouslySetInnerHTML={{ __html: thread.content }}></div>
                    <form>
                        <textarea value={comment} onChange={handleComment} className='w-full h-40 resize-none bg-neutral-900 border-neutral-500 border p-4' required />
                        <button className='border p-2 rounded-sm'>Comment</button>
                    </form>
                </div>
            </div>
        </main>
    );
}
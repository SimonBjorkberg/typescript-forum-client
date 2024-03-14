'use client'

import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ProfileBar from '../components/ProfileBar'
import Image from 'next/image'
import icon from '../images/editIcon.png'
import CreateComment from '../components/CreateComment'
import Comments from '../components/Comments'
import { AuthContext } from '../context/auth.context'

interface Thread {
    title: string,
    _id: string,
    parentTopic: string,
    author: {
        username: string,
    },
    createdAt: string,
    content: string,
}

interface Comments {
    _id: string,
    author: {
        username: string,
    },
    createdAt: string,
}

interface Response {
    data: {
        allComments: []
    }
}

export default function Thread() {
    const [thread, setThread] = useState<Thread>();
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState<Comments[]>([])
    const searchParams = useSearchParams()
    const router = useRouter()

    const id = searchParams.get('id')
    const { loggedInUser }: any = useContext(AuthContext)

    const getThread = async () => {
        const response = await axios.get(`http://localhost:5005/thread/getOne/${id}`)
        setThread(response.data.thread)
    }

    const getAllComments = async () => {
        const response: Response = await axios.get(`http://localhost:5005/comment/getAll/${id}`)
        setComments(response.data.allComments)
    }

    const handleCommentSubmit = async (e: any) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:5005/comment/create', { author: loggedInUser._id, content: comment, parentThread: thread._id })
        setComments(prevComments => [...prevComments, response.data.createdComment])
        setComment("")
    }

    useEffect(() => {
        getThread()
        getAllComments()
    }, [])

    return (
        <main className='flex h-screen min-h-screen w-[80%] max-w-[1550px] mx-auto'>
            <Navbar />
            <div className="w-full flex flex-col h-[90%] my-auto ml-4">
                <ProfileBar />
                {thread && <div className='w-full flex justify-end my-2 h-10'>
                    <button className="bg-[#214642] my-auto hover:bg-[#326a64] py-[6px] h-10 px-5" onClick={() => router.push(`/${thread.parentTopic}`)}>Back</button>
                </div>}
                {thread && <div className='h-full bg-opacity-30  overflow-y-auto'>
                    <div className='flex flex-col border p-4 border-neutral-700'>
                        <div>
                            <h1 className='text-4xl pb-2 flex justify-between'>{thread.title}
                                <span className='h-fit my-auto' onClick={() => router.push(`/thread/edit?id=${thread._id}`)}>
                                    <Image className='w-8 rounded-md border hover:bg-neutral-200 transition-all duration-200 bg-[#14b78f] hover:cursor-pointer border-neutral-900 p-1' src={icon} alt='' />
                                </span>
                            </h1>
                        </div>
                        <div className='flex pb-4'>
                            <div className='bg-black w-12 h-12 border border-[#14b78f]'></div>
                            <div className='flex flex-col text-sm font-light ml-2 justify-center'>
                                <p className='font-bold text-[#14b78f]'>Created By {thread.author?.username},</p>
                                <p className='text-neutral-400'>{thread.createdAt} in <span className='text-[#14b78f]'>{thread.parentTopic?.slice(0, 1).toUpperCase() + thread.parentTopic?.slice(1)}</span></p>
                            </div>
                        </div>
                        <div className='border-neutral-700' dangerouslySetInnerHTML={{ __html: thread.content }}></div>
                    </div>
                    <div className='my-4 flex flex-col gap-2'>
                        <Comments comments={comments} />
                    </div>
                    <CreateComment thread={thread} handleCommentSubmit={handleCommentSubmit} setComment={setComment} comment={comment} />
                </div>}
            </div>
        </main>
    );
}
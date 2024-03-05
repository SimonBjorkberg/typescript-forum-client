'use client'

import axios from "axios"
import EditThreadComponent from "../../components/EditThreadComponent"
import Navbar from "../../components/Navbar"
import ProfileBar from '../../components/ProfileBar'
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

export default function EditThreadPage() {
    const [thread, setThread] = useState({})
    const searchParams = useSearchParams()

    const id = searchParams.get('id')
    const router = useRouter()

    const getThread = async () => {
        const response: any = await axios.get(`http://localhost:5005/thread/getOne/${id}`)
        setThread(response.data.thread)
    }

    useEffect(() => {
        getThread()
    }, [])

    return (
        <main className='flex h-screen w-[80%] mx-auto'>
            <Navbar />
            <div className="w-full ml-5 flex flex-col h-[90%] my-auto">
                <div className="h-24">
                    <ProfileBar />
                    <div className='w-full flex justify-end my-2 h-10'>
                        <button className="bg-[#214642] my-auto hover:bg-[#326a64] py-[6px] h-10 px-5" onClick={() => router.push(`/thread/?id=${thread._id}`)}>Back</button>
                    </div>
                </div>
                <EditThreadComponent thread={thread} />
            </div>
        </main>
    )
}
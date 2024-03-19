'use client'

import MyEditor from "@/app/components/MyEditor";
import Navbar from "@/app/components/Navbar";
import ProfileBar from "@/app/components/ProfileBar";
import topics from "@/app/utils/topics";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const topicId: any = searchParams.get('topic')

    const link = topics.filter((topic) => {
        return topic.link.includes(topicId)
    })

    return (
        <main className="flex h-screen w-full mx-auto">
            <div className="flex h-screen w-[80%] max-w-[1550px] mx-auto">
                <Navbar />
                <div className="w-full ml-5 flex flex-col h-[90%] my-auto">
                    <div className="h-24">
                        <ProfileBar />
                        <div className="w-full flex justify-end gap-1 my-2 h-10">
                            <button className="bg-[#214642] my-auto hover:bg-[#326a64] py-[6px] h-10 px-5" onClick={() => router.push(`/${link[0].link}`)}>Back</button>
                        </div>
                    </div>
                    <MyEditor />
                </div>
            </div>
        </main>
    )
}
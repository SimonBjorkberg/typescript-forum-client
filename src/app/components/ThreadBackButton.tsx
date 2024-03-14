import { useRouter } from "next/navigation"

interface Props {
    thread: {
        parentTopic: string,
    }
}

export default function ThreadBackButton({ thread }: Props) {
    const router = useRouter()
    return (
        <div className='w-full flex justify-end my-2 h-10'>
            <button className="bg-[#214642] my-auto hover:bg-[#326a64] py-[6px] h-10 px-5" onClick={() => router.push(`/${thread.parentTopic}`)}>Back</button>
        </div>
    )
}
import axios from "axios"
import { useEffect, useState } from "react"

export default function Comments({ threadId }) {
    const [comments, setComments] = useState([])

    const getAllComments = async () => {
        const response: any = await axios.get(`http://localhost:5005/comment/getAll/${threadId}`)
        setComments(response.data.allComments)
    }

    useEffect(() => {
        getAllComments()
    }, [])

    return (
        <>
            {comments.map((comment) => {
                return <div className="border p-2 flex border-neutral-700 text-neutral-300">
                    <div className='flex flex-col w-72 mr-8 border-r border-[#14b78f]'>
                        <div className='bg-black w-12 h-12 border-[#14b78f] border'></div>
                        <div className='flex flex-col text-sm font-light justify-center'>
                            <p className='font-bold text-[#14b78f]'>Created By {comment.author?.username},</p>
                            <p className='text-neutral-400'>{comment.createdAt}</p>
                        </div>
                    </div>
                    <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat aspernatur quidem quaerat, blanditiis molestiae accusamus. Iste voluptates sequi aliquid nisi possimus in consequatur, odio non, nihil, accusantium fuga libero error?</p>
                </div>
            })}
        </>
    )
}
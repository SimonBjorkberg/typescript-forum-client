import axios from "axios"
import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"

export default function CreateComment({ thread }: any) {
    const [comment, setComment] = useState('')

    const { loggedInUser }: any = useContext(AuthContext)

    const handleComment = (e: any) => {
        setComment(e.target.value)
    }

    const handleCommentSubmit = (e: any) => {
        e.preventDefault()
        axios.post('http://localhost:5005/comment/create', { author: loggedInUser._id, content: comment, parentThread: thread._id })
        setComment("")
    }

    return (
        <form onSubmit={handleCommentSubmit}>
            <textarea value={comment} onChange={handleComment} className='w-full h-40 resize-none bg-neutral-900 border-neutral-500 border p-4' required />
            <button className='border p-2 rounded-sm'>Comment</button>
        </form>
    )
}
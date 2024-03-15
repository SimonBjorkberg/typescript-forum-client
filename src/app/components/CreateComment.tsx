export default function CreateComment({ handleCommentSubmit, setComment, comment }: any) {

    const handleComment = (e: any) => {
        setComment(e.target.value)
    }

    return (
        <form onSubmit={handleCommentSubmit}>
            <textarea value={comment} onChange={handleComment} className='w-full h-40 resize-none bg-neutral-900 border-neutral-500 border p-4 outline-none' required />
            <button className='border p-2 rounded-sm border-[#14b78f] hover:text-[#14b78f] transition-all duration-100'>Comment</button>
        </form>
    )
}
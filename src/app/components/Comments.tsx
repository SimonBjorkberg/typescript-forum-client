interface Comment {
    _id: string,
    author: {
        username: string,
    }
    createdAt: string,
    content: string,
}

export default function Comments({ comments }: any) {

    return (
        <>
            {comments.map((comment: Comment) => {
                return <div className="border p-2 flex flex-col border-neutral-700 text-neutral-300" key={comment._id}>
                    <div className='flex'>
                        <div className='bg-black w-8 h-8 border-[#14b78f] border'></div>
                        <div className='flex text-sm ml-2 font-light my-auto justify-between w-full'>
                            <p className='font-bold text-[#14b78f]'>Created By {comment.author?.username}</p>
                            <p className='text-neutral-400'>{comment.createdAt}</p>
                        </div>
                    </div>
                    <p className="my-2 ">{comment.content}</p>
                </div>
            })}
        </>
    )
}
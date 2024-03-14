interface Comment {
    _id: string,
    author: {
        username: string,
    }
    createdAt: string
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
                    <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat aspernatur quidem quaerat, blanditiis molestiae accusamus. Iste voluptates sequi aliquid nisi possimus in consequatur, odio non, nihil, accusantium fuga libero error?</p>
                </div>
            })}
        </>
    )
}
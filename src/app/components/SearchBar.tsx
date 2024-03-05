'use client'

export default function SearchBar({ pathName, setCreateThread, createThread }: any) {
    return (
        <main className="w-full flex justify-end gap-1 my-2 h-10">
            {!createThread && <button className="bg-[#214642] my-auto hover:bg-[#326a64] h-10 px-5" onClick={() => setCreateThread(true)}><span className="mr-4">+</span>Create Thread</button>}
            {!createThread && <input type="text" placeholder="Search" className="my-auto h-10 border-none px-2" />}
            {createThread && <button className="bg-[#214642] my-auto hover:bg-[#326a64] py-[6px] h-10 px-5" onClick={() => setCreateThread(false)}>Back</button>}
        </main>
    )
}
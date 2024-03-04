export default function SearchBar() {
    return (
        <main className="w-full flex justify-end gap-1 my-2">
            <button className="bg-[#214642] my-auto hover:bg-[#326a64] py-1 pr-4 pl-2"><span className="text-xl p-2">+</span> Create Topic</button>
            <input type="text" placeholder="Search" className="my-auto py-[6px] px-2" />
        </main>
    )
}
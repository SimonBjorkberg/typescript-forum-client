import Navbar from "../components/Navbar";
import ProfileBar from "../components/ProfileBar";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <main className="h-full w-full ml-5 flex flex-col">
                <ProfileBar />
                <SearchBar />
                <div className="bg-red-500 h-full">
                    Profiles
                </div>
            </main>
        </>
    )
}
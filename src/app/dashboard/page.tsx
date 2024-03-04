import Navbar from "../components/Navbar";
import ProfileBar from "../components/ProfileBar";

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <main className="h-full w-full ml-5">
                <ProfileBar />
                DashBoard
            </main>
        </>
    )
}
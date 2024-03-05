import { usePathname, useRouter } from "next/navigation";

interface ForumTopicProps {
    icon: string;
    title: string;
}

export default function ForumTopic({ icon, title }: ForumTopicProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/${title.toLowerCase()}`);
    };

    const pathName = usePathname()

    return (
        <div className={`${pathName.slice(1, 2).toUpperCase() + pathName.slice(2) === title ? "border-[#14b78f] border text-[#14b78f]" : "border border-neutral-900 text-white"} mb-1 p-3 flex text-sm transition-all duration-100 mr-5 hover:cursor-pointer hover:border-[#14b78f]`} onClick={handleClick}>
            <p>
                {`${title}`}
            </p>
        </div>
    );
}
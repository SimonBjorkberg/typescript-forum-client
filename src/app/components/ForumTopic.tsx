import { usePathname, useRouter } from "next/navigation";

interface ForumTopicProps {
    title: string;
    link: string;
}

export default function ForumTopic({ title, link }: ForumTopicProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/${link.toLowerCase()}`);
    };

    const pathname = usePathname()

    return (
        <div onClick={() => handleClick()} className={`${pathname.slice(1) === link ? "border-[#14b78f] border text-[#14b78f]" : "border border-neutral-900 text-white"} mb-1 p-3 flex text-sm transition-all duration-100 mr-5 hover:cursor-pointer hover:border-[#14b78f]`}>
            <p>
                {`${title}`}
            </p>
        </div>
    );
}
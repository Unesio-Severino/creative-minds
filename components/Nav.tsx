import Link from "next/link";

export default function Nav() {
    return (
        <nav className="flex justify-between items-center py-10">
            <Link href="/">
                <button className="text-lg font-medium">Creative</button>
            </Link>
            <ul className="flex items-center gap-10">
                <Link legacyBehavior href={"/auth/login"}>
                    <a className="py-2 px-4 text-sm bg-cyan-700 text-white rounded-lg font-medium ml-8">Entre Agora </a>
                </Link>
            </ul>
        </nav>
    );
}
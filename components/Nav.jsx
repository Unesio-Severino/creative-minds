import Link from "next/link";
import {auth} from "../utils/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import Image from 'next/image';

export default function Nav() {

//Chamada da função para ver se o utilizador esta logado ou nao
    const [user, loading] = useAuthState(auth);

    return (
        <nav className="flex justify-between items-center py-10">
            <Link href="/">
                <button className="text-2xl text-lg font-medium font-bold">Creative Post </button>
            </Link>
            <ul className="flex items-center gap-10">
                {!user && (
                <Link legacyBehavior href={"/auth/login"}>
                    <a className="py-2 px-4 text-sm bg-cyan-700 text-white rounded-lg font-medium ml-8">Entre Agora </a>
                </Link>
                )}
                {user && (

                    <div className="flex items-center gap-7">
                        <Link href="/post">
                            <button className="font-medium bg-cyan-700 text-white py-2 px-4 rounded-md text-sm">
                                Post
                            </button>
                        </Link>

                        <Link href="/dashboard">
                            <img className="w-12 rounded-full cursor-pointer"
                                src={user.photoURL} alt="user photo"
                            />
                        </Link>
                    </div>
                )}
            </ul>
        </nav>
    );
}
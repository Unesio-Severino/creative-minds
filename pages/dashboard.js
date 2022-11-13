import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import Message from '../components/message';
import { AiFillDelete } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import Link from "next/link";

//Aqui sao feitas verificações para evitar que os usuários nao possam
//aceder o dashboard sem que estejam logados.

export default function Dashboard() {

    const [posts, setPosts] = useState([]);
    const [user, loading] = useAuthState(auth);
    const route = useRouter();

    //see if user is logged
    const getData = async () => {
        if (loading) return;
        if (!user) return route.push("/auth/login");

        //Função para ver as mensagens de post do usuário logado no dashboard de forma individual.
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef, where("user", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot => {
            setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }));
        return unsubscribe;
    };

    //Função para deletar posts
    const deletePost = async (id) => {
        const docRef = doc(db, "posts", id);
        await deleteDoc(docRef);
    }

    //Get users Data
    useEffect(() => {
        getData();
    }, [user, loading]);

    return (
        <div>
            <h1>Minhas Postagens</h1>
            <div>
                {posts.map((post) => {
                    return <Message {...post} key={post.id}>
                        <div className="flex gap-4">
                            <button
                                onClick={() => deletePost(post.id)}
                                className="text-red-600  flex text-sm items-center justify-center gap-2 py-2">
                                <AiFillDelete className="text-2xl" /> Delete
                            </button>
                            <Link href={{ pathname: "/post", query: post }}>
                                <button className="text-teal-600 flex text-sm items-center justify-center gap-2 py-2">
                                    <BiEditAlt className="text-2xl" /> Editar
                                </button>
                            </Link>
                        </div>
                    </Message>;
                })}
            </div>
            <button className="font-medium text-white bg-gray-800 py-2 px-4 rounded-lg my-7 py-2 px-4"
                onClick={() => auth.signOut()}>
                Sair
            </button>
        </div>
    );
}
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Post(){

    //Estado do formulario ao submeter a mensagem de post.
    const [post, setPost] = useState({ description: "" });
    const [user, loading] = useAuthState(auth);
    const route = useRouter();

        //Função para submit
        const submitPost =  async (e) => {
            e.preventDefault();

        //Função para verificar se campo do post esta vazio e nos retorna um alerta.
        if (!post.description) {
            toast.error("O campo da descrição esta vazio..!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }

        //Função para verificar se campo do post tem caracteres a cima de 300 e nos retorna um alerta.
        if (post.description.length > 300) {
            toast.error("O numero de palavras eh muito longo.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }


        //Make a new post
        const collectionRef = collection(db, 'posts');
        await addDoc(collectionRef, {
            ...post,
            timestamp: serverTimestamp(),
            user: user.uid,
            avatar: user.photoURL,
            username: user.displayName,
        });
        setPost({ description: ""});
        return route.push('/')
    };

    return(
        <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
            <form onSubmit={submitPost}>
                <h1 className="text-2xl font-bold">Criar nova postagem</h1>
                <div className="py-2">
                    <h3 className="text-lg font-medium py-2">Descrição</h3>
                        <textarea
                            value={post.description}
                            onChange={(e) => setPost({ ...post, description: e.target.value })}
                            className="bg-cyan-800 h-48 w-full text-white rounded-lg p-2 text-md">
                        </textarea>
                    <p className={`text-cyan-600 font-medium text-sm ${post.description.length > 300 ? "text-red-600" : ""}`}>
                        {post.description.length}/300</p>
                </div>
               <button
                    type="submit"
                    className="w-full font-medium bg-cyan-800 text-white p-2 my-2 rounded-lg text-sm">
                    Enviar
                </button>
            </form>
        </div>
    );
}
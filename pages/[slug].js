import Message from '../components/message';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from '../utils/firebase';
import { toast } from "react-toastify";
import { doc, arrayUnion } from "firebase/firestore";

export default function Details() {

    const router = useRouter();
    const routeData = router.query;
    const [message, setMessage] = useState('');
    const [allMessage, setAllMessages] = useState([]);

    //Funções para enviar mensagens
    const submitMessage = async () => {

        //Verificar se o usuário esta logado
        if (!auth.currentUser) return router.push('/auth/login');

        if (!message) {
            toast.error("Nao deixe o campo de mensagem vazio.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }
        const docRef = doc(db, "posts", routeData.id);
        await UpdateDoc(docRef, {
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time: Timestamp.now();
            }),
        });
    };

    return (
        <div>
            <Message {...routeData}>
            </Message>
            <div className="my-5">
                <div className="flex">
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        className="bg-gray-800 w-full p-2 text-white text-sm"
                        value={message}
                        placeholder="Envie uma Mensagem." />

                    <button
                        onClick={submitMessage}
                        className="bg-cyan-500 text-white py-2 px-4 text-sm" >
                        Enviar
                    </button>
                </div>
                <div className="py-6">
                    <h2 className="font-bold">Comentários</h2>
                    {/* {setAllMessages?.map(message => (
                        <div>
                            <div>
                             <img src="" />
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    );
}
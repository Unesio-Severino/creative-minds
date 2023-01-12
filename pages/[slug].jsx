import Message from '../components/message';
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { auth, db } from '../utils/firebase';
import { toast } from "react-toastify";
import {
    doc, arrayUnion,
    updateDoc,
    Timestamp,
    onSnapshot,
    getComments
} from "firebase/firestore";
import Image from 'next/image';


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
        await updateDoc(docRef, {
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time: Timestamp.now(),
            }),
        });
        setMessage("");
    };

    //Função para pegar todos comentários de forma dinamica (em tempo real)
    const getComments = async () => {
        const docRef = doc(db, 'posts', routeData.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setAllMessages(snapshot.data().comments);
    });
    return unsubscribe;
    // setAllMessages(docSnap.data().comments);
    // const docSnap = await getDoc(docRef);
};

    useEffect(() => {
        if (!router.isReady)
        return;
        getComments();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);


return (
    <div>
        <Message {...routeData}> </Message>
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
                {allMessage?.map((message) => (
                    <div className="bg-white p-4 my-4 border-2" key={message.time}>
                        <div className="items-center gap-2 mb-4">
                            <img
                                className="w-10 rounded-full"
                                src={message.avatar} alt="avatar" />
                            <h2>{message.userName}</h2>
                        </div>
                        <h2>{message.message}</h2>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
}
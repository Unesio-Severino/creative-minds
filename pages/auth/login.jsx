import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import {useRouter} from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from  "react";


export default function Login(){
    const route = useRouter();
    const [user, loading] = useAuthState(auth);

//Função para autenticação com a conta google
const googleProvider = new GoogleAuthProvider();
const GoogleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        route.push("/");
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    if (user) {
        route.push("/")
    } else {
        console.log("login");
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
}, [route]);

    return(
        <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
            <h2 className="text-2xl font-medium">Entrar</h2>
            <div className="py-4">
                <h3 className="py-4">Entre com uns dos provedores</h3>
                <button onClick={GoogleLogin} className="text-white bg-cyan-700 w-full
                    font-medium rounded-lg flex align-middle p-4 gap-2">
                    <FcGoogle className="text-3xl"/>
                        Entre com Google
                    </button>
            </div>
        </div>
    );
}
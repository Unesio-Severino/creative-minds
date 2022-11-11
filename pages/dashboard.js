import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


//Aqui sao feitas verificações para evitar que os usuários nao possam
//aceder o dashboard sem que estejam logados.

export default function Dashboard() {

    const route = useRouter();
    const [user, loading] = useAuthState(auth);

    //see if user is logged
    const getData = async () => {
        if (loading) return;
        if (!user) return route.push("/auth/login");
    };

    //Get users Data
    useEffect(() => {
        getData();
    }, [user, loading]);

    return(
        <div>
            <h1>Teus Posts</h1>
            <div>Posts</div>
            <button onClick={() => auth.signOut()}>Sair</button>
        </div>
    );
}
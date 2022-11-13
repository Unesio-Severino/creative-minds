import Head from 'next/head';
import Message from '../components/message';
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function Home() {

  //Criar estados de todos os posts que estao a vir da base de dados.
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;

  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Head>
        <title>e-Chat Plus</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="my-12 text-lg font-medium">
        <h2 className="text-2xl">Veja o que os outros estão conversando</h2>
        {allPosts.map((post) => (
          <Message key={post.id}{...post}></Message>
        ))}
      </div>

    </div>
  );
}

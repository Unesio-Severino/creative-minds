import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from "../components/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ToastContainer limit={1} />
      <Component {...pageProps} />
    </Layout>
  );

}


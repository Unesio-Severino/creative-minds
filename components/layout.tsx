import Nav from './Nav';
import Link from 'next/link';

export default function Layout({ children }){
    return (
        <div className="mx-6 md:max-w-2xl md:mx-auto font-poppins">
            <Nav />
            <main>{children}</main>
        </div>
    );
}
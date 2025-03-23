

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { auth, signOut, signIn } from '@/auth';

const Navbar = async () => {
    const Session = await auth(); // Now inside the component (server context)

    return (
        <header className='px-5 py-3 bg-blue-400 opacity-90 shadow-sm font-sans'>
            <nav className='flex justify-between items-center'>
                <Link href='/'>
                    <Image src='/logo.png' alt='logo' width={70} height={30} />
                </Link>

                <div className='flex items-center gap-5 text-black'>
                    {Session && Session?.user ? (
                        <>
                            <Link href='/startup/create'>
                                <span>Create</span>
                            </Link>

                            <form action={async () => {
                                "use server";
                                await signOut({ redirectTo: '/' });
                            }}>
                                <button type="submit">Logout</button>
                            </form>

                            <Link href={`/user/${Session?.id}`}>
                                <span>{Session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            "use server";
                            await signIn('github');
                        }}>
                            <button type='submit'>Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;

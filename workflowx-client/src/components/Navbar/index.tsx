import React, { FC } from 'react';
import { MenuIcon, Moon, Search, Settings, Sun } from 'lucide-react'
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';
import clsx from 'clsx';
import { useGetAuthUserQuery } from '@/state/api';
import { signOut } from 'aws-amplify/auth';


const Navbar: FC = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state: any) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state: any) => state.global.isDarkMode);

    const { data: currentUser } = useGetAuthUserQuery({});
    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (error) {
            alert(error)
        }
    }
    if (!currentUser) return null;
    console.log(currentUser.userSub);
    const currentUserDetails = currentUser.userDetails

    return (
        <div className='flex items-center justify-between bg-white px-10 py-3 dark:bg-dark-bg'>
            {/* //!Left part  */}
            <div className='flex items-center gap-8'>
                {
                    !isSidebarCollapsed ? null : (
                        <button
                            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
                        >
                            <MenuIcon className='h-8 w-8 dark:text-white' />
                        </button>
                    )
                }
                {/* <div className='relative flex h-min w-[200px]'>
                    <Search
                        className='absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white'
                    />
                    <input
                        type='search'
                        className='w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-600 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-100'
                        placeholder='Search...'

                    />
                </div> */}
            </div>

            {/* //!Right part  */}
            <div className="flex items-center">
                <button
                    onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
                    className={clsx(`rounded p-2`, isDarkMode ? 'dark:hover:bg-gray-700' : 'hover:bg-gray-100')}
                >
                    {
                        isDarkMode ? (
                            <Sun className='h-6 w-6 cursor-pointer dark:text-white' />
                        ) : (
                            <Moon className='h-6 w-6 cursor-pointer dark:text-white' />
                        )
                    }
                </button>
                <Link href="/setting"
                    className={clsx(`rounded p-2 h-min w-min`, isDarkMode ? 'dark:hover:bg-gray-700' : 'hover:bg-gray-100')}
                >
                    <Settings className='h-6 w-6 cursor-pointer dark:text-white' />
                </Link>
                <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
                <div className='hidden items-center justify-between md:flex'>
                    {/* <span className='mx-3 text-gray-800 dark:text-white'>{currentUserDetails.username}</span> */}
                    <button className='hidden rounded bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block'
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
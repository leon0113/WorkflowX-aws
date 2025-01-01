'use client'
import React, { FC, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import StoreProvider, { useAppSelector } from './redux'
import clsx from 'clsx'

interface Props {
    children: React.ReactNode
}

const DashboardLayout: FC<Props> = ({ children }) => {

    const isSidebarCollapsed = useAppSelector((state: any) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state: any) => state.global.isDarkMode);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

    }, [isDarkMode]);

    return (
        <div className='flex min-h-screen w-full bg-gray-50'>
            {/* Sidebar  */}
            <Sidebar />
            <main className={clsx('w-full flex flex-col bg-gray-50 dark:bg-dark-bg', isSidebarCollapsed ? '' : 'md:pl-64 ')}>
                {/*  Navbar  */}
                <Navbar />
                {children}
            </main>
        </div>
    )
};

const DashboardWrapper: FC<Props> = ({ children }) => {
    return (
        <StoreProvider>
            <DashboardLayout>{children}</DashboardLayout >
        </StoreProvider >
    )
}

export default DashboardWrapper
import Header from '@/components/Header';
import { Clock, Filter, Grid3X3, List, PlusSquare, Search, Share2, Table } from 'lucide-react';
import React, { useState } from 'react';
import ModalNewProject from '../ModalNewProject';
import { useGetSingleProjectQuery, useGetTasksQuery } from '@/state/api';

type Props = {
    id: string;
    activeTab: string;
    setActiveTab: (tabName: string) => void;
}

const tabBtnContent = [
    {
        name: 'Board',
        icon: <Grid3X3 className='h-5 w-5' />
    },
    {
        name: 'List',
        icon: <List className='h-5 w-5' />
    },
    {
        name: 'Timeline',
        icon: <Clock className='h-5 w-5' />
    },
    {
        name: 'Table',
        icon: <Table className='h-5 w-5' />
    },
]

const ProjectHeader = ({ id, activeTab, setActiveTab }: Props) => {
    const { data, isLoading, error } = useGetSingleProjectQuery({ projectId: Number(id) });
    const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);

    return (
        <div className='px-5 lg:px-10'>
            {/*  Modal for New Project  */}
            <ModalNewProject
                isOpen={isModalNewProjectOpen}
                onClose={() => setIsModalNewProjectOpen(false)}
            />


            <div className='py-6 lg:pb-4 lg:pt-8'>
                <Header name={data?.name!} buttonComponent={
                    <button
                        className='flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600'
                        onClick={() => setIsModalNewProjectOpen(true)}
                    >
                        <PlusSquare className='mr-2 size-5' /> New Board
                    </button>
                } />
            </div>

            {/* Project tabs  */}
            <div className='flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-2 dark:border-stroke-dark md:items-center'>
                <div className="flex flex-1 items-center gap-2 md:gap-4">
                    {
                        tabBtnContent.map((tab, index) => (
                            <TabButton key={tab.name} name={tab.name} icon={tab.icon} activeTab={activeTab} setActiveTab={setActiveTab} />
                        ))
                    }
                </div>

                <div className='flex items-center gap-2'>
                    <button className='text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:to-gray-300'>
                        <Filter className='h-5 w-5' />
                    </button>
                    <button className='text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:to-gray-300'>
                        <Share2 className='h-5 w-5' />
                    </button>
                    <div className='relative'>
                        <input type="text" placeholder='Search Task' className='rounded-md border py-1 pl-1 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white' />
                        <Search className='absolute top-1/2 right-2 transform -translate-y-1/2 h-4 w-4 cursor-pointer hover:text-gray-300' />
                    </div>
                </div>
            </div>
        </div>
    )
};

type TabBtnProps = {
    name: string;
    icon: React.ReactNode;
    activeTab: string;
    setActiveTab: (tabName: string) => void;
}


const TabButton = ({ name, icon, activeTab, setActiveTab }: TabBtnProps) => {
    const isActive = activeTab === name;
    return (
        <button
            className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4  ${isActive && 'text-blue-600 after:bg-blue-600 dark:text-white'}`}
            onClick={() => setActiveTab(name)}
        >
            {icon}
            <span className='ml-2'>{name}</span>
        </button>
    )
}

export default ProjectHeader
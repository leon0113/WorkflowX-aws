'use client'
import { useAppSelector } from '@/app/redux';
import { useGetProjectsQuery, useGetTasksQuery } from '@/state/api';
import React, { useMemo, useState } from 'react';
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react'
import "gantt-task-react/dist/index.css"
import Header from '@/components/Header';

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = () => {

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const { data: projects, isError, isLoading } = useGetProjectsQuery()

    const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
        viewMode: ViewMode.Month,
        locale: "en-US"
    });

    const ganttTasks = useMemo(() => {
        return (
            projects?.map((project) => ({
                id: `Project-${project.id}`,
                start: new Date(project.startDate as string),
                end: new Date(project.endDate as string),
                name: project.name,
                type: "task" as TaskTypeItems,
                progress: 50,
                isDisable: false
            })) || []
        )
    }, [projects]);

    // handle gantt chat view mode based on year/month/week
    const handleViewModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDisplayOptions((prev) => ({
            ...prev,
            viewMode: e.target.value as ViewMode
        }))
    };

    if (isLoading) return <div>Loading.....</div>
    if (isError || isError) return <div>Sorry, An Error occurred.</div>

    return (
        <div className='max-w-full p-8'>
            <header className="mb-4 flex items-center justify-between">
                <Header name='Projects Timeline' />
                <div className='relative inline-block w-64'>
                    <select
                        value={displayOptions.viewMode}
                        onChange={handleViewModeChange}
                        className='focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white text-center'
                    >
                        <option value={ViewMode.Day}>Day</option>
                        <option value={ViewMode.Week}>Week</option>
                        <option value={ViewMode.Month}>Month</option>
                    </select>
                </div>
            </header>

            <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
                <div className="timeline">
                    <Gantt
                        tasks={ganttTasks}
                        {...displayOptions}
                        columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
                        listCellWidth='100px'
                        projectBackgroundColor={isDarkMode ? '#101214' : '#1f2937'}
                        projectProgressColor={isDarkMode ? '#1f2937' : '#aeb8c2'}
                        projectProgressSelectedColor={isDarkMode ? '#000' : '#9ba1a6'}
                        barProgressColor='#890a8d'
                        barProgressSelectedColor='#e312eb'
                        todayColor='#cfcfcf'
                    />
                </div>
                {/* <div className="px-4 pb-5 pt-1">
                    <button className='flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600'
                    // onClick={() => setIsModalNewTaskOpen(true)}
                    >
                        Create New Project
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default Timeline
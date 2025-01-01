'use client'
import { columns } from '@/app/projects/TableView'
import { useAppSelector } from '@/app/redux'
import Header from '@/components/Header'
import ModalNewTask from '@/components/ModalNewTask'
import TaskCard from '@/components/TaskCard'
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utlis'
import { useGetUserTasksQuery } from '@/state/api'
import { Priority, Task } from '@/types'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import clsx from 'clsx'
import React, { useState } from 'react'

type Props = {
    priority: Priority
};


const PriorityPage = ({ priority }: Props) => {
    const [view, setView] = useState("list");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    const userId = 1;
    const { data: tasks, isLoading, isError: isTaskError } = useGetUserTasksQuery(userId, { skip: userId === null });

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    const filteredTasks = tasks?.filter((task: Task) => task.priority === priority);

    if (isTaskError || !tasks) return <div>Error fetching tasks.</div>

    return (
        <div className='m-5 p-4'>
            <ModalNewTask isOpen={isModalNewTaskOpen} onClose={() => setIsModalNewTaskOpen(false)} />
            <Header name={`${priority} Priority Tasks`} buttonComponent={
                <button
                    className='flex items-center bg-blue-primary px-3 py-2 rounded text-white hover:bg-blue-600'
                    onClick={() => setIsModalNewTaskOpen(true)}
                >
                    Add Task
                </button>
            }
            />

            <div className='mb-4 flex justify-start gap-5'>
                <button
                    className={clsx("px-4 py-2 rounded-lg", view === "list" ? "bg-gray-300" : "bg-white")}
                    onClick={() => setView("list")}
                >
                    List
                </button>
                <button
                    className={clsx("px-4 py-2 rounded-lg", view === "table" ? "bg-gray-300" : "bg-white")}
                    onClick={() => setView("table")}
                >
                    Table
                </button>
            </div>
            {filteredTasks?.length === 0 && (<div className='text-2xl font-semibold w-full h-full flex items-center justify-center'>No Task found for this priority</div>)}
            {isLoading ? (<div>Loading...</div>) : view === "list" ? (
                <div className='grid grid-cols-1 gap-4'>
                    {
                        filteredTasks?.map((task: Task) => (
                            <TaskCard key={task.id} task={task} />
                        ))
                    }
                </div>
            ) : (
                view === "table" && filteredTasks && (
                    <div className='w-full'>
                        <DataGrid
                            rows={filteredTasks}
                            columns={columns}
                            checkboxSelection
                            getRowId={(row) => row.id}
                            className={dataGridClassNames}
                            sx={dataGridSxStyles(isDarkMode)}
                        />
                    </div>
                )
            )

            }
        </div>
    )
}

export default PriorityPage
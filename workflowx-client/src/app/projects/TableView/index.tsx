import { useAppSelector } from '@/app/redux';
import Header from '@/components/Header';
import { useGetTasksQuery } from '@/state/api';
import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import clsx from 'clsx';
import { format } from 'date-fns';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utlis';

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

export const columns: GridColDef[] = [
    {
        field: "title",
        headerName: "Title",
        width: 100,
    },
    {
        field: "description",
        headerName: "Description",
        width: 200,
    },
    {
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params) => (
            <span className={clsx("inline-flex rounded-full px-2 text-xs font-semibold leading-5 text-slate-700", params.value === "Under Review" ? "bg-yellow-300" : params.value === "Work In Progress" ? "bg-green-500" : params.value === "To Do" ? "bg-blue-500" : params.value === 'Completed' ? "bg-slate-950" : "bg-gray-600")}>
                {params.value}
            </span>
        ),
    },
    {
        field: "priority",
        headerName: "Priority",
        width: 75,
        renderCell: (params) => (
            <span className={clsx("rounded-full px-2 py-1 text-xs font-semibold w-fit", params.value === "Urgent" ? "bg-red-200 text-red-600" : params.value === "High" ? "bg-yellow-200 text-yellow-600" : params.value === 'Medium' ? "bg-green-200 text-green-600" : params.value === 'Low' ? "bg-blue-200 text-blue-600" : "bg-gray-200 text-gray-600")}>
                {params.value}
            </span>
        ),
    },
    {
        field: "tags",
        headerName: "Tags",
        width: 130,
    },
    {
        field: "startDate",
        headerName: "Start Date",
        width: 130,
        renderCell: (params) => (
            format(new Date(params.value), "P")
        )
    },
    {
        field: "dueDate",
        headerName: "Due Date",
        width: 130,
        renderCell: (params) => (
            format(new Date(params.value), "P")
        )
    },
    {
        field: "author",
        headerName: "Author",
        width: 150,
        renderCell: (params) => params.value?.username || "Unknown",
    },
    {
        field: "assignee",
        headerName: "Assignee",
        width: 150,
        renderCell: (params) => params.value?.username || "Unassigned",
    },
];

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const { data: tasks, error, isLoading } = useGetTasksQuery({ projectId: Number(id) });


    if (isLoading) return <div>Loading.....</div>
    if (error) return <div>Sorry, An Error occurred.</div>

    return (
        <div
            className='h-[540px] px-5 lg:px-10 pb-8'
        >
            <div className="pt-5">
                <Header name='Task Table' buttonComponent={
                    <button
                        className='flex items-center bg-blue-primary px-3 py-2 text-white hover:bg-blue-600'
                        onClick={() => setIsModalNewTaskOpen(true)}
                    >
                        Add Task
                    </button>
                }
                    isSmallText />
            </div>
            <DataGrid
                rows={tasks || []}
                columns={columns}
                className={dataGridClassNames}
                sx={dataGridSxStyles(isDarkMode)}
            />

        </div>
    )
}

export default TableView
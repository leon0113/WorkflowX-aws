"use client";

import Header from "@/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utlis";
import {
    useGetProjectsQuery,
    useGetTasksQuery,
} from "@/state/api";
import { Priority, Project, Task } from "@/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import Image from "next/image";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useAppSelector } from "../redux";

const taskColumns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "projectId", headerName: "project Id", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },
    {
        field: "author", headerName: "Project Manager", width: 250,
        renderCell: (params) => (
            <div className="flex h-full w-full items-center justify-start  flex gap-1">
                <div className="h-9 w-9">
                    <Image
                        src={`https://workflow-s3-images.s3.ap-southeast-2.amazonaws.com/${params.value.profilePictureUrl}`}
                        alt={params.value.username}
                        width={100}
                        height={100}
                        className="h-full rounded-full object-cover"
                    />
                </div>
                <span>{params.value.username}</span>
            </div>
        ),
    },
    {
        field: "startDate", headerName: "Start Date", width: 150,
        renderCell: (params) => (
            <p>
                {format(new Date(params.value), "P")}
            </p>
        )
    },
    {
        field: "dueDate", headerName: "Due Date", width: 150,
        renderCell: (params) => (
            <p>
                {format(new Date(params.value), "P")}
            </p>
        )
    },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = () => {
    const { data: tasks,
        isLoading: tasksLoading,
        isError: tasksError, } = useGetTasksQuery({ projectId: Number("1") })

    const { data: projects, isLoading: isProjectsLoading } = useGetProjectsQuery();

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    if (tasksLoading || isProjectsLoading) return <div>Loading..</div>;
    if (tasksError || !tasks || !projects) return <div>Error fetching data</div>;

    const priorityCount = tasks.reduce(
        (acc: Record<string, number>, task: Task) => {
            const { priority } = task;
            acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
            return acc;
        },
        {},
    );

    const taskDistribution = Object.keys(priorityCount).map((key) => ({
        name: key,
        count: priorityCount[key],
    }));

    const statusCount = projects.reduce(
        (acc: Record<string, number>, project: Project) => {
            const currentDate = new Date();
            const endDateObject = new Date(project.endDate!);
            const status = endDateObject < currentDate ? "Completed" : "Active";
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        },
        {},
    );

    const ProjectStatusCount: Record<'Active' | 'Completed', number> = {
        Active: 3,
        Completed: 7,
    };

    const projectStatus = Object.keys(ProjectStatusCount).map((key) => ({
        name: key,
        count: ProjectStatusCount[key as 'Active' | 'Completed'],
    }));

    const chartColors = isDarkMode
        ? {
            bar: "#8884d8",
            barGrid: "#303030",
            pieFill: "#4A90E2",
            text: "#FFFFFF",
        }
        : {
            bar: "#8884d8",
            barGrid: "#E0E0E0",
            pieFill: "#82ca9d",
            text: "#000000",
        };

    return (
        <div className="container h-full w-[100%] bg-gray-100 bg-transparent p-8">
            <Header name="Your Project Management Dashboard" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
                    <h3 className="mb-4 text-lg font-semibold dark:text-white">
                        Task Priority Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={taskDistribution}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={chartColors.barGrid}
                            />
                            <XAxis dataKey="name" stroke={chartColors.text} />
                            <YAxis stroke={chartColors.text} />
                            <Tooltip
                                contentStyle={{
                                    width: "min-content",
                                    height: "min-content",
                                }}
                            />
                            <Legend />
                            <Bar dataKey="count" fill={chartColors.bar} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
                    <h3 className="mb-4 text-lg font-semibold dark:text-white">
                        Project Status
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie dataKey="count" data={projectStatus} fill="#82ca9d" label>
                                {projectStatus.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
                    <h3 className="mb-4 text-lg hover:text-blue-600 dark:hover:text-blue-600 font-semibold dark:text-white hover:underline cursor-pointer ">
                        Your Tasks
                    </h3>
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={tasks}
                            columns={taskColumns}
                            // checkboxSelection
                            loading={tasksLoading}
                            getRowClassName={() => "data-grid-row"}
                            getCellClassName={() => "data-grid-cell"}
                            className={dataGridClassNames}
                            sx={dataGridSxStyles(isDarkMode)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
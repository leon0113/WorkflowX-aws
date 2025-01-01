import clsx from "clsx";
import { EllipsisVertical, Plus } from "lucide-react";
import { useDrop } from "react-dnd";
import { Status, Task as TaskType } from '@/types';
import Task from "../Task";

type TaskColumnProps = {
    status: string,
    tasks: TaskType[],
    moveTask: (taskId: number, toStatus: string) => void;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
    setGivenStatus: (status: string) => void;
}

const TaskColumn = ({ status, tasks, moveTask, setIsModalNewTaskOpen, setGivenStatus }: TaskColumnProps) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item: { id: number }) => moveTask(item.id, status),
        collect: (monitor: any) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const tasksCount = tasks.filter((task) => task.status === status).length;
    const statusColor: any = {
        "To Do": "#2563EB",
        "Work In Progress": "#059669",
        "Under Review": "#f3f70d",
        "Completed": "#000000",
    };

    return (
        <div
            ref={(instance) => {
                drop(instance)
            }}
            className={clsx("sm:py-2 py-1  rounded-lg", isOver ? "bg-blue-200 dark:bg-neutral-950" : "")}
        >
            <div className='mb-3 flex w-full'>
                <div
                    className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
                    style={{ backgroundColor: statusColor[status] }}
                />

                <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
                    <h3 className='flex items-center text-lg font-semibold dark:text-white'>{status}{" "}
                        <span className='ml-2 w-6 h-6 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary '>{tasksCount}</span>
                    </h3>
                    <div className="flex items-center gap-1">
                        <button className='flex h-6 w-5 items-center justify-center dark:text-neutral-500'>
                            <EllipsisVertical size={26} />
                        </button>
                        <button
                            className='flex size-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white'
                            onClick={() => { setIsModalNewTaskOpen(true), setGivenStatus(status) }}
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {
                tasks.filter((task) => task.status === status).map((task, index) => (
                    <Task
                        key={task.id}
                        task={task}
                    />
                ))
            }
        </div>
    )
};

export default TaskColumn;
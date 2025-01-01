import Header from '@/components/Header';
import TaskColumn from '@/components/TaskColumn';
import { useGetTasksQuery, useUpdateTaskStatusMutation } from '@/state/api';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
    setGivenStatus: (status: string) => void;
};

const TaskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = ({ id, setIsModalNewTaskOpen, setGivenStatus }: Props) => {
    const { data: tasks, isLoading, error } = useGetTasksQuery({ projectId: Number(id) });
    const [updateTaskStatus] = useUpdateTaskStatusMutation();

    const moveTask = (taskId: number, toStatus: string) => {
        updateTaskStatus({ taskId, status: toStatus });
    };

    if (isLoading) return <div>Loading.....</div>
    if (error) return <div>Sorry, An Error occurred.</div>

    return (
        <>
            <div className="pt-5 md:pl-10 px-5 lg:px-10">
                <Header name="Board View" buttonComponent={
                    <button
                        className='flex items-center bg-blue-primary px-3 py-2 text-white hover:bg-blue-600'
                        onClick={() => setIsModalNewTaskOpen(true)}
                    >
                        Add Task
                    </button>
                }
                    isSmallText
                />
            </div>
            <DndProvider backend={HTML5Backend}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 md:pl-10  px-5 lg:px-10">
                    {
                        TaskStatus.map((status, index) => (
                            <TaskColumn
                                key={index}
                                status={status}
                                tasks={tasks || []}
                                moveTask={moveTask}
                                setIsModalNewTaskOpen={setIsModalNewTaskOpen}
                                setGivenStatus={setGivenStatus}
                            />
                        ))
                    }
                </div>
            </DndProvider>
        </>
    )
};





export default BoardView
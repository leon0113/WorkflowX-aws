import { Task } from '@/types'
import Image from 'next/image'
import React from 'react'
import { format } from "date-fns";
import clsx from 'clsx';

type Props = {
    task: Task
}

const TaskCard = ({ task }: Props) => {
    return (
        <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
            {task.attachments && task.attachments.length > 0 && (
                <div>
                    <strong>Attachments:</strong>
                    <div className="flex flex-wrap">
                        {task.attachments && task.attachments.length > 0 && (
                            <Image
                                src={`https://workflow-s3-images.s3.ap-southeast-2.amazonaws.com/${task.attachments[0].fileURL!}`}
                                alt={task.attachments[0].fileName || "Task attachment"}
                                width={400}
                                height={200}
                                className="rounded-md"
                            />
                        )}
                    </div>
                </div>
            )}
            <p>
                <strong>ID:</strong> {task.id}
            </p>
            <p>
                <strong>Project Id:</strong> {task.projectId}
            </p>
            <p>
                <strong>Title:</strong> {task.title}
            </p>
            <p>
                <strong>Description:</strong>{" "}
                {task.description || "No description provided"}
            </p>
            <p>
                <strong>Status:</strong> {task.status}
            </p>
            <div className='flex gap-2'>
                <strong> Priority: </strong>
                <p className={clsx("rounded-full px-2 py-1 text-xs font-semibold w-fit", task.priority === "Urgent" ? "bg-red-200 text-red-600" : task.priority === "High" ? "bg-yellow-200 text-yellow-600" : task.priority === 'Medium' ? "bg-green-200 text-green-600" : task.priority === 'Low' ? "bg-blue-200 text-blue-600" : "bg-gray-200 text-gray-600")}>
                    {task.priority}
                </p>

            </div>
            <p>
                <strong>Tags:</strong> {task.tags || "No tags"}
            </p>
            <p>
                <strong>Start Date:</strong>{" "}
                {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
            </p>
            <p>
                <strong>Due Date:</strong>{" "}
                {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
            </p>
            <p>
                <strong>Author:</strong>{" "}
                {task.author ? task.author.username : "Unknown"}
            </p>
            <p>
                <strong>Assignee:</strong>{" "}
                {task.assignee ? task.assignee.username : "Unassigned"}
            </p>
        </div>
    );
}

export default TaskCard
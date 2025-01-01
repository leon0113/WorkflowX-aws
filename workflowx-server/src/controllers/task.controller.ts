import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.query;
    try {
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                assignee: true,
                author: true,
                comments: true,
                attachments: true,
            },
        });
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: `An error occurred while fetching tasks, Error: ${error}` });
    }
};


export const createTask = async (req: Request, res: Response): Promise<void> => {
    const {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
    } = req.body;
    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            }
        });
        res.status(201).json(newTask);
    } catch (error: any) {
        res.status(500).json({ message: `An error occurred while creating Task, Error: ${error}` });
    }
};



export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(taskId),
            },
            data: {
                status,
            }
        });
        res.json(updatedTask);
    } catch (error: any) {
        res.status(500).json({ message: `An error occurred while updating task, Error: ${error}` });
    }
};


export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    try {
        const tasks = await prisma.task.findMany({
            where: {
                OR: [
                    {
                        authorUserId: Number(userId)
                    },
                    {
                        assignedUserId: Number(userId)
                    }
                ]
            },
            include: {
                assignee: true,
                author: true,
            },
        });
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: `An error occurred while fetching user's tasks, Error: ${error}` });
    }
};

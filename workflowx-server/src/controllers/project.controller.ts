import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await prisma.project.findMany();
        res.json(projects);
    } catch (error: any) {
        res.status(500).json({ message: `An error occurred while fetching projects, Error: ${error}` });
    }
}

export const getSingleProject = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const project = await prisma.project.findUnique({
            where: {
                id: parseInt(id, 10),
            },
        });

        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }

        res.json(project);
    } catch (error: any) {
        res.status(500).json({ message: `An error occurred while fetching projects, Error: ${error}` });
    }
}

export const createProject = async (req: Request, res: Response): Promise<void> => {
    const { name, description, startDate, endDate } = req.body;
    try {
        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                startDate,
                endDate
            }
        });
        res.status(201).json(newProject);
    } catch (error: any) {
        res.status(500).json({ message: `An error occurred while creating project, Error: ${error}` });
    }
};
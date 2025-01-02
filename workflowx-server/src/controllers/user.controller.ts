import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users)
    } catch (error: any) {
        res.status(500).json({ message: `An error occurred while fetching users, Error: ${error}` });
    }
};

export const postUser = async (req: Request, res: Response) => {
    ;
    try {
        const { username, cognitoId, profilePictureUrl = "i1.jpg", teamId } = req.body
        const newUser = await prisma.user.create({
            data: {
                username,
                cognitoId,
                profilePictureUrl,
                teamId
            }
        });
        res.status(200).json({ message: "User created successfully", newUser });
    } catch (error: any) {
        res.status(500).json({ message: `An error occurred while fetching users, Error: ${error}` });
    }

};


export const getUser = async (req: Request, res: Response): Promise<void> => {
    const { cognitoId } = req.params;
    console.log(cognitoId);
    try {
        const user = await prisma.user.findUnique({
            where: {
                cognitoId: cognitoId
            }
        });
        res.status(200).json(user)
    } catch (error: any) {
        res.status(500).json({ message: `An error occurred while fetching user, Error: ${error}` });
    }
};
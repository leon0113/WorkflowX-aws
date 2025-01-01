import { Project } from "@/types";
import React from "react";
import { format } from 'date-fns';
import Link from "next/link";

type Props = {
    project: Project;
};

const ProjectCard = ({ project }: Props) => {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-lg">
            <Link href={`/projects/${project.id}`}><h3 className="text-lg font-semibold text-gray-800 mb-2 hover:underline">{project.name}</h3></Link>
            <p className="text-sm text-gray-600 mb-4">{project.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
                <p>
                    <span className="font-medium text-gray-700">Start Date:</span> {project.startDate && format(new Date(project.startDate), "P")}
                </p>
                <p>
                    <span className="font-medium text-gray-700">End Date:</span> {project.endDate && format(new Date(project.endDate), "P")}
                </p>
            </div>
        </div>
    );
};

export default ProjectCard;

export interface User {
    userId: number;
    cognitoId: string;
    username: string;
    profilePictureUrl?: string;
    email: string;
    teamId?: number;
}


export interface Team {
    id: number;
    teamName: string;
    productOwnerUserId?: number;
    projectManagerUserId?: number;
}

export interface TaskAssignment {
    id: number;
    userId: number;
    taskId: number;

    user?: User;
    task?: Task;
}

export interface ProjectTeam {
    id: number;
    teamId: number;
    projectId: number;

    team?: Team;
    project?: Project;
}

export interface Comment {
    id: number;
    text: string;
    taskId: number;
    userId: number;
}
export interface Attachment {
    id: number;
    fileURL: string;
    fileName?: string;
    taskId: number;
    uploadedById: number;
}

export interface Project {
    id: number;
    name: string;
    description?: string;
    startDate?: string;
    endDate?: string;
};

export enum Status {
    ToDo = "To Do",
    WorkInProgress = "Work In Progress",
    UnderReview = "Under Review",
    Completed = "Completed",
}

export enum Priority {
    Urgent = 'Urgent',
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
    Backlog = 'Backlog',
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    status?: Status;
    priority?: Priority;
    tags?: string;
    startDate?: string;
    dueDate?: string;
    points?: number;
    projectId: number;
    authorUserId?: number;
    assignedUserId?: number;

    author?: User;
    assignee?: User;
    comments?: Comment[];
    attachments?: Attachment[];
}

export interface SearchResults {
    projects: Project[];
    tasks: Task[];
    users: User[];
}

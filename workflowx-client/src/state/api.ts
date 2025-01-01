import { Project, SearchResults, Task, Team, User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: 'api',
    tagTypes: ['Projects', "Tasks", "Users", "Teams"],
    endpoints: (build) => ({
        getProjects: build.query<Project[], void>({
            query: () => 'projects',
            providesTags: ['Projects'],
        }),
        createProject: build.mutation<Project, Partial<Project>>({
            query: (project) => ({
                url: 'projects',
                method: 'POST',
                body: project
            }),
            invalidatesTags: ['Projects']
        }),
        getSingleProject: build.query<Project, { projectId: number }>({
            query: ({ projectId }) => `projects/${projectId}`,
            providesTags: (result, error, { projectId }) => [{ type: "Projects", id: projectId }],
        }),
        getTasks: build.query<Task[], { projectId: number }>({
            query: ({ projectId }) => `tasks?projectId=${projectId}`,
            providesTags: (result) => result ? result.map(({ id }) => ({ type: "Tasks" as const, id })) : [{ type: "Tasks" as const }],
        }),
        createTask: build.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: 'tasks',
                method: 'POST',
                body: task
            }),
            invalidatesTags: ['Tasks']
        }),
        updateTaskStatus: build.mutation<Task, { taskId: number, status: string }>({
            query: ({ taskId, status }) => ({
                url: `tasks/${taskId}/status`,
                method: 'PATCH',
                body: { status }
            }),
            invalidatesTags: (result, error, { taskId }) => [{ type: "Tasks", id: taskId }]
        }),
        search: build.query<SearchResults, string>({
            query: (query) => `search?query=${query}`,
        }),
        getUsers: build.query<User[], void>({
            query: () => 'users',
            providesTags: ["Users"]
        }),
        getTeams: build.query<Team[], void>({
            query: () => 'teams',
            providesTags: ["Teams"]
        }),
        getUserTasks: build.query<Task[], number>({
            query: (userId) => `tasks/user/${userId}`,
            providesTags: (result, error, userId) => result ? result.map(({ id }) => ({ type: "Tasks", id })) : [{ type: "Tasks", id: userId }],
        }),
    })
});

export const { useGetProjectsQuery, useCreateProjectMutation, useGetTasksQuery, useCreateTaskMutation, useUpdateTaskStatusMutation, useGetSingleProjectQuery, useSearchQuery, useGetUsersQuery, useGetTeamsQuery, useGetUserTasksQuery } = api;
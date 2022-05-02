import axios, { AxiosResponse } from 'axios'

// todolists types
export type TodolistApiType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponceType<T = {}> = {
    resultCode: number
    messages: []
    data: T
}

// tasks types

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksType = {
    items: TaskType[],
    totalCount: number,
    error: string | null,
}

export type TaskUpdateType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle= 1,
    High = 2,
    Urgently = 3,
    Later = 4
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a1cb2198-6145-426b-aef5-83678121f4d6',
    }
})

export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistApiType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<{title: string}, AxiosResponse<ResponceType<{item: TodolistApiType}>>>('todo-lists', {title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<{title: string}, AxiosResponse<ResponceType>>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponceType>(`todo-lists/${todolistId}`)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<{title: string}, AxiosResponse<ResponceType<{item: TaskType}>>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponceType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: TaskUpdateType) {
        return instance.put<TaskUpdateType, AxiosResponse<ResponceType<{item: TaskType}>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}
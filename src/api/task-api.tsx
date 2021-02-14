import {baseTodolistsResponseType, instance} from "./todolist-api";

export type taskType = {
    id: string,
    title: string,
    description: string,
    todoListId: string,
    order: number,
    status: taskStatuses,
    priority: taskPriorities,
    startDate: string,
    deadline: string,
    addedDate: string
}
type updateTaskModelType = {
    title: string,
    description: string,
    status: number,
    priority: number,
    deadline: string,
}

export enum taskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum taskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: taskType[]
}


export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<baseTodolistsResponseType<{ item: taskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<baseTodolistsResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: updateTaskModelType) {
        return instance.put<baseTodolistsResponseType<taskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

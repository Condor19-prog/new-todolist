import {baseTodolistsResponseType, instance} from "./todolist-api";

type taskType = {
    id: string,
    title: string,
    description: string,
    todoListId: string,
    order: number,
    status: number,
    priority: number,
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


export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<taskType[]>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<baseTodolistsResponseType>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<baseTodolistsResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: updateTaskModelType) {
        return instance.put<baseTodolistsResponseType<taskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

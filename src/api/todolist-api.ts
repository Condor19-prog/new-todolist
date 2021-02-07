import axios from "axios";
import {create} from "domain";

 const settings = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c9904dcf-3bb3-447f-a0b3-278ebd3674e9'
    }
}
export const instance = axios.create({
    ...settings
})
type todolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type baseTodolistsResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export const todolistAPI = {
    getTodolist() {
        return instance.get<todolistType[]>(`todo-lists`)
    },
    postTodolist(title: string) {
        return instance.post<baseTodolistsResponseType<{ item: todolistType }>>(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<baseTodolistsResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<baseTodolistsResponseType>(`todo-lists/${todolistId}`, {title})
    }
}
import axios from "axios";

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
export type todolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type responseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export const todolistAPI = {
    getTodolist() {
        return instance.get<todolistType[]>(`todo-lists`)
    },
    addTodolist(title: string) {
        return instance.post<responseType<{ item: todolistType }>>(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<responseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<responseType>(`todo-lists/${todolistId}`, {title})
    }
}
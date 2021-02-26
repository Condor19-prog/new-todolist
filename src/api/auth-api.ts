import {responseType, instance} from "./todolist-api";

export type loginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export const authAPI = {
    login(data: loginParamsType) {
        return instance.post<responseType<{ userId: string }>>(`auth/login`, data)
    },
    logout() {
        return instance.delete<responseType>(`auth/login`)
    },
    me() {
        return instance.get<responseType<{ id: number, email: string, login: string }>>(`auth/me`)
    }
}

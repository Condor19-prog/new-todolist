import {ActionsType, setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import {baseTodolistsResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: baseTodolistsResponseType<D>, dispatch: Dispatch<ActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error occurred'))
    }
    dispatch(setAppStatusAC("failed"))
}
export const handleServerNetworkError = <D>(error: { message: string }, dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC("failed"))
}
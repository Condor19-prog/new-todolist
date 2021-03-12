import {filterValuesType} from "../features/todolistList/Todolist";
import {todolistAPI, todolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type addTodolistActionType = ReturnType<typeof addTodolistAC>
export type setTodolistActionType = ReturnType<typeof setTodolistsAC>

type ActionType =
    ReturnType<typeof changeTodolistEntityStatusAC> |
    ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeTodolistTitleAC> |
    ReturnType<typeof changeTodolistFilterAC> |
    ReturnType<typeof setTodolistsAC> |
    ReturnType<typeof changeTodolistEntityStatusAC>

export type TodolistDomainType = todolistType & {
    filter: filterValuesType
    entityStatus: RequestStatusType
}
const initialState: TodolistDomainType[] = []
export const todolistReducer = (state = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [
                {...action.todolist, filter: "all", entityStatus: 'idle'},
                ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'all', entityStatus: 'idle'
                }
            })
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.entityStatus} : tl)
        }
        default:
            return state
    }
}
export const removeTodolistAC = (todolistId: string) => {
    return ({type: "REMOVE-TODOLIST", id: todolistId} as const)
}
export const addTodolistAC = (todolist: todolistType) => {
    return ({type: "ADD-TODOLIST", todolist} as const)
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return ({type: "CHANGE-TODOLIST-TITLE", todolistId, title} as const)
}
export const changeTodolistFilterAC = (todolistId: string, filter: filterValuesType) => {
    return ({type: "CHANGE-TODOLIST-FILTER", todolistId, filter} as const)
}
export const setTodolistsAC = (todolists: todolistType[]) => {
    return ({type: "SET-TODOLISTS", todolists} as const)
}
export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', todolistId, entityStatus} as const
}
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        todolistAPI.getTodolist()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC("succeeded"))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }

export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC("succeeded"))
            })
}
export const addTodolistsTC = (title: string) => (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        todolistAPI.addTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                    dispatch(setAppStatusAC("succeeded"))
                }
            })
}

export const changeTodolistsTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC(todolistId, title))
                    dispatch(setAppStatusAC("succeeded"))
                    dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
}
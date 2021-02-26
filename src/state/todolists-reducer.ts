import {filterValuesType} from "../features/todolistList/Todolist";
import {todolistAPI, todolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

type ActionType =
    removeTodolistActionType
    | addTodolistActionType
    | changeTodolistTitleActionType
    | changeTodolistFilterActionType
    | setTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type setTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: todolistType[]
}
type removeTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type addTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: todolistType
}
type changeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    title: string
}
type changeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistId: string
    filter: filterValuesType
}
export type TodolistDomainType = todolistType & {
    filter: filterValuesType
    entityStatus: RequestStatusType
}
const initialState: TodolistDomainType[] = []
export const todolistReducer = (state = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let filteredTodolist = state.filter(tl => tl.id !== action.id)
            return filteredTodolist;
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all", entityStatus: 'idle'}
            return [newTodolist, ...state]
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
export const removeTodolistAC = (todolistId: string): removeTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const addTodolistAC = (todolist: todolistType): addTodolistActionType => {
    return {type: "ADD-TODOLIST", todolist}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): changeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", todolistId, title}
}
export const changeTodolistFilterAC = (todolistId: string, filter: filterValuesType): changeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", todolistId, filter}
}
export const setTodolistsAC = (todolists: todolistType[]): setTodolistsActionType => {
    return {type: "SET-TODOLISTS", todolists}
}
export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', todolistId, entityStatus} as const
}
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
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
}
export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC("succeeded"))
            })
    }
}
export const addTodolistsTC = (title: string) => {

    return (dispatch: Dispatch) => {
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
}
export const changeTodolistsTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
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
}
import {v1} from "uuid";
import {filterValuesType} from "../Todolist";
import {todolistAPI, todolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

type ActionType =
    removeTodolistActionType
    | addTodolistActionType
    | changeTodolistTitleActionType
    | changeTodolistFilterActionType
    | setTodolistsActionType

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
    id: string
    title: string
}
type changeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: filterValuesType
}
export type TodolistDomainType = todolistType & {
    filter: filterValuesType
}
const initialState: TodolistDomainType[] = []
export const todolistReducer = (state = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let filteredTodolist = state.filter(tl => tl.id !== action.id)
            return filteredTodolist;
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'all'
                }
            })
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
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: title}
}
export const changeTodolistFilterAC = (todolistId: string, filter: filterValuesType): changeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter}
}
export const setTodolistsAC = (todolists: todolistType[]): setTodolistsActionType => {
    return {type: "SET-TODOLISTS", todolists}
}
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolist()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const addTodolistsTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.addTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}
export const changeTodolistsTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
    }
}
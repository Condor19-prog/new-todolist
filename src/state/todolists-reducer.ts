import {v1} from "uuid";
import {filterValuesType} from "../Todolist";
import {todolistType} from "../AppWithRedux";

type ActionType =
    removeTodolistActionType
    | addTodolistActionType
    | changeTodolistTitleActionType
    | changeTodolistFilterActionType

type removeTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type addTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
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
const initialState: todolistType[] = []
export const todolistReducer = (state = initialState, action: ActionType): todolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let filteredTodolist = state.filter(tl => tl.id !== action.id)
            return filteredTodolist;
        }
        case 'ADD-TODOLIST': {
            const todolistId = action.todolistId
            const todolist: todolistType = {id: todolistId, title: action.title, filter: "all"}
            return [...state, todolist]
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
        default:
            return state
    }
}
export const removeTodolistAC = (todolistId: string): removeTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const addTodolistAC = (title: string): addTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title, todolistId: v1()}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): changeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: title}
}
export const changeTodolistFilterAC = (todolistId: string, filter: filterValuesType): changeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter}
}
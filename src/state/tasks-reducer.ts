import {addTodolistActionType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";

type actionsType = removeTaskACType |
    addTaskACType |
    changeTaskStatusACType |
    changeTaskTitleACType |
    addTodolistActionType |
    removeTodolistType
type removeTaskACType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type addTaskACType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type changeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todolistId: string
    isDone: boolean
}
type changeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}
type removeTodolistType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: actionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const todolist = state[action.todolistId]
            const removeTask = todolist.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = removeTask
            return stateCopy
        }
        case 'ADD-TASK': {
            const task = {id: v1(), title: action.title, isDone: false}
            const stateCopy = {...state}
            const todolistTasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = [...todolistTasks, task]
            return {...stateCopy}
        }
        case "CHANGE-TASK-STATUS": {
            // const stateCopy = {...state}
            // const task = stateCopy[action.todolistId]
            // stateCopy[action.todolistId] = task.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            // return {...stateCopy}
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            // const stateCopy = {...state}
            // const changeTaskTitle = stateCopy[action.todolistId].find(t => t.id === action.taskId)
            // if (changeTaskTitle) {
            //     changeTaskTitle.title = action.title
            // }
            // return {...stateCopy}
            return {...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        default:
            return state
    }
}
export const removeTaskAC = (taskId: string, todolistId: string): removeTaskACType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): addTaskACType => {
    return {type: "ADD-TASK", title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusACType => {
    return {type: "CHANGE-TASK-STATUS", isDone, taskId, todolistId}
}
export const changeTaskTitleAC = (taskId: string, todolistId: string, title: string): changeTaskTitleACType => {
    return {type: "CHANGE-TASK-TITLE", taskId, todolistId, title}
}
export const RemoveTodolistAC = (todolistId: string): removeTodolistType => {
    return {type: "REMOVE-TODOLIST", todolistId}
}
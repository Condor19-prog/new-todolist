import {
    addTodolistActionType,
    changeTodolistEntityStatusAC,
    setTodolistActionType,
} from "./todolists-reducer";
import {tasksAPI, taskStatuses, taskType, updateTaskModelType} from "../api/task-api";
import {Dispatch} from "redux";
import {appRootStateType} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type TasksStateType = {
    [key: string]: taskType[]
}
type actionsType =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof updateTaskAC> |
    ReturnType<typeof RemoveTodolistAC> |
    ReturnType<typeof setTasksAC> |
    addTodolistActionType |
    setTodolistActionType

export type setTasksActionType = {
    type: 'SET-TASKS'
    tasks: taskType[]
    todolistId: string
}
export type updateDomainTaskModelType = {
    title?: string,
    description?: string,
    status?: number,
    priority?: number,
    deadline?: string,
    stateDate?: string
}
const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: actionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // const stateCopy = {...state}
            // const todolist = state[action.todolistId]
            // const removeTask = todolist.filter(t => t.id !== action.taskId)
            // stateCopy[action.todolistId] = removeTask
            // return stateCopy
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case 'ADD-TASK':
            // const stateCopy = {...state}//делаем копию
            // const newTask = action.task//создаем таску
            // const tasks = stateCopy[newTask.todoListId]//находим тудулист
            // const newTasks = [newTask, ...tasks]//закидываем новую такску ко всем таскам
            // stateCopy[newTask.todoListId] = newTasks//переприсваиваем таски этому тудулисту
            // return stateCopy
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case "UPDATE-TASK": {
            // const stateCopy = {...state}
            // const task = stateCopy[action.todolistId]
            // stateCopy[action.todolistId] = task.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            // return {...stateCopy}
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    ...action.model
                } : t)
            }
        }
        case "ADD-TODOLIST":
            return {
                [action.todolist.id]: [], ...state
            }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return ({type: 'REMOVE-TASK', todolistId, taskId} as const)
}
export const addTaskAC = (task: taskType) => {
    return ({type: "ADD-TASK", task} as const)
}
export const updateTaskAC = (taskId: string, model: updateDomainTaskModelType, todolistId: string) => {
    return ({type: "UPDATE-TASK", model, taskId, todolistId} as const)
}

export const RemoveTodolistAC = (todolistId: string) => {
    return ({type: "REMOVE-TODOLIST", todolistId} as const)
}

export const setTasksAC = (tasks: taskType[], todolistId: string) => {
    return ({type: "SET-TASKS", tasks, todolistId} as const)
}
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        tasksAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
                dispatch(setAppStatusAC("succeeded"))
            })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        tasksAPI.deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setAppStatusAC("succeeded"))
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
            })
}
export const addTaskTC = (newTaskTitle: string, todolistId: string) => (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        tasksAPI.createTask(todolistId, newTaskTitle)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setAppStatusAC("succeeded"))
                    dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
}
export const changeTaskStatusTC = (todolistId: string, status: taskStatuses, taskId: string) => (dispatch: Dispatch, getState: () => appRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const model: updateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            status: status,
            title: task.title
        }
        tasksAPI.updateTask(todolistId, taskId, model)
            .then(() => {
                dispatch(updateTaskAC(taskId, model, todolistId))
            })
}

export const updateTaskTC = (todolistId: string, domainModel: updateDomainTaskModelType, taskId: string) => {
    return (dispatch: Dispatch, getState: () => appRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const apiModel: updateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            status: task.status,
            title: task.title,
            ...domainModel
        }
        tasksAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                } else {
                    handleServerAppError(res.data, dispatch)

                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
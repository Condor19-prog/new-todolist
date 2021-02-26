import {Grid, Paper} from "@material-ui/core";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import Todolist, {filterValuesType} from "./todolistList/Todolist";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {appRootStateType} from "../state/store";
import {
    addTodolistsTC, changeTodolistFilterAC,
    changeTodolistsTC,
    fetchTodolistsTC,
    removeTodolistsTC,
    TodolistDomainType
} from "../state/todolists-reducer";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "../state/tasks-reducer";
import {taskStatuses} from "../api/task-api";
import {Redirect} from "react-router-dom";

export type propsType = {
    demo?: boolean
}

export const TodolistList: React.FC<propsType> = ({demo}) => {
    const todolists = useSelector<appRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<appRootStateType, TasksStateType>(state => state.tasks)
     const isLoggedIn = useSelector<appRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        } else {
            dispatch(fetchTodolistsTC())
        }
    }, [dispatch, demo, isLoggedIn])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [dispatch])
    const addTask = useCallback((newTaskTitle: string, todolistId: string) => {
        dispatch(addTaskTC(newTaskTitle, todolistId))
    }, [dispatch])
    const changeStatus = useCallback((taskId: string, status: taskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, {status}, taskId))
    }, [dispatch])
    const changeTasksTitle = useCallback((taskId: string, todolistId: string, newTitle: string) => {
        dispatch(updateTaskTC(todolistId, {title: newTitle}, taskId))
    }, [dispatch])
    const removeTodolists = useCallback((todolistId: string) => {
        dispatch(removeTodolistsTC(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistsTC(title))
    }, [dispatch])
    const onChangeTitle = useCallback((todolistId: string, newTitle: string) => {   /*изменение названия тудулиста*/
        dispatch(changeTodolistsTC(todolistId, newTitle))
    }, [dispatch])
    const changeFilter = useCallback((filter: filterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatch(action)
    }, [dispatch])
    if (!isLoggedIn) {
        debugger
        return <Redirect to='/login'/>
    }
    return (
        <>
            <Grid container style={{padding: 20}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={6}>
                {todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return (
                        <Grid item key={tl.id}>
                            <Paper elevation={3} style={{padding: 10}}>
                                <Todolist
                                    demo={demo}
                                    todolist={tl}
                                    key={tl.id}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    removeTodolists={removeTodolists}
                                    changeTasksTitle={changeTasksTitle}
                                    onChangeTitle={onChangeTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}




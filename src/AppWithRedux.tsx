import React, {useCallback} from 'react';
import './App.css';
import Todolist, {filterValuesType, taskType} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {appRootStateType} from "./state/store";


export type todolistType = {
    id: string
    title: string
    filter: filterValuesType
}
export type TasksStateType = {
    [key: string]: taskType[]
}

function AppWithRedux() {

    const todolists = useSelector<appRootStateType, todolistType[]>(state => state.todolists)
    const tasks = useSelector<appRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((newTaskTitle: string, todolistId: string) => {
        const action = addTaskAC(newTaskTitle, todolistId)
        dispatch(action)
    }, [dispatch])
    const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatch(action)
    }, [dispatch])
    const changeTasksTitle = useCallback((taskId: string, todolistId: string, newTitle: string) => {
        const action = changeTaskTitleAC(taskId, todolistId, newTitle)
        dispatch(action)
    }, [dispatch])
    const removeTodolists = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])
    const onChangeTitle = useCallback((todolistId: string, newTitle: string) => {   /*изменение названия тудулиста*/
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback((filter: filterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
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
                                        todolistId={tl.id}
                                        key={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolists={removeTodolists}
                                        changeTasksTitle={changeTasksTitle}
                                        onChangeTitle={onChangeTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                    }
                </Grid>

            </Container>
        </div>
    )
}

export default AppWithRedux

import React, {useCallback, useEffect} from 'react';
import '../App.css';
import Todolist, {filterValuesType} from "./Todolist";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {
    addTodolistsTC,
    changeTodolistFilterAC, changeTodolistsTC,
    fetchTodolistsTC,
    removeTodolistsTC, TodolistDomainType
} from "../state/todolists-reducer";
import {
    addTaskTC,
    removeTaskTC, updateTaskTC
} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {appRootStateType} from "../state/store";
import {taskStatuses, taskType} from "../api/task-api";
import {RequestStatusType} from "../state/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

export type TasksStateType = {
    [key: string]: taskType[]
}
type propsType = {
    demo?: boolean
}
const AppWithRedux: React.FC<propsType> = ({demo = false}) => {

    const todolists = useSelector<appRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<appRootStateType, TasksStateType>(state => state.tasks)
    const status = useSelector<appRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!demo) {
            dispatch(fetchTodolistsTC())
        }
    }, [dispatch])

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
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
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
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}

export default AppWithRedux

import React, {useCallback, useEffect} from "react";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import EditableSpan from "../components/EditableSpan/EditableSpan";
import {Button} from "@material-ui/core";
import {useStyles} from "../styles";
import DeleteIcon from '@material-ui/icons/Delete';
import Task from "./task/Task";
import {taskStatuses, taskType} from "../api/task-api";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../state/tasks-reducer";
import {TodolistDomainType} from "../state/todolists-reducer";

export type filterValuesType = 'all' | 'active' | 'completed'

type todolistPropsType = {
    todolist: TodolistDomainType
    tasks: taskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (values: filterValuesType, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: taskStatuses, todolistId: string) => void
    removeTodolists: (todolistId: string) => void
    changeTasksTitle: (taskId: string, todolistId: string, newTitle: string) => void
    onChangeTitle: (todolistId: string, newTitle: string) => void
    demo?: boolean
}


const Todolist: React.FC<todolistPropsType> = React.memo(({
                                                              tasks,
                                                              removeTask,
                                                              changeFilter,
                                                              addTask,
                                                              changeTaskStatus,
                                                              todolist,
                                                              removeTodolists,
                                                              changeTasksTitle,
                                                              onChangeTitle,
                                                              demo
                                                          }) => {
    console.log("Todolist called")
    if (typeof demo === 'undefined') demo = false
    const dispatch = useDispatch()

    useEffect(() => {
        if (!demo) {
            dispatch(fetchTasksTC(todolist.id))
        }
    }, [dispatch, todolist.id])

    const onAllClickHandler = useCallback(() => {
        changeFilter('all', todolist.id)
    }, [changeFilter, todolist.id])
    const onActiveClickHandler = useCallback(() => {
        changeFilter('active', todolist.id)
    }, [changeFilter, todolist.id])
    const onCompletedClickHandler = useCallback(() => {
        changeFilter('completed', todolist.id)
    }, [changeFilter, todolist.id])
    const removeTodolist = () => {
        removeTodolists(todolist.id)
    }
    const addTaskTitle = useCallback((title: string) => {
        addTask(title, todolist.id)
    }, [addTask, todolist.id])
    const onChangeTodolistTitle = useCallback((newTitle: string) => {
        onChangeTitle(todolist.id, newTitle)
    }, [onChangeTitle, todolist.id])

    const classes = useStyles()

    let tasksForTodolist = tasks
    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === taskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === taskStatuses.Completed)
    }

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={todolist.title} onChange={onChangeTodolistTitle}/>
                    <Button className={classes.smallBtn} onClick={removeTodolist}
                            disabled={todolist.entityStatus === 'loading'}><DeleteIcon/></Button>
                </h3>
                <AddItemForm addItem={addTaskTitle} entityStatus={todolist.entityStatus}/>

            </div>
            <ul>
                {tasksForTodolist.map(t => (
                    <Task
                        key={t.id}
                        todolistId={todolist.id}
                        removeTask={removeTask}
                        changeTasksTitle={changeTasksTitle}
                        changeTaskStatus={changeTaskStatus}
                        task={t}
                        entityStatus={todolist.entityStatus}
                    />
                ))}
            </ul>
            <div>
                <Button className={todolist.filter === 'all' ? classes.red : classes.blue}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button className={todolist.filter === 'active' ? classes.red : classes.blue}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button className={todolist.filter === 'completed' ? classes.red : classes.blue}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})
export default Todolist

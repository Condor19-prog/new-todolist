import React, {useCallback} from "react";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button} from "@material-ui/core";
import {useStyles} from "./styles";
import DeleteIcon from '@material-ui/icons/Delete';
import Task from "./Task";
import {taskStatuses, taskType} from "./api/task-api";

export type filterValuesType = 'all' | 'active' | 'completed'

type todolistPropsType = {
    title: string
    tasks: taskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (values: filterValuesType, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: taskStatuses, todolistId: string) => void
    filter: filterValuesType
    todolistId: string
    removeTodolists: (todolistId: string) => void
    changeTasksTitle: (taskId: string, todolistId: string, newTitle: string) => void
    onChangeTitle: (todolistId: string, newTitle: string) => void
}


const Todolist: React.FC<todolistPropsType> = React.memo(({
                                                              title,
                                                              tasks,
                                                              removeTask,
                                                              changeFilter,
                                                              addTask,
                                                              changeTaskStatus,
                                                              filter,
                                                              todolistId,
                                                              removeTodolists,
                                                              changeTasksTitle,
                                                              onChangeTitle
                                                          }) => {
    console.log("Todolist called")

    const onAllClickHandler = useCallback(() => {
        changeFilter('all', todolistId)
    }, [changeFilter, todolistId])
    const onActiveClickHandler = useCallback(() => {
        changeFilter('active', todolistId)
    }, [changeFilter, todolistId])
    const onCompletedClickHandler = useCallback(() => {
        changeFilter('completed', todolistId)
    }, [changeFilter, todolistId])
    const removeTodolist = () => {
        removeTodolists(todolistId)
    }
    const addTaskTitle = useCallback((title: string) => {
        addTask(title, todolistId)
    }, [addTask, todolistId])
    const onChangeTodolistTitle = useCallback((newTitle: string) => {
        onChangeTitle(todolistId, newTitle)
    }, [onChangeTitle, todolistId])

    const classes = useStyles()

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === taskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === taskStatuses.Completed)
    }

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={title} onChange={onChangeTodolistTitle}/>
                    <Button className={classes.smallBtn} onClick={removeTodolist}><DeleteIcon/></Button>
                </h3>
                <AddItemForm addItem={addTaskTitle}/>

            </div>
            <ul>
                {tasksForTodolist.map(t => (
                    <Task
                        key={t.id}
                        todolistId={todolistId}
                        removeTask={removeTask}
                        changeTasksTitle={changeTasksTitle}
                        changeTaskStatus={changeTaskStatus}
                        task={t}
                    />
                ))}
            </ul>
            <div>
                <Button className={filter === 'all' ? classes.red : classes.blue}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button className={filter === 'active' ? classes.red : classes.blue}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button className={filter === 'completed' ? classes.red : classes.blue}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})
export default Todolist

import React, {ChangeEvent} from "react";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {useStyles} from "./styles";
import DeleteIcon from '@material-ui/icons/Delete';

export type filterValuesType = 'all' | 'active' | 'completed'

export type taskType = {
    id: string
    title: string
    isDone: boolean
}
type todolistPropsType = {
    title: string
    tasks: taskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (values: filterValuesType, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: filterValuesType
    todolistId: string
    removeTodolists: (todolistId: string) => void
    changeTasksTitle: (taskId: string, todolistId: string, newTitle: string) => void
    onChangeTitle: (todolistId: string, newTitle: string) => void
}


const Todolist: React.FC<todolistPropsType> = ({
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
    const onAllClickHandler = () => {
        changeFilter('all', todolistId)
    }
    const onActiveClickHandler = () => {
        changeFilter('active', todolistId)
    }
    const onCompletedClickHandler = () => {
        changeFilter('completed', todolistId)
    }
    const removeTodolist = () => {
        removeTodolists(todolistId)
    }
    const addTaskTitle = (title: string) => {
        addTask(title, todolistId)
    }
    const onChangeTodolistTitle = (newTitle: string) => {
        onChangeTitle(todolistId, newTitle)
    }
    const classes = useStyles()

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
                {tasks.map(t => {
                    const onClickHandler = () => removeTask(t.id, todolistId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDoneChecked = e.currentTarget.checked
                        changeTaskStatus(t.id, newIsDoneChecked, todolistId)
                    }
                    const onChangeTitleTask = (newTitle: string) => {
                        changeTasksTitle(t.id, todolistId, newTitle)
                    }
                    return <li key={t.id} className={t.isDone === true ? 'completed-task' : ''}>
                        <Checkbox
                            checked={t.isDone}
                            onChange={onChangeHandler}
                        />
                        <EditableSpan title={t.title} onChange={onChangeTitleTask}/>
                        <IconButton className={classes.removeTask} onClick={onClickHandler}>&times;</IconButton>
                    </li>
                })}
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
}
export default Todolist

import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {taskType} from "./Todolist";
import {useStyles} from "./styles";

export type taskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTasksTitle: (taskId: string, todolistId: string, newTitle: string) => void
    task: taskType
    todolistId: string
}
const Task: React.FC<taskPropsType> = React.memo(({
                                                      removeTask,
                                                      changeTaskStatus,
                                                      changeTasksTitle,
                                                      task,
                                                      todolistId
                                                  }) => {
    const classes = useStyles()

    const onClickHandler = () => removeTask(task.id, todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneChecked = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneChecked, todolistId)
    }
    const onChangeTitleTask = useCallback((newTitle: string) => {
        changeTasksTitle(task.id, todolistId, newTitle)
    }, [changeTasksTitle, task.id, todolistId])

    return (
        <li key={task.id} className={task.isDone === true ? 'completed-task' : ''}>
            <Checkbox
                checked={task.isDone}
                onChange={onChangeHandler}
            />
            <EditableSpan title={task.title} onChange={onChangeTitleTask}/>
            <IconButton className={classes.removeTask} onClick={onClickHandler}>&times;</IconButton>
        </li>
    )
})
export default Task
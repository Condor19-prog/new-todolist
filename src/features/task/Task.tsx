import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "../../components/EditableSpan/EditableSpan";
import {useStyles} from "../../styles";
import {taskStatuses, taskType} from "../../api/task-api";
import {RequestStatusType} from "../../state/app-reducer";

export type taskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: taskStatuses, todolistId: string) => void
    changeTasksTitle: (taskId: string, todolistId: string, newTitle: string) => void
    task: taskType
    todolistId: string
    entityStatus?: RequestStatusType
}
const Task: React.FC<taskPropsType> = React.memo(({
                                                      removeTask,
                                                      changeTaskStatus,
                                                      changeTasksTitle,
                                                      task,
                                                      todolistId,
                                                      entityStatus
                                                  }) => {
    const classes = useStyles()

    const onClickHandler = () => removeTask(task.id, todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneChecked = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneChecked ? taskStatuses.Completed: taskStatuses.New, todolistId)
    }
    const onChangeTitleTask = useCallback((newTitle: string) => {
        changeTasksTitle(task.id, todolistId, newTitle)
    }, [changeTasksTitle, task.id, todolistId])

    return (
        <li key={task.id} className={task.status === taskStatuses.Completed ? 'completed-task' : ''}>
            <Checkbox
                checked={task.status === taskStatuses.Completed}
                onChange={onChangeHandler}
            />
            <EditableSpan title={task.title} onChange={onChangeTitleTask}/>
            <IconButton className={classes.removeTask} onClick={onClickHandler} disabled={entityStatus === 'loading'}>&times;</IconButton>
        </li>
    )
})
export default Task
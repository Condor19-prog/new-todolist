import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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

    return (
        <div>
            <div>
                <EditableSpan title={title} onChange={onChangeTodolistTitle}/>
                <button onClick={removeTodolist}>&times;</button>

                <AddItemForm addItem={addTaskTitle}/>
            </div>
            <ul>
                {tasks.map(t => {
                    const onClickHandler = () => removeTask(t.id, todolistId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDoneChecked = e.currentTarget.checked
                        changeTaskStatus(t.id, newIsDoneChecked, todolistId)
                    }
                    const onChangeTitleHandler = (newTitle: string) => {
                        changeTasksTitle(t.id, todolistId, newTitle)
                    }
                    return <li key={t.id} className={t.isDone === true ? 'completed-task' : ''}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={onChangeHandler}
                        />
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <button onClick={onClickHandler}> x</button>
                    </li>
                })}
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}
export default Todolist
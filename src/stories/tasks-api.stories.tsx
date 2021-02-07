import React, {useEffect, useState} from "react";
import {tasksAPI} from "../api/task-api";

export default {
    title: 'API Tasks'
}

export const GetTasks = () => {
    const [tasks, setTasks] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')

    const getTasks = () => {
        tasksAPI.getTasks(todolistId).then(res => setTasks(res.data))
    }

    return (
        <>
            {JSON.stringify({tasks})}
            <input type="text" placeholder={'todolistID'} value={todolistId}
                   onChange={e => setTodolistId(e.currentTarget.value)}/>
            <button onClick={getTasks}>Get Tasks</button>
        </>
    )
}

export const CreateTasks = () => {
    const [tasks, setTasks] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTasks = () => {
        tasksAPI.createTask(todolistId, title)
            .then(res => setTasks(res.data))
    }

    return (
        <>
            {JSON.stringify({tasks})}
            <input type="text" placeholder={'todolistID'} value={todolistId}
                   onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input type="text" placeholder={'title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
            <button onClick={createTasks}>createTasks</button>
        </>
    )
}
export const DeleteTask = () => {
    const [tasks, setTasks] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTasks = () => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then(res => setTasks(res.data))
    }
    return (
        <>
            {JSON.stringify({tasks})}
            <input type="text" placeholder={'todolistID'} value={todolistId}
                   onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input type="text" placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTasks}>deleteTasks</button>
        </>
    )
}
export const UpdateTask = () => {
    const [tasks, setTasks] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(1)
    const [priority, setPriority] = useState<number>(1)
    const [deadline, setDeadline] = useState<string>('')

    const updateTask = () => {
        tasksAPI.updateTask(todolistId, taskId, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            deadline: ''
        })
            .then(res => setTasks(res.data))
    }
    return (
        <>
            {JSON.stringify({tasks})}
            <input type="text" placeholder={'todolistID'} value={todolistId}
                   onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input type="text" placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
            <input type="text" placeholder={'title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
            <input type="text" placeholder={'description'} value={description}
                   onChange={e => setDescription(e.currentTarget.value)}/>
            <input type="text" placeholder={'status'} value={status} onChange={e => setStatus(+e.currentTarget.value)}/>
            <input type="text" placeholder={'priority'} value={priority}
                   onChange={e => setPriority(+e.currentTarget.value)}/>
            <input type="text" placeholder={'deadline'} value={deadline}
                   onChange={e => setDeadline(e.currentTarget.value)}/>
            <button onClick={updateTask}>updateTask</button>
        </>
    )
}
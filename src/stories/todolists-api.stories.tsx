import React, {useEffect, useState} from "react";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.getTodolist()
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = `NEW-TODOLIST ${new Date().getSeconds()}`
        todolistAPI.postTodolist(title)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'f7ee537a-d70a-4a6b-bd23-2a081f5074cd'
        todolistAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'edfb7d15-46c6-45e1-9df6-c9e1fe2abaf2'
        const title = 'updateTodolist'
        todolistAPI.updateTodolist(todolistId, title)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
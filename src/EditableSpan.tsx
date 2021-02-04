import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";
import './App.css'

export type editableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}

const EditableSpan = React.memo((props: editableSpanType) => {
    console.log('EditableSpan called')
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode ?
        <TextField type="text" value={title} onBlur={activateViewMode} autoFocus onChange={onChangeTaskTitle}/> :
        <span className={'title-task'} onDoubleClick={activateEditMode}>{props.title}</span>
})
export default EditableSpan
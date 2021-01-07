import React, {ChangeEvent, useState} from "react";

type editableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}

const EditableSpan = (props: editableSpanType) => {
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
        <input type="text" value={title} onBlur={activateViewMode} autoFocus onChange={onChangeTaskTitle}/> :
        <span onDoubleClick={activateEditMode}>{props.title}</span>
}
export default EditableSpan
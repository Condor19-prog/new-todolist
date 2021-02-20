import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {useStyles} from "../../styles";
import {RequestStatusType} from "../../state/app-reducer";


export type addItemFormType = {
    addItem: (title: string) => void
    entityStatus?: RequestStatusType
}

const AddItemForm = React.memo((props: addItemFormType) => {
    console.log('AddItemForm called')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskTitle = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null)
        if (e.key === 'Enter') {
            addTaskTitle()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const classes = useStyles()
    return (
        <div>
            <TextField error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       variant="outlined"
                       label={'Type value...'}
                       helperText={error}
                       disabled={props.entityStatus === 'loading'}
            />
            <Button className={classes.smallBtn} onClick={addTaskTitle} disabled={props.entityStatus === 'loading'}>Add</Button>
        </div>
    )
})
export default AddItemForm
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type addItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: addItemFormType) => {
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
        if (e.key === 'Enter') {
            props.addItem(title)
            setTitle('')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTaskTitle}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}
export default AddItemForm
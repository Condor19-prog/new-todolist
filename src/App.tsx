import React, {useState} from 'react';
import './App.css';
import Todolist, {filterValuesType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type todolistType = {
    id: string
    title: string
    filter: filterValuesType
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<todolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'active'}
    ])
    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React API', isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React book', isDone: false},
            {id: v1(), title: 'Sugar', isDone: true}
        ]
    })

    const removeTask = (taskId: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]/*достаем нужный тудулист*/
        todolistTasks = todolistTasks.filter(t => t.id !== taskId)/*отфильтровываем*/
        tasks[todolistId] = todolistTasks/*и запихиваем отфильтрованые такски в ТЛ*/
        setTasks({...tasks})/*перерисовываем*/
    }
    const addTask = (newTaskTitle: string, todolistId: string) => {
        let task = {id: v1(), title: newTaskTitle, isDone: false} /*создается таска*/
        const todolistTasks = tasks[todolistId]/*достаем нужный массив*/
        tasks[todolistId] = [task, ...todolistTasks]/*добавляется таска в этот тудулист и делается копия этого тудулиста*/
        setTasks({...tasks})/*и перерисовывается весь массив тудулистов*/
    }
//я в таксках ищу такску(t) которая равна taskId и запишу в task
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const todolistTasks = tasks[todolistId] /*достается нужный тудулист*/
        const task = todolistTasks.find(t => t.id === taskId)/*находим в этом ТЛ такску с нажатым айди*/
        if (task) {/*если такска нашлась*/
            task.isDone = isDone/*меняем ей на противоположный*/
        }
        setTasks({...tasks})/*перерисовываем весь массив*/
    }
    const changeTasksTitle = (taskId: string, todolistId: string, newTitle: string) => {
        const todolistTask = tasks[todolistId]
        const todolistTaskTitle = todolistTask.find(t => t.id === taskId)
        if(todolistTaskTitle){
            todolistTaskTitle.title = newTitle
        }
        setTasks({...tasks})
    }

    const removeTodolists = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists([...filteredTodolist])
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodolist = (title: string) => {
        const todolistId = v1()
        const todolist: todolistType = {id: todolistId, title: title, filter: "all"}
        setTodolists([...todolists, todolist])
        setTasks({...tasks, [todolistId]: []})
    }
    const onChangeTitle = (todolistId: string, newTitle: string) => {   /*изменение названия тудулиста*/
        const todolistTitle = todolists.find(tl => tl.id === todolistId)
        if(todolistTitle){
            todolistTitle.title = newTitle
        }
        setTodolists([...todolists])
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(tl => {
                let tasksForTodolist = tasks[tl.id]
                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                }
                const changeFilter = (value: filterValuesType, todolistId: string) => {
                    const todolist = todolists.find(tl => tl.id === todolistId)
                    if (todolist) {
                        todolist.filter = value
                        setTodolists([...todolists])
                    }
                }
                return (
                    <Todolist
                        todolistId={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolists={removeTodolists}
                        changeTasksTitle={changeTasksTitle}
                        onChangeTitle={onChangeTitle}
                    />
                )
            })
            }
        </div>
    )
}

export default App

import React, {useReducer, useState} from 'react';
// import './App.css';
// import Todolist, {filterValuesType, taskType} from "./Todolist";
// import {v1} from "uuid";
// import AddItemForm from "./AddItemForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
// import MenuIcon from '@material-ui/icons/Menu';
// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistReducer
// } from "./state/todolists-reducer";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
//
//
// export type todolistType = {
//     id: string
//     title: string
//     filter: filterValuesType
// }
// export type TasksStateType = {
//     [key: string]: taskType[]
// }
//
// function AppWithReducers() {
//     const todolistId1 = v1()
//     const todolistId2 = v1()
//
//     const [todolists, dispatchToTodolist] = useReducer(todolistReducer, [
//         {id: todolistId1, title: 'What to learn', filter: 'all'},
//         {id: todolistId2, title: 'What to buy', filter: 'active'}
//     ])
//     let [tasks, dispatchToTask] = useReducer(tasksReducer, {
//         [todolistId1]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JS', isDone: false},
//             {id: v1(), title: 'React API', isDone: true}
//         ],
//         [todolistId2]: [
//             {id: v1(), title: 'Milk', isDone: true},
//             {id: v1(), title: 'React book', isDone: false},
//             {id: v1(), title: 'Sugar', isDone: true}
//         ]
//     })
//
//     const removeTask = (taskId: string, todolistId: string) => {
//         const action = removeTaskAC(taskId, todolistId)
//         dispatchToTask(action)
//     }
//     const addTask = (newTaskTitle: string, todolistId: string) => {
//         const action = addTaskAC(newTaskTitle, todolistId)
//         dispatchToTask(action)
//     }
// //я в таксках ищу такску(t) которая равна taskId и запишу в task
//     const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
//         const action = changeTaskStatusAC(taskId, isDone, todolistId)
//         dispatchToTask(action)
//     }
//     const changeTasksTitle = (taskId: string, todolistId: string, newTitle: string) => {
//         const action = changeTaskTitleAC(taskId, todolistId, newTitle)
//         dispatchToTask(action)
//     }
//
//     const removeTodolists = (todolistId: string) => {
//         const action = removeTodolistAC(todolistId)
//         dispatchToTodolist(action)
//     }
//     const addTodolist = (title: string) => {
//         const action = addTodolistAC(title)
//         dispatchToTodolist(action)
//         dispatchToTask(action)
//     }
//     const onChangeTitle = (todolistId: string, newTitle: string) => {   /*изменение названия тудулиста*/
//         const action = changeTodolistTitleAC(todolistId, newTitle)
//         dispatchToTodolist(action)
//     }
//
//
//     return (
//         <div className="App">
//
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <MenuIcon/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//
//             <Container fixed>
//                 <Grid container style={{padding: 20}}>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={6}>
//                     {todolists.map(tl => {
//                         let tasksForTodolist = tasks[tl.id]
//                         if (tl.filter === 'active') {
//                             tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
//                         }
//                         if (tl.filter === 'completed') {
//                             tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
//                         }
//                         const changeFilter = (filter: filterValuesType, todolistId: string) => {
//                             const action = changeTodolistFilterAC(todolistId, filter)
//                             dispatchToTodolist(action)
//                         }
//                         return (
//                             <Grid item>
//                                 <Paper elevation={3} style={{padding: 10}}>
//                                     <Todolist
//                                         todolistId={tl.id}
//                                         key={tl.id}
//                                         title={tl.title}
//                                         tasks={tasksForTodolist}
//                                         removeTask={removeTask}
//                                         changeFilter={changeFilter}
//                                         addTask={addTask}
//                                         changeTaskStatus={changeStatus}
//                                         filter={tl.filter}
//                                         removeTodolists={removeTodolists}
//                                         changeTasksTitle={changeTasksTitle}
//                                         onChangeTitle={onChangeTitle}
//                                     />
//                                 </Paper>
//                             </Grid>
//                         )
//                     })
//                     }
//                 </Grid>
//
//             </Container>
//         </div>
//     )
// }
//
// export default AppWithReducers

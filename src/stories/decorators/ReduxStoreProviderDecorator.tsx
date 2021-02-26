import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from "../../state/tasks-reducer";
import {todolistReducer} from "../../state/todolists-reducer";
import {appRootStateType} from "../../state/store";
import {taskPriorities, taskStatuses} from "../../api/task-api";
import {appReducer, RequestStatusType} from "../../state/app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../../state/authReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: appRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: '', entityStatus: "idle"},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: '', entityStatus: "idle"}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: taskPriorities.Low,
                startDate: '',
                status: taskStatuses.Completed
            },
            {
                id: v1(),
                title: "JS",
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: taskPriorities.Low,
                startDate: '',
                status: taskStatuses.Completed
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: taskPriorities.Low,
                startDate: '',
                status: taskStatuses.Completed
            },
            {
                id: v1(),
                title: "React Book",
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: taskPriorities.Low,
                startDate: '',
                status: taskStatuses.Completed
            }
        ]
    },
    app: {
        status: 'succeeded' as RequestStatusType,
        error: null as null | string,
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

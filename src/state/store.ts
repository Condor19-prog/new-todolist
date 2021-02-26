import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "./authReducer";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type appRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store
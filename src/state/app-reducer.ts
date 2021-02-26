import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {setIsLoggedInAC} from "./authReducer";
import {handleServerAppError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}

        default:
            return state
    }
}
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)
export const isInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)
export const initializeAppTC = () =>
    (dispatch: Dispatch) => {
        authAPI.me().then(res => {
            dispatch(setAppStatusAC("loading"))
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(isInitializedAC(true))
        })
    }
export type ActionsType =
    ReturnType<typeof setAppStatusAC> |
    ReturnType<typeof setAppErrorAC> |
    ReturnType<typeof isInitializedAC>



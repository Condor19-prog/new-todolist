import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";
import {authAPI, loginParamsType} from "../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type initialStateType = typeof initialState
type actionType = setIsLoggedInACType
export const authReducer = (state: initialStateType = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const loginTC = (data: loginParamsType) =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


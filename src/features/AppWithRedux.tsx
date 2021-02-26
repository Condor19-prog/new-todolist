import React, {useCallback, useEffect} from 'react';
import '../App.css';
import {
    AppBar,
    Button, CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useDispatch, useSelector} from "react-redux";
import {appRootStateType} from "../state/store";
import {initializeAppTC, RequestStatusType} from "../state/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {propsType, TodolistList} from "./TodolistList";
import {Login} from "./login/Login";
import {Route} from 'react-router-dom';
import {logoutTC} from "../state/authReducer";


const AppWithRedux: React.FC<propsType> = ({demo = false}) => {

    const status = useSelector<appRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<appRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<appRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    const logOutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
            <Container fixed>
                <Route exact path={'/'} render={() => <TodolistList demo={demo}/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}

export default AppWithRedux

import React from 'react';
import {useFormik} from 'formik';
import {Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../state/authReducer";
import {appRootStateType} from "../../state/store";
import {Redirect} from 'react-router-dom';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const isLoggedIn = useSelector<appRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: values => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 4) {
                errors.password = 'Must be more than 4 characters';
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });
    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }
    return (
        <Grid container justify="center">
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   rel="noopener"> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <TextField
                            type="text"
                            label='email'
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: '#990000', fontSize: '14px'}}>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label='password'
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div style={{color: '#990000', fontSize: '14px'}}>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox/>}
                            {...formik.getFieldProps('rememberMe')}
                            checked={formik.values.rememberMe}
                        />
                        <Button type="submit" variant={'contained'} color={'primary'}>Login</Button>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};
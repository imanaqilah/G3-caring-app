import React, { useState } from 'react';
import {
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'

const SignInForm = ({ toggleIsLogin, toggle, setLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

        axios({
            method: 'POST',
            url: 'https://caring-app-project2021.herokuapp.com/api/v1/sessions/',
            data: {
                username: username,
                password: password
            }
        })
            .then(result => {

                // to check if the user logs in successfully
                if (result.data.token !== undefined) {
                    console.log(result.data.token);
                    console.log(result)
                    localStorage.setItem('jwt', result.data.token)
                    setLoggedIn(true)
                    setUsername("")
                    setPassword("")
                    toggle()
                    history.push("/profile")

                    toast.info('Welcome back!', {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    history.push("/profile")
                }

                else {
                    toast.error('Sign in failed. Try again.', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div style={{ color: "black" }}>
            <ModalHeader toggle={toggle}>Sign In</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="username" name="username" id="username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </FormGroup>
                    <p>New member? <a href="/#" onClick={(e) => {
                        e.preventDefault()
                        toggleIsLogin()
                    }}>Sign Up here.</a></p>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleLogin}>Sign In</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </div >
    )
}

export default SignInForm;
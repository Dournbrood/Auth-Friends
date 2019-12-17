import React, { useState } from "react";

import { axiosWithAuth } from "../Utils/axiosWithAuth";

const Login = (props) => {
    const [loginState, setLoginState] = useState(
        {
            credentials: {
                username: "",
                password: "",
            },
            busy: false,
        }
    )

    const handleChanges = (event) => {
        setLoginState({
            credentials: {
                ...loginState.credentials,
                [event.target.name]: event.target.value,
            },
        });
        console.log("STATE.CREDENTIALS IS NOW ", loginState.credentials);
    };

    const login = (event) => {
        event.preventDefault();
        console.log("STATE.CREDENTIALS BEFORE STATE SET IS: ", loginState.credentials);
        setLoginState({
            ...loginState,
            busy: true,
        })
        console.log("STATE.CREDENTIALS AFTER STATE SET IS: ", loginState.credentials);
        axiosWithAuth()
            .post("/login", loginState.credentials)
            .then((response) => {
                console.log("SERVER RESPONDS TO POST WITH ", response);
                localStorage.setItem("token", response.data.payload);
                props.history.push("/protected");
                setLoginState({
                    ...loginState,
                    busy: false,
                });
            })
            .catch((error) => {
                console.log("POST ERROR: ", error);
                setLoginState({
                    ...loginState,
                    busy: false,
                });
            });
    };
    return (
        <div>
            <form onSubmit={login}>
                <input
                    type="text"
                    name="username"
                    value={loginState.credentials.username}
                    onChange={handleChanges}
                />
                <input
                    type="password"
                    name="password"
                    value={loginState.credentials.password}
                    onChange={handleChanges}
                />
                <button>{loginState.busy ? "Logging In" : "Log In"}</button>
            </form>
        </div>
    )
}

export default Login;
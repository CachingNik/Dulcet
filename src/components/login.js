import React, { useContext } from 'react';
import '../css/inputform.css'
import { Button, TextField } from '@material-ui/core';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import { AuthContext } from './start';

function Login({ history }) {

    const { email, setEmail, pass, setPass, login } = useContext(AuthContext);

    return(
        <form id="cred">
            <LockRoundedIcon className="lockicon" fontSize="large" />
            <TextField label="Email" variant="filled" value={email}
            onChange={e=>{
                setEmail(e.target.value);
            }} />
            <TextField label="Password" type="password" variant="filled" value={pass}
            onChange={e=>{
                setPass(e.target.value);
            }} />
            <Button variant="contained" onClick={login}>
                Login
            </Button>
            <div><span>New User?</span>
            <Button variant="contained" onClick={() => {
                setEmail('');
                setPass('');
                history.push("/signup");
            }} >
                Register Now
            </Button></div>
        </form>
    );
}

export default Login;
import React, { useContext } from 'react';
import '../css/inputform.css'
import { Button, TextField } from '@material-ui/core';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import { AuthContext } from './start';
import Autherror from './autherror';

function Login({ history }) {

    const { email, setEmail, pass, setPass, login, 
        lerr, setLerr } = useContext(AuthContext);

    return(
        <div>
            <h1>DULCET</h1>
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
                <div id="ask"><span className="sub-ask">New User?</span>
                <Button variant="contained" onClick={() => {
                    setEmail('');
                    setPass('');
                    setLerr(false);
                    history.push("/signup");
                }} >
                    Register Now
                </Button></div>
            </form>
            <Autherror err={lerr} setErr={setLerr} />
        </div>
    );
}

export default Login;
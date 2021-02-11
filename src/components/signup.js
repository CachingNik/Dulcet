import { Button, IconButton, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import '../css/inputform.css'
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import { AuthContext } from './start';
import Autherror from './autherror';
 
function Signup({ history }) {

    const { email, setEmail, pass, setPass,
        name, setName, cpass, setCpass, register, rerr, setRerr } = useContext(AuthContext);

    return(
        <div>
            <h1>DULCET</h1>
            <form id="cred" >
                <LockRoundedIcon className="lockicon" fontSize="large" />
                <TextField label="Username" variant="filled" value={name}
                onChange={(e)=>{
                    setName(e.target.value);
                }} />
                <TextField label="Email" variant="filled" value={email}
                onChange={(e)=>{
                    setEmail(e.target.value);
                }} />
                <TextField label="Password"  type="password" variant="filled" 
                value={pass}
                onChange={(e)=>{
                    setPass(e.target.value);
                }} />
                <TextField label="Confirm Password"  type="password" variant="filled"
                value={cpass}
                onChange={(e)=>{
                    setCpass(e.target.value);
                }} />
                <Button variant="contained" onClick={register} >Sign Up</Button>
                <IconButton onClick={()=>{
                    setName('');
                    setEmail('');
                    setPass('');
                    setCpass('');
                    setRerr(false);
                    history.replace("/");
                    }} >
                    <ArrowBackSharpIcon />
                </IconButton>
            </form>
            <Autherror err={rerr} setErr={setRerr} />
        </div>
    );
}

export default Signup;
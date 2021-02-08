import { Button, IconButton, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import '../css/inputform.css'
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import { AuthContext } from './start';
 
function Signup({ history }) {

    const { email, setEmail, pass, setPass,
        name, setName, cpass, setCpass, register } = useContext(AuthContext);

    return(
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
                history.replace("/");
                }} >
                <ArrowBackSharpIcon />
            </IconButton>
        </form>
    );
}

export default Signup;
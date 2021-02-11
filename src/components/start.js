import React, { useEffect, useState } from 'react';
import Signup from './signup';
import Login from './login.js';
import Dashboard from './dashboard';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Fire from '../config/fire';
import Waiting from './waiting';

export const AuthContext = React.createContext();

function Start() {

    const [ user, setUser ] = useState(null);
    const [ email, setEmail ] = useState('');
    const [ pass, setPass ] = useState('');
    const [ cpass, setCpass ] = useState('');
    const [ name, setName ] = useState('');
    const [ load, setLoad ] = useState(true);
    const [ uname, setUname ] = useState('');
    const [ id, setId ] = useState(null);
    const [ lerr, setLerr ] = useState(false);
    const [ rerr, setRerr ] = useState(false);

    const getDetails = () => {
        let uid = Fire.auth().currentUser.uid;
        Fire.database()
            .ref(`users/${uid}`)
            .on("value", snapshot => {
                setUname(snapshot.val().username);
                setId(snapshot.val().count)
                setLoad(false);
            })
    }

    const login = async () => {
        if(email==='' || pass===''){
            setLerr(true);
            return;
        }
        setLoad(true);
        try {
            await Fire.auth()
            .signInWithEmailAndPassword(email, pass);
        } catch(e) {
            console.log(e);
            setLerr(true);
            setEmail('');
            setPass('');
            setLoad(false);
            return;
        }
        setLerr(false);
        setEmail('');
        setPass('');
    }

    const register = async () => {
        if(pass!==cpass){
            console.log("password does not match!!!");
            setRerr(true);
            return;
        }
        if(name===''){
            setRerr(true);
            return;
        }
        setLoad(true);
        try {
            await Fire.auth()
            .createUserWithEmailAndPassword(email, pass)
        } catch(e) {
            console.log(e);
            setRerr(true);
            setPass('');
            setCpass('');
            setLoad(false);
            return;
        }
        setRerr(false);
        setEmail('');
        setPass('');
        setCpass('');
        let uid = Fire.auth().currentUser.uid;
        Fire.database().ref(`users/${uid}`)
            .set({
                username: name,
                count: 1,
                liked: ["dummy"]
            })
        setName('')
    }

    const logout = () => {
        Fire.auth()
            .signOut()
    }

    const value = {
        user,
        email,
        setEmail,
        pass,
        setPass,
        cpass,
        setCpass,
        login,
        register,
        logout,
        name,
        setName,
        load,
        setLoad,
        uname,
        id,
        setId,
        lerr,
        setLerr,
        rerr,
        setRerr
    }

    useEffect(()=>{
        Fire.auth().onAuthStateChanged((user)=>{
            setLoad(true);
            if(user){
                getDetails();
                setUser(user);
            } else {
                setUser(null);
                setLoad(false);
            }
        })
    }, [])

    if(load){
        return (
            <Waiting />
        );
    }

    return(
        <AuthContext.Provider value={value} >
            { user ? 
            <BrowserRouter>
                <Route path="/" exact component={Dashboard} />
                <Route path="/login" exact>
                    <Redirect to="/" />
                </Route>
                <Route path="/signup" exact>
                    <Redirect to="/" />
                </Route>
            </BrowserRouter> :
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/" exact>
                        <Redirect to="/login" />
                    </Route>
                </Switch>
            </BrowserRouter>
            }
        </AuthContext.Provider>
    );
}

export default Start;
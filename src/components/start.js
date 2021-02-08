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

    const getName = () => {
        let uid = Fire.auth().currentUser.uid;
        Fire.database()
            .ref(`users/${uid}`)
            .on("value", snapshot => {
                setUname(snapshot.val().username);
            })
        setTimeout(() => {
            setLoad(false);
        }, 2000);
    }

    const login = async () => {
        if(email==='' || pass===''){
            return;
        }
        setLoad(true);
        try {
            await Fire.auth()
            .signInWithEmailAndPassword(email, pass);
        } catch(e) {
            console.log(e);
            setEmail('');
            setPass('');
            setLoad(false);
            return;
        }
        getName();
        setEmail('');
        setPass('');
    }

    const register = async () => {
        if(pass!==cpass){
            console.log("password does not match!!!");
            return;
        }
        if(name===''){
            return;
        }
        setLoad(true);
        try {
            await Fire.auth()
            .createUserWithEmailAndPassword(email, pass)
        } catch(e) {
            console.log(e);
            setPass('');
            setCpass('');
            setLoad(false);
            return;
        }
        setEmail('');
        setPass('');
        setCpass('');
        let uid = Fire.auth().currentUser.uid;
        Fire.database().ref(`users/${uid}`)
            .set({
                username: name
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
        uname
    }

    useEffect(()=>{
        Fire.auth().onAuthStateChanged((user)=>{
            setLoad(true);
            if(user){
                getName();
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
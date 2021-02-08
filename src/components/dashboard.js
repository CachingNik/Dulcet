import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import { Button, IconButton } from '@material-ui/core';
import '../css/dashboard.css';
import MusicNoteSharpIcon from '@material-ui/icons/MusicNoteSharp';
import Musicitem from './musicitem';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { AuthContext } from './start';

function Dashboard() {

    const { logout, uname } = useContext(AuthContext);

    return(
        <div>
        <AppBar>
            <Toolbar id="navbar">
                <span id="logo">
                    <MusicNoteSharpIcon />
                    DULCET
                </span>
                <span>Hi, {uname}</span>
                <Button
                startIcon={<ExitToAppSharpIcon/>}
                onClick={logout} >Log Out</Button>
            </Toolbar>
        </AppBar>
        <div id="below-appbar">
            <Musicitem />
        </div>
        <IconButton id="add">
            <AddCircleIcon fontSize="large" color="primary" />
        </IconButton>
        </div>
    );
}

export default Dashboard;
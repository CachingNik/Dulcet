import React, { useContext, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import { Button, IconButton } from '@material-ui/core';
import '../css/dashboard.css';
import MusicNoteSharpIcon from '@material-ui/icons/MusicNoteSharp';
import Musicitem from './musicitem';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { AuthContext } from './start';
import UploadDialog from './uploaddialog';
import Fire from '../config/fire';
import pro from '../images/profile.png';

function Dashboard() {

    const { logout, uname } = useContext(AuthContext);
    const [ open, setOpen ] = useState(false);
    const [ slist, setSlist ] = useState([]);
    const [ llist, setLlist ] = useState([]);

    const getList = async () => {
        setSlist([]);
        var listRef = Fire.storage().ref().child('audio/');
        try {
            let res = await listRef.listAll()
            res.items.forEach( async (item) => {
                let durl = await item.getDownloadURL();
                let dmd = await item.getMetadata();
                setSlist(arr => [...arr, {
                    url: durl,
                    md: dmd.customMetadata,
                    path: dmd.fullPath
                }])
            })
        } catch(e) {
            console.log(e);
        }
    }

    const getLlist = () => {
        let uid = Fire.auth().currentUser.uid;
        Fire.database()
            .ref(`users/${uid}`)
            .on("value", snapshot => {
                setLlist(snapshot.val().liked)
            })
    }

    useEffect(()=>{
        getList();
        getLlist();
    }, [])

    return(
        <div>
        <AppBar>
            <Toolbar id="navbar">
                <span id="logo">
                    <MusicNoteSharpIcon />
                    DULCET
                </span>
                <div id="acc-info">
                    <span>Hi, {uname}</span>
                    <img src={pro} alt="profile" />
                </div>
                <Button
                startIcon={<ExitToAppSharpIcon/>}
                onClick={logout} >Log Out</Button>
            </Toolbar>
        </AppBar>
        <div id="below-appbar">
            { slist.length === 0 ? 
            <span className="empty">Nothing Here, Start Uploading.</span> : 
            <ul id="sl">
                { slist.map((item, i) =>  <li key={i}><Musicitem item={item}
                getList={getList} llist={llist} setLlist={setLlist} /></li> ) }
            </ul> }
        </div>
        <IconButton id="add" onClick={()=>{
            setOpen(true);
        }}>
            <AddCircleIcon fontSize="large" color="primary" />
        </IconButton>
        <UploadDialog open={open} setOpen={setOpen} setSlist={setSlist} />
        </div>
    );
}

export default Dashboard;
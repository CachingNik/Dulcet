import { Dialog, DialogContentText, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';
import { Button, TextField, Box, Typography, IconButton } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import '../css/uploaddialog.css';
import Fire from '../config/fire';
import LinearProgress from '@material-ui/core/LinearProgress';
import DoneIcon from '@material-ui/icons/Done';
import { AuthContext } from './start';

function Uploaddialog ({ open, setOpen, setSlist }) {

    const { uname, id, setId } = useContext(AuthContext);

    const [ nocanc, setNocanc ] = useState(false);
    const [ pro, setPro ] = useState(0);
    const [ done, setDone ] = useState(false);
    const [ song, setSong ] = useState('');
    const [ sb, setSb ] = useState('');

    const upload = () => {
        if(song === '' || sb === ''){
            return;
        }
        let uid = Fire.auth().currentUser.uid
        let file = document.getElementById("input-file").files[0];
        if(!file){
            setNocanc(false);
            return;
        }
        setNocanc(true);
        let metadata = {
            customMetadata: {
                'username': uname,
                'uploadedby': uid,
                'likes': 0,
                'song_name': song,
                'singer_band': sb
            }
        }
        var uploadTask = Fire.storage().ref()
            .child(`audio/${uid}_${id}`).put(file, metadata);
        uploadTask.on(
            'state_changed', (snapshot) =>{
                var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                setPro(progress);
            },
            (error) => {
                console.log(error);
            },
            async () => {
                let durl = await uploadTask.snapshot.ref.getDownloadURL();
                let dmd = await uploadTask.snapshot.ref.getMetadata();
                setSlist(arr => [...arr, {
                    url: durl,
                    md: dmd.customMetadata,
                    path: dmd.fullPath
                }])
                Fire.database().ref(`users/${uid}`)
                    .update({
                        count: (id + 1)
                })
                setId(id + 1);
                setNocanc(false);
                setDone(true);
            }
        )
    }

    return (
        <Dialog open={open} id="dialog" >
            <DialogTitle>
                Upload your MP3 file
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    File size should not exceed 20 MB.
                </DialogContentText>
                <input type="file" id="input-file" />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Enter Song Name"
                    value={song}
                    onChange={(e)=>{setSong(e.target.value)}}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Enter Singer/Band"
                    value={sb}
                    onChange={(e)=>{setSb(e.target.value)}}
                />
                { nocanc ? 
                <Box display="flex" alignItems="center">
                    <Box width="100%" mr={1}>
                        <LinearProgress variant="determinate" value={pro} />
                    </Box>
                    <Box minWidth={35}>
                    <Typography variant="body2"
                    color="textSecondary">{`${Math.round(pro)}%`}
                    </Typography>
                    </Box>
                </Box> : 
                <div></div> }    
            </DialogContent>
            <DialogActions>
                { done ?
                <IconButton onClick={()=>{
                    setOpen(false);
                    setTimeout(()=>{
                        setDone(false);
                        setPro(0);
                    }, 300);
                }}>
                    <DoneIcon />
                </IconButton> : 
                <div>
                    <Button disabled={nocanc} onClick={()=>{
                        upload();
                    }}>UPLOAD</Button>
                    <Button disabled={nocanc} onClick={()=>{
                        setOpen(false);
                    }}>CANCEL</Button>
                </div> }
            </DialogActions>
        </Dialog>
    );
}

export default Uploaddialog;
import React, { useEffect, useState } from 'react';
import '../css/musicitem.css';
import { Card, CardContent, IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';
import Fire from '../config/fire';

function Musicitem({ item, getList, llist, setLlist }) {

    const [ del, setDel ] = useState(true);
    const [ like, setLike ] = useState(parseInt(item.md.likes));
    const [ tu, setTu ] = useState(false);

    const deletesong = () => {
        Fire.storage().ref().child(`${item.path}`)
            .delete().then(()=>{
                getList();
            })
            .catch((e)=>{
                console.log(e);
            })
    }

    const liking = async () => {
        let temp = llist.concat(item.path);
        setLlist(temp);
        let forestRef = Fire.storage().ref().child(`${item.path}`)
            let dmd = await forestRef.getMetadata();
            let likes = parseInt(dmd.customMetadata.likes);
        let updatameta = {
            customMetadata: {
                likes: likes + 1
            }
        }
        let nmd = await forestRef.updateMetadata(updatameta);
        setLike(nmd.customMetadata.likes);
        let uid = Fire.auth().currentUser.uid;
        Fire.database().ref(`users/${uid}`)
            .update({
                liked: temp
            })
        setTu(true);
    }

    useEffect(()=>{
        if(Fire.auth().currentUser.uid === item.md.uploadedby){
            setDel(false);
        }
        if(llist.includes(item.path)){
            setTu(true);
        }
    }, [item.md.uploadedby, item.path, llist])

    return (
        <Card>
            <CardContent  id="card">
                <IconButton onClick={liking} disabled={tu} >
                    {like}&nbsp;
                    { tu ? 
                    <ThumbUpIcon color="secondary"/> :
                    <ThumbUpIcon /> }
                </IconButton>
                <div className="details">
                {item.md.song_name}
                <span>{item.md.singer_band}</span>
                </div>
                <audio controls src={item.url}>
                    Your browser does not support the HTML5 Audio element.
                </audio>
                <IconButton onClick={deletesong}
                disabled={del} >
                    <DeleteIcon />
                </IconButton>
            </CardContent>
        </Card>
    );
}

export default Musicitem;
import React from 'react';
import '../css/musicitem.css';
import { Card, CardContent, IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';

function Musicitem() {
    return (
        <Card>
            <CardContent  id="card">
                <IconButton>
                    <ThumbUpIcon />
                </IconButton>
                <div className="details">
                Name of the Song
                <span>Author</span>
                </div>
                <audio controls src="https://firebasestorage.googleapis.com/v0/b/react-dulcet.appspot.com/o/test.mp3?alt=media&token=36335c9b-4808-4a71-ab35-2885e1b43b45">
                    Your browser does not support the HTML5 Audio element.
                </audio>
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </CardContent>
        </Card>
    );
}

export default Musicitem;
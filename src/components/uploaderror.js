import React from 'react';
import { Collapse, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert, AlertTitle } from '@material-ui/lab';

function Uploaderror ({ uerr, setUerr }) {
    return (
        <Collapse in={uerr}>
            <Alert
            severity="error"
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={()=>{setUerr(false);}}
                >
                <CloseIcon fontSize="inherit" />
                </IconButton>
            }>  
            <AlertTitle>
                Error
            </AlertTitle>
            <ul>
                Possibilities:
                <li>Input Field is empty.</li>
                <li>It is not an mp3 file.</li>
                <li>File size exceeds 20 MB.</li>
                <li>Problem on our end.</li>
            </ul>
            </Alert>
        </Collapse>
    );
}

export default Uploaderror;
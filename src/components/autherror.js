import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

function Autherror ({ err, setErr }) {
    return (
        <Snackbar open={err}>
            <Alert onClose={()=>setErr(false)} severity="error">
            Error, Please try again
            </Alert>
        </Snackbar>
    );
}

export default Autherror;
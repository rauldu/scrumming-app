import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  DialogContentText,
  TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import axios from 'axios';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function CreateForm({ formClosed }) {
  const [values, setValues] = React.useState({
    name: '',
    owner: '',
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    console.log('Dialog Create Opened');
  }, []);

  const handleClose = () => {
    setOpen(false);
    formClosed(true);
  };

  const createUser = () => {
    console.log('[+] CREATING Organization');
    console.log(values);
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/organization`,
      headers: {
        Authorization: '{{TOKEN}}',
        'Content-Type': 'application/json'
      },
      data: values
    };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        formClosed('Creation successful');
      })
      .catch((error) => {
        console.log(error);
        formClosed('Error while trying post organization');
      });
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <DialogContentText>
          You are creating an organization
        </DialogContentText>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          value={values.name}
          id="name"
          label="Name"
          type="text"
          fullWidth
          onChange={handleChange('name')}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={createUser} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CreateForm.propTypes = {
  formClosed: PropTypes.func.isRequired,
};

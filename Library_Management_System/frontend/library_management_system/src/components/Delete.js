// import React from 'react'

// export const Delete = () => {
//     return (
//         <div>
//             detelte
//         </div>
//     )
// }
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {RiDeleteBin6Fill} from 'react-icons/ri'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export  function Delete(props) {
  const [open, setOpen] = React.useState(false);
  const action = parseInt(localStorage.getItem('action'))
  
  const handleDelete = () =>{
      try{
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
          };
          
          fetch(`http://127.0.0.1:8000/api/books/delete/${props.book['id']}`, requestOptions)
            .then(response => response.json())
            .then(result =>{
                console.log(result)
                alert(`successfully deleted ${props.book['name']}`)
                setOpen(false);
                localStorage.setItem("action", action+1)
            })
            .catch(error => console.log('error', error));
      }catch(err){
          console.log(err)
      }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        <RiDeleteBin6Fill color='red'/>
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle style={{color:"red"}}  id="customized-dialog-title" onClose={handleClose}>
          Delete <strong>{props.book['name']}</strong>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Are you sure to delete <strong>{props.book['name']}</strong> ?
          </Typography>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDelete} color="secondary">
           Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


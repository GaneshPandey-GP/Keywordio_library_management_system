import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {  Redirect } from 'react-router-dom';
import Loading from './Loading';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {GiCancel} from 'react-icons/gi';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
    // marginTop: -22
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export  function AddBook() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [publisher, setPublisher] = useState('');
  const [err, setErr] = useState(false);
  const [isCreated, setIscreated] = useState(false)
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const action = parseInt(localStorage.getItem('action'))

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // axios.post({})
    try{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "name": title,
          "category": category,
          "author": author,
          "publiser": publisher
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://127.0.0.1:8000/api/books/add", requestOptions)
          .then(response => response.json())
          .then(result => {
                     console.log(result)
                     setIscreated(true)
                     localStorage.setItem("action", action+1)
                    })
          .catch(error => console.log('error', error));
    }catch(err){
        setErr(true)
      setLoading(false)
    }
  }
  if (isCreated) {
    return <Redirect to="/admin-dashboard" />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
<div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{marginTop:'-72px', marginLeft:'10px'}}>
        Add Book
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Add New Book
        </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            <GiCancel size='31px' style={{marginTop:'-125px', marginRight:'-40px'}} />
          </Button>
        </DialogActions>
        <DialogContent>
        <Container component="main" maxWidth="xs">
      
      <div className={classes.paper}>
     
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="title"
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="author"
                label="Author"
                name="author"
             
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="category"
                label="category"
                type="text"
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="publisher"
                label="Publisher"
                type="text"
                id="publisher"
                value={publisher}
                onChange={e => setPublisher(e.target.value)}
              />
            </Grid>

          </Grid>
          {err? <p>Error occured! Try Again!!</p>: null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isCreated? <CircularProgress/>: "Add" }
          </Button>
        
        </form>
      </div>

    </Container>
        </DialogContent>

      </Dialog>
    </div>
  );
}
import React, {useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {  Redirect } from 'react-router-dom';
import Loading from './Loading';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export  function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [err, setErr] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false)
  const [loading, setLoading] = useState(false);



const result={"email":[],"username":[]}
  const handleSubmit = e => {
    e.preventDefault();
 
    try{
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "email": email,
  "username": name,
  "password": password,
  "confirm_password": confirm_password
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8000/api/books/register", requestOptions)
  .then(response => response.json())
  .then(res => {
      console.log(result)
       res['email'] ? result['email']=res['email']:result['email']=[]     
       res['username'] ? result['username']=res['username']:result['username']=[]
      console.log(result)

      if(result['email'][0] === "user with this email already exists."){
            alert("user with this email already exists.");
            <Redirect to='/register'/>
      }
      else if(result['username'][0] === "user with this username already exists."){
        alert("user with this username already exists.");
        <Redirect to='/'/>
      }
      else if(res['password'] === "Password must match."){
        alert("Password must match.");
        <Redirect to='/'/>
      }
      else{
        localStorage.setItem("isAuthenticated", true)
        localStorage.setItem("access_token", res.access)
          setIsRegistered(true)
          setLoading(false)
      } 
})
  .catch(error => {
                console.log('error', error)
                
            });
    }catch(err){
        setErr(true)
      setLoading(false)
    }
  }
  if (isRegistered || err) {
    return <Redirect to="/login" />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                // autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                // autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Confirm Password"
                label="Confirm Password"
                type="password"
                id="Confirm Password"
                // autoComplete="current-password"
                value={confirm_password}
                onChange={e => setConfirm_password(e.target.value)}
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        
      </Box>
    </Container>
  );
}
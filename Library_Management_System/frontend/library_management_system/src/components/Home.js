import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';



const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {

    padding: theme.spacing(8, 0, 6),
    marginTop: 90,
    backgroundImage: `url('https://unsplash.com/photos/YLSwjSy7stw')`
    
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
  
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent} style={{backgroundImage:`url("https://unsplash.com/photos/YLSwjSy7stw")`}}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Keywordio Assignment.
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            I have always imagined that Paradise will be a kind of a Library. <strong>- Jorge Luis Borges </strong>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
               
                  <Button variant="contained" color="primary" href="/login">
                   Admin View
                  </Button>
                  
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" href='/student-view'>
                    Student View
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      
      </main>
    
    </React.Fragment>
  );
}
import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Update } from './Update';
import { Delete } from './Delete';
import Loading from './Loading';



  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#380505',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  const useStyles = makeStyles({
    container: {
      padding: 520,
 
    },
    table: {
      minWidth: 700,
     
      
    },
  });

const Bookstable = () => {
    const classes = useStyles();
    const[bookslist, setBookslist] = useState([]);
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState(0);
  


    useEffect(() => {
        setInterval(() => {
          const user = localStorage.getItem("isAuthenticated")
          setUser(user)
          var action = parseInt(localStorage.getItem("action"))
          setAction(action)
        }, [])
        console.log(action)
    }, [4000]);

console.log(user)
    useEffect(() => {
       fetchbooklist()
      }, [action])

      const fetchbooklist = async()=>{
        try {
          setLoading(true)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
    
          await fetch("http://127.0.0.1:8000/api/books/", requestOptions)
            .then(response => response.json())
            .then(result =>{
                setBookslist(result)
                setLoading(false)
            })
            .catch(error => console.log('error', error));
       }
      catch(err){setLoading(false)}
      }
      console.log(bookslist)
    return (
    loading ? <Loading/> :
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">  
          <TableHead>
            <TableRow>
              <StyledTableCell>S.NO</StyledTableCell>
              <StyledTableCell>Book Title</StyledTableCell>
              <StyledTableCell align="right">Author</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Publisher</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>


            
            </TableRow>
          </TableHead>
          <TableBody>
            {bookslist.map((row,index) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                 {index+1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                 {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.author}</StyledTableCell>
                <StyledTableCell align="right">{row.category}</StyledTableCell>
                <StyledTableCell align="right">{row.publiser}</StyledTableCell>

                
                <StyledTableCell align="right"><Update book={row}/></StyledTableCell>
                <StyledTableCell align="right"><Delete book={row}/></StyledTableCell>
               
                
              </StyledTableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
      
    );
}

export default Bookstable;
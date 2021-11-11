import React,{useEffect,useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Loading from './Loading';


const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Book Title', width: 150 },
  { field: 'author', headerName: 'Author', width: 150 },
  {
    field: 'category',
    headerName: 'Category',
    width: 150,

  },
  {
    field: 'publiser',
    headerName: 'Publisher',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    
  },

];



export default function Studentview() {
    const[bookslist, setBookslist] = useState([])
    const[loading, setLoading] = useState(true)


  useEffect(() => {
 try{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:8000/api/books/", requestOptions)
        .then(response => response.json())
        .then(result =>{
            setBookslist(result)
            setLoading(false)
        })
        .catch(error => console.log('error', error));
    }catch(err){console.log(err)}
  }, [])
   console.log(bookslist)
   const rows = bookslist
  return (
      loading ? <Loading/> :
        
    <div style={{alignItems:'center' , justifyContent:'center', height: 400, width: 900, marginTop:110, marginLeft:170 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    
  );
}

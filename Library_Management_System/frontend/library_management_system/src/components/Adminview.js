import React, {useEffect} from 'react'
import Bookstable from "./Bookstable"
import { AddBook } from './AddBook'
import { Redirect } from 'react-router'



const Adminview = () => {
    const user = localStorage.getItem('isAuthenticated')
    console.log(user)
    useEffect(()=>{
        // window.location.reload();
    },[user])
    return (
        user ?
        <div style={{marginTop:120}}>
            <AddBook/>

            <Bookstable/>
        </div>:<Redirect to='/'/>
    )
}

export default Adminview
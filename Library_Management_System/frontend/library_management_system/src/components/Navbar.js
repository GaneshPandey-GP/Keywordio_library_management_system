import React, { useEffect, useState } from "react";
import {FcLibrary} from 'react-icons/fc'
import {AiFillHome} from 'react-icons/ai'
import { Logout } from "./Logout";
export default function Navbar() {
    const [admin, setAdmin] = useState(false)
useEffect(()=>{
    setInterval(()=>{
        const user = localStorage.getItem('isAuthenticated')
        setAdmin(user)
    },[1000])
    
},[])
  return (
    <div>
      <header className="Navbar">
        <div className="Toolbar">
          <div className="Logo">
            
            <span role="img" aria-label="logo">
              <FcLibrary size='39px'/>
            </span>
          </div>
          <div className="Title"> Library Management System</div>
          <div>
         <a href='/' onClick={()=>{localStorage.clear()}}> <AiFillHome size='29px'/></a>
          </div>
         {admin ? <Logout/> : null}

        </div>
      </header>
      
     
    </div>
  );
}

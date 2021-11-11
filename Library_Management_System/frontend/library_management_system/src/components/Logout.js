import { Button } from '@material-ui/core'
import React from 'react'
import {FiLogOut} from 'react-icons/fi'

export const Logout = () => {
    const handleclick = ()=>{

localStorage.clear();
    }
    return (
        <div>
            <Button onClick={handleclick} href='/login'> <FiLogOut size='20px'/></Button>
           
        </div>
    )
}

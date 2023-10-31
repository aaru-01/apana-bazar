import React, { useState , useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'

function Myorders() {

    const [user, setUser] = useState({});
    useEffect(() => {
        const storageUser = JSON.parse(localStorage.getItem("user") || '{}');
       if(storageUser?.email){
        setUser(storageUser);
       }else{
        alert("You are not logged in!");
        window.location.href = '/login';
       }
       
    }, [])
    return (
        <div>
            <Navbar />
            <h1>My orders</h1>
        </div>
    )
}

export default Myorders

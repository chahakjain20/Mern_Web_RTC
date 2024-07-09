import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import styles from './Navigation.module.css';
import { logout } from '../../../http';
import {useDispatch,useSelector} from 'react-redux';
import {setAuth} from '../../../store/authSlice'

const Navigation = () => {

    const brandStyle  ={
        color: '#fff',
        textDecoration:'none',
        fontWeight:'bold',
        fontSize:'22px',
        display: 'flex',
        alignItems:'center',
    };

    const logoText ={
        marginLeft:'10px',
    }

    const dispatch = useDispatch();
    const {isAuth,user} = useSelector((state)=>state.auth);

    async function logoutUser(){
        try {
            const {data} = await logout();
            dispatch(setAuth(data));
        }
        catch (error) {
            console.log(error);
        }
    }
    const location = useLocation();
  return (
   <nav className = {`${styles.navbar} container`}>
    <Link style={brandStyle} to="/" > 
    <img src="/images/Logo.png" height="100px" width = "100px"alt="logo" />
    <span style={logoText}>
        Chat_App
    </span>
    
    </Link>
    <div className={styles.navRight}>
        <h3>{user.name}</h3>
        <Link to="/">
            <img className={styles.avatar}
            src={user.avatar} width = "40" height ="40" alt="Avatar" />

        </Link>
       { isAuth && <button className={styles.logoutButton} onClick={logoutUser}>
            <img src="/images/logout.png" width = "20" height ="20" alt="logout" />
        </button>}

    </div>
    {/* {isAuth && <button onClick={logoutUser}>Logout</button>} */}
   </nav>
  )
}

export default Navigation
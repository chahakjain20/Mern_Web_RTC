import React from 'react'
import styles from './Home.module.css';
import { Link,useNavigate } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';
const Home = () => {
  const signInLinkStyle ={
    color:'#0077ff',
    fontWeight:'bold',
    textDecoration:'none',
    marginLeft:'10px',
  };
  const navigate = useNavigate();


  function startRegister(){
    navigate("/register");
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to chat app" icon="Logo">
        <p className={styles.text}>ready for everyone! While we wrap up the finishing youches, we’re adding people gradually to make sure nothing breaks :)</p>

        <div>
         <Button onClick ={startRegister} text="Get your Username"/>
        </div>

      <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}> Have an Invite text?</span>
          <Link style={signInLinkStyle}to="/login"> Sign In </Link>
        </div>


      </Card>
    </div>


  );
}

export default Home;
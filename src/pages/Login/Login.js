import React, { useState } from 'react';
import TwitterImage from '../../assets/images/twitter.jpeg';
import XIcon from '@mui/icons-material/X';
// import styles from './Login.module.css';
import {useSignInWithEmailAndPassword, useSignInWithGoogle} from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Signup.module.css'
import googleimage from '../../assets/images/googleimage.png'

function Login() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errorMsg,setError] = useState('');
    const navigate = useNavigate();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    if(user || googleUser){
        navigate('/');
        console.log(user);
        console.log(googleUser);
    }
    if(error){
        console.log(error);
    }
    if(loading){
        console.log('loading...');
    }

    const handleGooglebtn = () =>{
        signInWithGoogle();
    }

    const handleSubimt = e=>{
        e.preventDefault();
        console.log('success');
        signInWithEmailAndPassword(email,password);
    }

return (
    <>
    <div className={styles.maincontainer}>
        <div className={styles.imagecontainer} style={{width:'50%'}}>
            <img className={styles.image} src={TwitterImage} />
        </div>
        <div className={styles.loginformcontainer} style={{backgroundColor:'black',color:'white'}}>
            <div className={styles.twitterIcon}><XIcon  /></div>
            <h2 className={styles.heading}>Happening now</h2>
            <h3 className={styles.heading1}>What happening today?</h3>
            <div className={styles.formcontainer1}>
            <form onSubmit={handleSubimt}>
                <input type="email" 
                className={styles.input}
                placeholder="Email address"
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input type="password" 
                className={styles.input}
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
                />

                {errorMsg && <p className={styles.error}>{errorMsg}</p>}
                {loading && <p>Loading...</p>}

                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <button className={styles.signup} type='submit' >Login</button>
                </div>
            </form>
            <div className={styles.separator}>
                <span className={styles.line}></span>
                <span className={styles.text}>or</span>
                <span className={styles.line}></span>
                </div>
                <div className={styles.googlebutton}>
                <div className={styles.customGoogleButton} onClick={handleGooglebtn}>
                        <span><img src={googleimage} className={styles.googleimage} /></span><span style={{marginLeft:'10px'}}>Sign in with Google</span>
                    </div>
                    {googleLoading && <p>Loading...</p>}
                </div>
            <div style={{margin:'10px 0px',color:'grey'}}>
                Don't have account?
                <Link to='/signup' style={{textDecoration:'none',color:'#1D9Bf0',fontWeight:'500',marginLeft:'5px'}}>Signup</Link>
            </div>
            </div>
        </div>
    </div>
    <div style={{backgroundColor:'black', color:'grey',display:'flex',justifyContent:'center'}}>
    <span>all copyrights reserved &reg; </span>
</div></>
  )
}

export default Login
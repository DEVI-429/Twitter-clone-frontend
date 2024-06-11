//signup.js

import React, { useState, useEffect } from 'react';
import TwitterImage from '../../assets/images/twitter.jpeg';
import XIcon from '@mui/icons-material/X';
import styles from './Signup.module.css';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
// import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import googleimage from '../../assets/images/googleimage.png'
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setError] = useState('');
    const navigate = useNavigate();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    useEffect(() => {
        if (user || googleUser) {
            navigate('/');
            console.log(user);
            console.log(googleUser);
        }
    }, [user, googleUser]);

    useEffect(() => {
        if (error || googleError) {
            setError(error?.message || googleError?.message);
        }
    }, [error, googleError]);

    const handleGooglebtn = () => {
        signInWithGoogle().catch((error) => {
            console.error("Error during Google Sign-In:", error);
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (username && name && email && password) {
            createUserWithEmailAndPassword(email, password).catch((error) => {
                setError(error.message);
            });
            const user = {
                username:username,
                name:name,
                email:email,
                password:password
            }

            const {data}=axios.post('https://twitterclone-7laa.onrender.com/register', user);
            console.log(data);
        } else {
            setError('All fields are required');
        }
    };

    return (
        <div style={{backgroundColor:'black'}}>
        <div className={styles.maincontainer}>
            <div className={styles.imagecontainer}>
                <img className={styles.image} src={TwitterImage} alt="Twitter" />
            </div>
            <div className={styles.formcontainer} style={{backgroundColor:'black',color:'white'}}>
                <div className={styles.twitterIcon}><XIcon  /></div>
                <h2 className={styles.heading}>Happening now</h2>
                <h3 className={styles.heading1}>Join today.</h3>
                <div className={styles.formcontainer1}>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        className={styles.input}
                        placeholder='@username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type='text'
                        className={styles.input}
                        placeholder='Enter full name'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        className={styles.input}
                        placeholder="Email address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className={styles.input}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {errorMsg && <p className={styles.error}>{errorMsg}</p>}
                    {loading && <p>Loading...</p>}

                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <button className={styles.signup} type='submit'>Sign-Up</button>
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
                    Already have an account?
                    <Link to='/login' style={{ textDecoration: 'none', color: '#1D9Bf0', fontWeight: '500', marginLeft: '5px' }}>Login</Link>
                </div>
                </div>
            </div>
        </div>
        <div style={{backgroundColor:'black', color:'grey',display:'flex',justifyContent:'center'}}>
        <span>all copyrights reserved &reg; </span>
    </div></div>
    );
}

export default Signup;

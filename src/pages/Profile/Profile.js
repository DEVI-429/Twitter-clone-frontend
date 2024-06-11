import React from 'react'
import styles from './Profile.module.css'
import MainPage from './MainPage/MainPage'
import {useAuthState} from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'

function Profile() {

  const [user] = useAuthState(auth);

  return (
    <div className={styles.profilePage}>
        <MainPage user={user}/>
    </div>
  )
}

export default Profile
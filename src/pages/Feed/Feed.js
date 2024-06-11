import axios from 'axios';
import styles from '../page.module.css'
import TweetBox from './TweetBox'
import React, { useEffect, useState } from 'react'
import Post from './Post/Post'

function Feed() {

  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    fetch(`https://twitterclone-7laa.onrender.com/post`)
    .then(res=>res.json())
    .then(data=>{
      setPosts(data);
    })
  },[posts])

  return (
    <>
    <div className={styles.page}>
      <h3 className={styles.pageTitle}>Home</h3>
      <TweetBox />
      {
        posts.map(p => <Post key={p._id} p={p} />)
      }
    </div>
    </>
  )
}

export default Feed
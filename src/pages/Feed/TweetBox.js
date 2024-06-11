import React, { useState } from 'react'
import styles from './TweetBox.module.css'
import {Avatar,Button} from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import axios from 'axios';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

function Tweetbox() {
    const [user] = useAuthState(auth);
    const email = user?.email;

    const [post,setPost] = useState("");
    const [imageURL,setImageURL] = useState("")
    const [isLoading,setIsLoading] = useState();
    const [name,setName] = useState();
    const [username,setUserName] = useState();
    // const [email,setEmail] = useState();
    const [loggedInUser] = useLoggedInUser();
    const userProfilePic = loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';

    const handleUploadImage=(e)=>{
        setIsLoading(true);
        const image=e.target.files[0];
        console.log(image);

        const formData = new FormData();
        formData.set('image',image);
        
        axios.post(`https://api.imgbb.com/1/upload?key=0bb72380825d3799c8d61d2d0dea3add`,formData)
        .then(res=>{
            setImageURL(res.data.data.display_url)
            setIsLoading(false);
        }).catch((error)=>{
            console.log(error);
            setIsLoading(false);
        })
    }

    const handleTweet = (e)=>{
        e.preventDefault();
        if(user.providerData[0].providerId==='password'){

        fetch(`https://twitterclone-7laa.onrender.com/loggedInUser?email=${email}`)
        .then(res=>res.json())
        .then(data=>{
            setUserName(data[0]?.username);
            setName(data[0]?.name);
        })
        }else{
            setUserName(user?.displayName);
            setName(email?.split('@')[0]);
        }

            if(name){
            const userPost={
                post:post,
                photo:imageURL,
                profilePic:userProfilePic,
                username:username,
                name:name,
                email:email
            }
            setPost('');
            setImageURL('');
            console.log(userPost)
            fetch(`https://twitterclone-7laa.onrender.com/post`,{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(userPost)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
            })
        }
    }

   

  return (
    <div className={styles.tweetBox}>
        <form onSubmit={handleTweet}>
            <div className={styles.tweetBoxInput}>
                <Avatar src={userProfilePic} />
                <input type='text' 
                placeholder="What's happening?"
                onChange={(e)=>setPost(e.target.value)}
                value={post}
                required
                />
            </div>
            <div className={styles.imageIconTweetButton}>
                <label htmlFor='image' className={styles.imageIcon}>
                    {
                        isLoading? <p>Uploading Image...</p> : <p>{imageURL?'Image Uploaded':<AddPhotoAlternateIcon/>}</p>
                    }
                </label>
                <input type='file' 
                id='image' 
                accept="image/*" 
                className={styles.imageInput} 
                onChange={handleUploadImage}
                />
                <Button className={styles.tweetBoxTweetButton} type='submit' >
                    Tweet
                </Button>
            </div>
        </form>
    </div>
  )
}

export default Tweetbox
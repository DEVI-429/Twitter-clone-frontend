import React, { useState } from 'react';
import styles from './TweetBox.module.css';
import { Avatar, Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import axios from 'axios';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

function Tweetbox() {
    const [user] = useAuthState(auth);
    const email = user?.email;

    const [post, setPost] = useState("");
    const [mediaURL, setMediaURL] = useState("");
    const [mediaType, setMediaType] = useState(""); // New state to track media type
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [loggedInUser] = useLoggedInUser();
    const userProfilePic = loggedInUser[0]?.profileImage || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';

    const handleUploadMedia = (e) => {
        setIsLoading(true);
        const file = e.target.files[0];
        console.log(file);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'twitter_clone'); // Replace with your upload preset

        axios.post(`https://api.cloudinary.com/v1_1/dml669nbe/upload`, formData)
            .then(res => {
                setMediaURL(res.data.secure_url);
                setIsLoading(false);

                // Determine media type
                const fileType = file.type.split('/')[0];
                if (fileType === 'image') {
                    setMediaType('image');
                } else if (fileType === 'video') {
                    setMediaType('video');
                }
            }).catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    const handleTweet = (e) => {
        e.preventDefault();
        if (user.providerData[0].providerId === 'password') {
            fetch(`https://twitterclone-7laa.onrender.com/loggedInUser?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    setUserName(data[0]?.username);
                    setName(data[0]?.name);
                });
        } else {
            setUserName(user?.displayName);
            setName(email?.split('@')[0]);
        }

        if (name) {
            const userPost = {
                post: post,
                media: mediaURL,
                profilePic: userProfilePic,
                username: username,
                name: name,
                email: email
            };
            setPost('');
            setMediaURL('');
            console.log(userPost);
            fetch(`https://twitterclone-7laa.onrender.com/post`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userPost)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                });
        }
    };

    return (
        <div className={styles.tweetBox}>
            <form onSubmit={handleTweet}>
                <div className={styles.tweetBoxInput}>
                    <Avatar src={userProfilePic} />
                    <input type='text'
                        placeholder="What's happening?"
                        onChange={(e) => setPost(e.target.value)}
                        value={post}
                        required
                    />
                </div>
                <div className={styles.imageIconTweetButton}>
                    <label htmlFor='image' className={styles.imageIcon}>
                        {
                            isLoading ? <p>Uploading...</p> : (
                                mediaURL ?
                                    (mediaType === 'video' ? <p>Video uploaded successfully</p> : <p>Image uploaded successfully</p>)
                                    : <p><AddPhotoAlternateIcon /></p>
                            )
                        }
                    </label>
                    <input type='file'
                        id='image'
                        accept="image/*,video/*"
                        className={styles.imageInput}
                        onChange={handleUploadMedia}
                    />
                    <Button className={styles.tweetBoxTweetButton} type='submit' >
                        Tweet
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Tweetbox;

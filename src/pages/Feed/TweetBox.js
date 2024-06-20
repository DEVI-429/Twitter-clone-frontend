import React, { useState } from 'react';
import styles from './TweetBox.module.css';
import { Avatar, Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

function Tweetbox() {
    const base_url = process.env.REACT_APP_BASE_URL
    const [user] = useAuthState(auth);
    const email = user?.email;

    const [post, setPost] = useState("");
    const [mediaURL, setMediaURL] = useState("");
    const [mediaType, setMediaType] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [loggedInUser] = useLoggedInUser();
    const userProfilePic = loggedInUser[0]?.profileImage || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
    const [otp, setOtp] = useState('');
    const [otpRequested, setOtpRequested] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const MAX_FILE_SIZE = 5 * 1024 * 1024; 
    const MAX_VIDEO_DURATION = 30;

    const handleUploadMedia = (e) => {
        setIsLoading(true);
        const file = e.target.files[0];
        
        if (file.size > MAX_FILE_SIZE) {
            alert("File size should not exceed 5 MB");
            setIsLoading(false);
            return;
        }

        if (file.type.startsWith('video')) {
            const video = document.createElement('video');
            video.preload = 'metadata';

            video.onloadedmetadata = () => {
                window.URL.revokeObjectURL(video.src);

                if (video.duration > MAX_VIDEO_DURATION) {
                    alert("Video duration should not exceed 30 seconds");
                    setIsLoading(false);
                    return;
                }

                uploadFile(file);
            };

            video.src = URL.createObjectURL(file);
        } else {
            uploadFile(file);
        }
    };

    const uploadFile = (file) => {
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
            fetch(`${base_url}/loggedInUser?email=${email}`)
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
                email: email,
                upvoteCount: mediaType === 'video' ? Math.floor(Math.random() * 30) + 1 : 0 // Set upvoteCount for video
            };
            setPost('');
            setMediaURL('');
            console.log(userPost);
            fetch(`${base_url}/post`, {
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

    // Request OTP
const requestOTP = async () => {
    try {
      await axios.post(`${base_url}/requestOTP`, { email });
      setOtpRequested(true);
      alert('OTP sent to your email');
    } catch (error) {
      console.error(error);
      alert('Error sending OTP');
    }
  };
  
  // Verify OTP
  const verifyOTP = async () => {
    try {
      const response = await axios.post(`${base_url}/verifyOTP`, { email, otp });
      if (response.data.message === 'OTP verified successfully') {
        setOtpVerified(true);
      }
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Error verifying OTP');
    }
  };

  return (
    <div className={styles.tweetBox}>
      {!otpVerified ? (
        <div>
          {!otpRequested ? (
            <button onClick={requestOTP}>Request OTP</button>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={verifyOTP}>Verify OTP</button>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleTweet}>
          <div className={styles.tweetBoxInput}>
            <Avatar src={userProfilePic} />
            <input
              type="text"
              placeholder="What's happening?"
              onChange={(e) => setPost(e.target.value)}
              value={post}
              required
            />
          </div>
          <div className={styles.imageIconTweetButton}>
            <label htmlFor="image" className={styles.imageIcon}>
              {isLoading ? (
                <p>Uploading...</p>
              ) : mediaURL ? (
                mediaType === 'video' ? (
                  <p>Video uploaded successfully</p>
                ) : (
                  <p>Image uploaded successfully</p>
                )
              ) : (
                <p>
                  <AddPhotoAlternateIcon />
                </p>
              )}
            </label>
            <input
              type="file"
              id="image"
              accept="image/*,video/*"
              className={styles.imageInput}
              onChange={handleUploadMedia}
            />
            <Button className={styles.tweetBoxTweetButton} type="submit">
              Tweet
            </Button>
          </div>
        </form>
      )}
    </div>
  );  
}

export default Tweetbox;

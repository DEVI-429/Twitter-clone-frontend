import React,{useState,useEffect} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './MainPage.module.css'
import {useNavigate} from 'react-router-dom'
import useLoggedInUser from '../../../hooks/useLoggedInUser'
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Post from '../../Feed/Post/Post'
import axios from 'axios'
import LockResetIcon from '@mui/icons-material/LockReset';
import EditPage from '../EditPage/EditPage'

function MainPage({user}) {

    const username = user?.email.split('@')[0];
    const [loggedInUser] = useLoggedInUser();
    const [isLoading,setIsLoading] = useState();
    const [imageURL,setImageURL] = useState("");

    const [posts,setPosts] = useState([]);

  useEffect(()=>{
    fetch(`https://twitterclone-7laa.onrender.com/userPost?email=${user?.email}`)
    .then(res=>res.json()) 
    .then(data=>{
      setPosts(data);
    })
  },[posts,user?.email])

    const navigate = useNavigate();

    const handleUploadCoverImage = (e)=>{
        setIsLoading(true);
        const image=e.target.files[0];
        console.log(image);

        const formData = new FormData();
        formData.set('image',image);
        
        axios.post(`https://api.imgbb.com/1/upload?key=0bb72380825d3799c8d61d2d0dea3add`,formData)
        .then(res=>{
            // setImageURL(res.data.data.display_url)
            const url = res.data.data.display_url;
            const userCoverImage = {
                email:user?.email,
                coverImage:url
            }
            setIsLoading(false);
            if(url){
                axios.patch(`https://twitterclone-7laa.onrender.com/updateUser/${user?.email}`,userCoverImage)
            }
        }).catch((error)=>{
            console.log(error);
            setIsLoading(false);
        })
    }

    const handleUploadProflieImage = (e)=>{
        setIsLoading(true);
        const image=e.target.files[0];
        console.log(image);

        const formData = new FormData();
        formData.set('image',image);
        
        axios.post(`https://api.imgbb.com/1/upload?key=0bb72380825d3799c8d61d2d0dea3add`,formData)
        .then(res=>{
            // setImageURL(res.data.data.display_url)
            const url = res.data.data.display_url;
            const userProfileImage = {
                email:user?.email,
                profileImage:url
            }
            const userProfilePic = {
                email:user?.email,
                profilePic:url
            }
            setIsLoading(false);
            if(url){
                axios.patch(`https://twitterclone-7laa.onrender.com/updateUser/${user?.email}`,userProfileImage)
                axios.patch(`https://twitterclone-7laa.onrender.com/updatePostUserProfile/${user?.email}`,userProfilePic)
            }
        }).catch((error)=>{
            console.log(error);
            setIsLoading(false);
        })
    }
  return (
    <div>
        <ArrowBackIcon className={styles.arrowIcon} onClick={()=>{navigate('/')}} />
        <h4 className={styles.heading4}>@{username}</h4>
        <div className={styles.mainProfile}>
            <div className={styles.profileBio}>
                {
                    <div>

                        <div className={styles.coverImgContainer}>
                            <img  className={styles.coverImage} src={loggedInUser[0]?.coverImage?loggedInUser[0]?.coverImage:'https://banner2.cleanpng.com/20180406/ehe/kisspng-computer-icons-camera-vector-5ac7e86ba763d2.1779914315230506036856.jpg'}/>
                            <div className={styles.hoverCoverImage}>
                                <label htmlFor='image' className={styles.ImageIcon}>
                                    {   isLoading? 
                                        <LockResetIcon className={`${styles.photoIcon} ${styles.photoIconDisabled}`}/>:
                                        <CenterFocusWeakIcon className={styles.photoIcon}/>
                                    }
                                </label>
                                <div className={styles.imageIconTweetButton}>
                                    <input type='file' accept='image/*' id='image' className={styles.imageInput} onChange={handleUploadCoverImage}/>
                                </div>
                            </div>
                        </div>

                        <div className={styles.avatarImage}>
                            <div className={styles.avatarContainer}>
                                <img  className={styles.avatarImage} src={loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'}/>
                            <div className={styles.hoverAvatarImage}>
                                <div className={styles.imageIconTweetButton}>
                                    <label htmlFor='proflieImage' className={styles.ImageIcon}>
                                    {   isLoading? 
                                        <LockResetIcon className={`${styles.photoIcon} ${styles.photoIconDisabled}`}/>:
                                        <CenterFocusWeakIcon className={styles.photoIcon}/>
                                    }
                                    </label>
                                    <div className={styles.imageIconTweetButton}>
                                        <input type='file' accept='image/*' id='proflieImage' className={styles.imageInput} onChange={handleUploadProflieImage}/>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className={styles.userInfo}>
                                <div>
                                    <h3 className={styles.heading3}>
                                        {loggedInUser[0]?.name?loggedInUser[0]?.name:user&&user?.displayName}
                                    </h3>
                                    <p className={styles.userNameSection}>@{username}</p>
                                </div>
                                <EditPage user={user} loggedInUser={loggedInUser}/>
                                </div>
                                <div className={styles.infoContainer}>
                                    {loggedInUser[0]?.bio?loggedInUser[0]?.bio:''}
                                    <div className={styles.locationAndLink}>
                                        {loggedInUser[0]?.location?<p className={styles.subInfo}><MyLocationIcon/>{loggedInUser[0]?.location}</p>:''}
                                        {loggedInUser[0]?.website?<p className={`${styles.subInfo} ${styles.Link}`}><AddLinkIcon/>{loggedInUser[0]?.website}</p>:''}
                                    </div>
                                </div>
                                <h4 className={styles.tweetsText}>
                                    Tweets
                                </h4>
                                <hr/>
                            </div>
                                {
                                    posts.map(p => <Post key={p._id} p={p} />)
                                }
                        </div>
                }
            </div>
        </div>
    </div>
  )
}

export default MainPage
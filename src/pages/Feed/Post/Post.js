import React from 'react'
import styles from './Post.module.css'
import {Avatar} from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';

function Post({p}) {
const {post, photo, profilePic, username, name} = p;

  return (
    <div className={styles.post}>
        <div className={styles.postAvatar}>
            <Avatar src={profilePic}/>
        </div>
        <div className={styles.postBody}>
            <div className={styles.postHeader}>
                <div className={styles.postHeaderText}>
                    <h3>{name}{" "}
                    <span className={styles.postHeaderSpecial}>
                    <VerifiedIcon className={styles.postBadge}/> @ {username}
                    </span>
                    </h3>
                </div>
                <div className={styles.postHeaderDescription}>
                    {post}
                </div>
                </div>
                {   photo?
                    <img src={photo} alt='' width='500'/>:
                    ''
                }
                <div className={styles.postFooter}>
                    <ChatBubbleOutlineIcon className={styles.postFooterIcon} fontSize='small'/>
                    <RepeatIcon className={styles.postFooterIcon} fontSize='small'/>
                    <FavoriteBorderIcon className={styles.postFooterIcon} fontSize='small'/>
                    <PublishIcon className={styles.postFooterIcon} fontSize='small'/>
                </div>
            </div>
        </div>
  )
}

export default Post
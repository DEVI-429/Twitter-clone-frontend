import React from 'react';
import styles from './Post.module.css';
import { Avatar } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';

function Post({ p }) {
  const { post, media, profilePic, username, name } = p;

  // Function to determine media type
  const renderMedia = (media) => {
    const mediaType = media.split('.').pop();
    if (mediaType === 'mp4') {
      return <video src={media} autoPlay loop controls width='500' />;
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(mediaType)) {
      return <img src={media} alt='' width='500' />;
    } else {
      return null;
    }
  };

  return (
    <div className={styles.post}>
      <div className={styles.postAvatar}>
        <Avatar src={profilePic} />
      </div>
      <div className={styles.postBody}>
        <div className={styles.postHeader}>
          <div className={styles.postHeaderText}>
            <h3>
              {name}{' '}
              <span className={styles.postHeaderSpecial}>
                <VerifiedIcon className={styles.postBadge} /> @{username}
              </span>
            </h3>
          </div>
          <div className={styles.postHeaderDescription}>{post}</div>
        </div>
        {media && renderMedia(media)}
        <div className={styles.postFooter}>
          <ChatBubbleOutlineIcon className={styles.postFooterIcon} fontSize='small' />
          <RepeatIcon className={styles.postFooterIcon} fontSize='small' />
          <FavoriteBorderIcon className={styles.postFooterIcon} fontSize='small' />
          <PublishIcon className={styles.postFooterIcon} fontSize='small' />
        </div>
      </div>
    </div>
  );
}

export default Post;

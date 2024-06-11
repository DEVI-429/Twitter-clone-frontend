import React from 'react'
import styles from './Widgets.module.css'
import SearchIcon from '@mui/icons-material/Search';
import {TwitterTweetEmbed,TwitterTimelineEmbed} from 'react-twitter-embed'

function Widgets() {
  return (
    <div className={styles.widgets}>
      <div className={styles.widgetsInput}>
        <SearchIcon className={styles.widgetsSearchIcon}/>
        <input className={styles.Search} type='text' placeholder='Search Twitter'/>
      </div>
      <div className={styles.widgetContainer}>
        <h2>What's happening?</h2>
      </div>
      <TwitterTweetEmbed className={styles.twitter}
        tweetId={'933354946111705097'}
      />

<TwitterTimelineEmbed className={styles.twitter}
  sourceType="profile"
  screenName="elonmusk"
  options={{height: 400}}
/>
    </div>
  )
}

export default Widgets
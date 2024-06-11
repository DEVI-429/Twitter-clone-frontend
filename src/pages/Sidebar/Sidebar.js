import React, { useState } from 'react'
import styles from './Sidebar.module.css'
import XIcon from '@mui/icons-material/X';
import SidebarOptions from './SidebarOptions';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneIcon from '@mui/icons-material/Done';
import {Avatar,Button, IconButton, ListItemIcon, Menu, MenuItem, Divider} from '@mui/material';
import CustomLink from './CustomLink';
import useLoggedInUser from '../../hooks/useLoggedInUser';

function Sidebar({handleLogout,user}) {
    const [anchorEl,setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [loggedInUser] = useLoggedInUser();
    const userProfilePic = loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';

    const handleclick = (e)=>{
        setAnchorEl(e.currentTarget);
    }

    const handleClose=()=>{
        setAnchorEl(null);
    }

    const result = user[0]?.email.split('@')[0];

  return (
    <div className={styles.sidebar}>
        <XIcon className={styles.twitterIcon}/>
        <CustomLink to='/home/feed'>
        <SidebarOptions active Icon={HomeIcon} text='Home'/>
        </CustomLink>
        <CustomLink to='/home/Explore'>
        <SidebarOptions active Icon={TagIcon} text='Explore'/>
        </CustomLink>
        <CustomLink to='/home/notifications'>
        <SidebarOptions active Icon={NotificationsIcon} text='Notifications'/>
        </CustomLink>
        <CustomLink to='/home/messages'>
        <SidebarOptions active Icon={MailOutlineIcon} text='Messages'/>
        </CustomLink>
        <CustomLink to='/home/bookmarks'>
        <SidebarOptions active Icon={BookmarkBorderIcon} text='Bookmarks'/>
        </CustomLink>
        <CustomLink to='/home/lists'>
        <SidebarOptions active Icon={ListAltIcon} text='Lists'/>
        </CustomLink>
        <CustomLink to='/home/profile'>
        <SidebarOptions active Icon={PersonIcon} text='Profile'/>
        </CustomLink>
        <CustomLink to='/home/more'>
        <SidebarOptions active Icon={MoreHorizIcon} text='More'/>
        </CustomLink>
        <Button variant='outlined' className={styles.tweet}>
            Tweet
        </Button>

        <div className={styles.profileinfo}>
            <Avatar src={userProfilePic}></Avatar>
            <div className={styles.userinfo}>
                <h4>
                    { loggedInUser[0]?.name?loggedInUser[0]?.name: user && user[0]?.displayName}
                </h4>
                <h5>@{result}</h5>
            </div>
            <IconButton
            size='small'
            sx={{ml:2}}
            aria-controls={openMenu?"basic-menu":undefined}
            aria-haspopup={true}
            aria-expanded={openMenu?"true":undefined}
            onClick={handleclick}
            ><MoreHorizIcon/></IconButton>
            <Menu id='basic-menu' anchorEl={anchorEl} open={openMenu} onClick={handleClose} onClose={handleClose}>
                <MenuItem className={styles.profileinfo} >
                <Avatar src={userProfilePic}></Avatar>
                <div className={styles.subsuer}>
                <h4>
                    { loggedInUser[0]?.name?loggedInUser[0]?.name: user && user[0]?.displayName}
                </h4>
                <h5>@{result}</h5>
                </div>
                <ListItemIcon className='done_icon'><DoneIcon/></ListItemIcon>
                </MenuItem>
                <Divider/>
                <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout @{ loggedInUser[0]?.name?loggedInUser[0]?.name: user && user[0]?.displayName}</MenuItem>
            </Menu>
        </div>
    </div>
  )
}

export default Sidebar
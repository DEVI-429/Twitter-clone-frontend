import React, { Fragment, useState } from 'react';
import styles from './EditPage.module.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios'

function EditPage({ user, loggedInUser }) {

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [dob, setDob] = useState('');

  const handleSave =async () => {
    const editedInfo={
      name,
      bio,
      location,
      website,
      dob
    }
    if(editedInfo){
      await axios.patch(`https://twitterclone-7laa.onrender.com/updateUser/${user?.email}`,editedInfo)
      setOpen(false);
    }
  };

  function EditChild({ dob, setDob }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Fragment>
        <div className={styles.birthDateSection} onClick={handleOpen}>
          <text>Edit</text>
        </div>

        <Modal
          hideBackdrop
          onClose={handleClose}
          open={open}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 300, height: 300,top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)' }}>
            <div className={styles.text}>
              <h2>Edit date of birth</h2>
              <p>This can be changed only a few times.<br />
                Make sure you enter the age of the
                person using the account</p>
              <input
                type='date'
                onChange={e => setDob(e.target.value)}
              />
              <button className={styles.eButton} onClick={() => setOpen(false)}>Cancel</button>
            </div>
          </Box>
        </Modal>
      </Fragment>
    );
  }

  const style = {
    position: 'absolute',
    top: '15%',
    left: '30%',
    bgcolor: 'background.paper',
    // transform: 'translate(50%,50%)',
    width: '40%',
    height: '80%',
    boxShadow: 24,
    borderRadius: 8
  };



  return (
    <div style={{ position: 'relative' }}>
      <button className={styles.editProfileButton} onClick={() => setOpen(true)}>Edit Profile</button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styles.modal}>
          <div className={styles.header}>
            <IconButton onClick={() => { setOpen(false); }}><CloseIcon /></IconButton>
            <h2 className={styles.headerTitle}>Edit Profile</h2>
            <button className={styles.saveBtn} onClick={handleSave}>Save</button>
          </div>
          <form className={styles.fillContent}>
            <TextField
              className={styles.textField}
              fullWidth
              label='Name'
              variant='filled'
              onChange={(e) => { setName(e.target.value); }}
              defaultValue={loggedInUser[0]?.name || ''}
            />
            <TextField
              className={styles.textField}
              fullWidth
              label='Bio'
              variant='filled'
              onChange={(e) => { setBio(e.target.value); }}
              defaultValue={loggedInUser[0]?.bio || ''}
            />
            <TextField
              className={styles.textField}
              fullWidth
              label='Location'
              variant='filled'
              onChange={(e) => { setLocation(e.target.value); }}
              defaultValue={loggedInUser[0]?.location || ''}
            />
            <TextField
              className={styles.textField}
              fullWidth
              label='Website'
              variant='filled'
              onChange={(e) => { setWebsite(e.target.value); }}
              defaultValue={loggedInUser[0]?.website || ''}
            />
          </form>
          <div className={styles.birthDateSection}>
            <p>Birth Date</p>
            <p>.</p>
            <EditChild dob={dob} setDob={setDob} />
          </div>
          <div className={styles.lastSection}>
            {loggedInUser[0]?.dob ? (
              <h2>{loggedInUser[0]?.dob}</h2>
            ) : (
              <h2>
                {dob ? dob : 'Add your date of birth'}
              </h2>
            )}
            <div className={styles.lastBtn}>
              <h2>Switch to professional</h2>
              <ChevronRightIcon />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default EditPage;

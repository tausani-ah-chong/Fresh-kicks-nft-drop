import React, { FunctionComponent } from 'react';
import '../styles.css';
import Avatar from '@mui/material/Avatar';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import Stack from '@mui/material/Stack';
import { WEBSITE_NAME, INSTAGRAM_LINK, YOUTUBE_LINK } from '../constants'

const NavigationBar: FunctionComponent = () => {
  return (
    <div className="navigation">
      <p className='logo'>{`😈 ${WEBSITE_NAME}`}</p>
      <Stack direction="row" spacing={1}>
        <a href={INSTAGRAM_LINK}>
          <Avatar sx={{ bgcolor: '#191919', height: 32, width: 32 }} >
            <InstagramIcon fontSize="small" />
          </Avatar>
        </a>
        <a href={YOUTUBE_LINK}>
          <Avatar sx={{ bgcolor: '#191919', height: 32, width: 32 }} >
            <YouTubeIcon fontSize="small" />
          </Avatar>
        </a>
        <a href={INSTAGRAM_LINK}>
          <Avatar sx={{ bgcolor: '#191919', height: 32, width: 32 }} >
            <TwitterIcon fontSize="small" />
          </Avatar>
        </a>
      </Stack>
    </div>
  )
};

export default NavigationBar;

import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine'
import freshKicksNftGif from './assets/fresh-kicks-nft.gif'
import Avatar from '@mui/material/Avatar';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import Stack from '@mui/material/Stack';

const TWITTER_HANDLE = 'APOLLO_45k';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const YOUTUBE_LINK = 'https://oxstreet.com/'
const INSTAGRAM_LINK = 'https://www.instagram.com/oxstreet/'
const WEBSITE_NAME = 'ŌX STREET NFT'

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana.isPhantom) {      
        const response = await solana.connect({ onlyIfTrusted: true });

        setWalletAddress(response.publicKey.toString());
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);

    return () => window.removeEventListener('load', onLoad);
  }, []);

  const handleConnectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  return (
    <div className="container">
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
      <div className="header-container">
        <iframe className="gif" title="fresh-gif" src={freshKicksNftGif}></iframe>
        <div className="header-content-wrapper">
          <p className="header text-gradient">{WEBSITE_NAME}</p>
          {!walletAddress && (
            <button
              className="cta-button connect-wallet-button-color"
              onClick={handleConnectWallet}
            >
              Connect to Wallet
            </button>
          )}
          {walletAddress && <CandyMachine walletAddress={window.solana} />}
        </div>
      </div>
      <div className="footer-container">
        <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`built by @${TWITTER_HANDLE}`}</a>
      </div>
    </div>
  );
};

export default App;

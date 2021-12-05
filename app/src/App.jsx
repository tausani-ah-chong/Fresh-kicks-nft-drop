import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine'

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;


const App = () => {
  const [walletStatus, setWalletStatus] = useState('Wallet pending');
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana.isPhantom) {      
        console.log('Phantom wallet found!');
        setWalletStatus('Has Solana wallet')

        const response = await solana.connect({ onlyIfTrusted: true });

        console.log('Connected with Public Key:', response.publicKey.toString());


        setWalletAddress(response.publicKey.toString());
        setWalletStatus('Wallet connected!')
      } else {
        setWalletStatus('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
      setWalletStatus('Error connecting to Solana Wallet')
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
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!walletAddress && (
            <button
              className="cta-button connect-wallet-button"
              onClick={handleConnectWallet}
            >
              Connect to Wallet
            </button>
          )}
          <p className="sub-text">Current wallet status: {walletStatus}</p>
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;

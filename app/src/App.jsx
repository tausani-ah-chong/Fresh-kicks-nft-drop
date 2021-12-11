import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine'
import freshKicksNftGif from './assets/fresh-kicks-nft.gif'

// Constants
const TWITTER_HANDLE = 'APOLLO_45k';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;


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
    <div className="App">
      <div className="container">
        <div className="header-container">
          <iframe className="gif" title="fresh-gif" src={freshKicksNftGif}></iframe>
          <div className="header-content-wrapper">
            <p className="header">FRESH KICKS NFT</p>
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
    </div>
  );
};

export default App;

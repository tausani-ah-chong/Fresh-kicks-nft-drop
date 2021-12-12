import React, { FunctionComponent, useEffect, useState } from "react";
import '../styles.css';
import CandyMachine from "../CandyMachine";
import { WEBSITE_NAME } from "../constants";
import freshKicksNftGif from '../assets/fresh-kicks-nft.gif';

// TODO: fix this type error properly 
declare global {
  interface Window {
      solana: any;
  }
}

const Header: FunctionComponent = () => {
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
    <div className="header-container">
      <img className="gif" alt="fresh-gif" src={freshKicksNftGif} />
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
  )
}

export default Header;

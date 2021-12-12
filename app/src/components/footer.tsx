import React, { FunctionComponent } from "react";
import '../styles.css';
import twitterLogo from '../assets/twitter-logo.svg';
import { TWITTER_HANDLE, TWITTER_LINK } from "../constants";

const Footer: FunctionComponent = () => {
  return (
    <div className="footer-container">
      <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
      <a
        className="footer-text"
        href={TWITTER_LINK}
        target="_blank"
        rel="noreferrer"
      >
        {`built by @${TWITTER_HANDLE}`}
      </a>
    </div>
  )
};

export default Footer;

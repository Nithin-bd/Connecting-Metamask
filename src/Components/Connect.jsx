import React, { useState, useEffect } from "react";
import { useWeb3 } from "./Web3Provider";

const Connect = () => {
  const { web3, account } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    console.log("Web3:", web3);
    console.log("Account:", account);

    // Check if MetaMask is already connected on component mount
    if (window.ethereum && window.ethereum.selectedAddress) {
      setConnected(true);
    }
  }, [web3, account]);

  useEffect(() => {
    console.log("Connected state:", connected);
  }, [connected]);

  const handleConnect = async () => {
    try {
      console.log("Button clicked");

      if (!window.ethereum) {
        console.error("MetaMask not installed or not available");
        return;
      }

      if (!web3) {
        console.error("Web3 not initialized");
        return;
      }

      // Check if MetaMask is already connected before attempting to connect
      if (window.ethereum.selectedAddress) {
        setConnected(true);
        return;
      }

      setLoading(true);

      console.log("Requesting account access...");
      // Request account access using ethereum.request
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Account access granted:", accounts);
      setTimeout(() => {
        setConnected(true);
        console.log("Connected account:", accounts[0]);
        setLoading(false);
      }, 0);
    } catch (error) {
      console.error("User denied account access or connection failed", error);
      setLoading(false);
    }
  };

  const buttonStyle = {
    color: "white",
    backgroundColor: loading || connected ? "gray" : "#4caf50",
  };

  const buttonText = loading
    ? "Connecting..."
    : connected
    ? "Connected!"
    : "Connect to MetaMask";

  return (
    <div className="connection-box">
      <button
        className="connectBtn"
        onClick={handleConnect}
        disabled={loading || connected}
        style={buttonStyle}
      >
        {buttonText}
      </button>

      {connected && (
        <div>
          <h4 className="account">Connected Account: {account}</h4>
        </div>
      )}
    </div>
  );
};

export default Connect;

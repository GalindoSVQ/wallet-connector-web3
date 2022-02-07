import { useWeb3React } from "@web3-react/core";
import { useEffect, useCallback } from "react";

import styles from "../styles/Home.module.css";
import { connector } from "../config/web3";

export default function Home() {
  const { activate, active, account, chainId, deactivate, error } =
    useWeb3React();

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previuslyConnected", true);
  }, [activate]);

  const disconnect = () => {
    deactivate;
    localStorage.removeItem("previuslyConnected");
  };

  useEffect(() => {
    if (localStorage.getItem("previuslyConnected") === "true") {
      connect();
    }
  }, [connect]);

  if (error) {
    return <div>Something went wrong 🤷🏼‍♂️ </div>;
  }
  return (
    <div className={styles.container}>
      <h1>web3 Demo Web </h1>
      {active ? (
        <>
          <button onClick={disconnect}>Disconnect Wallet</button>
          <p>
            You are connected to the network with ID: {chainId} <br />
            You account is: {account}
          </p>
        </>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}

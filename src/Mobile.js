/* Components */
import Gnb from "./component/Mobile/gnb";
import Modal from "./component/Mobile/modal";
import Pools from "./component/Mobile/pools";
import YieldFarming from "./component/Mobile/yieldFarming";
import Swap from "./component/Mobile/Swap";
/* Libraries */
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import contracts from "./lib/contracts";
import styled from "styled-components";

function Mobile({ web3Modal }) {
  const [display, setDisplay] = useState(false);
  const [displayS, setDisplayS] = useState(false);
  const [type, setType] = useState("pool");
  const [choosen, choise] = useState("Staking");
  const [web3, setWeb3] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [chainId, setChainId] = useState(-1);

  const position = ["Staking", "YieldFarming", "Swap"];

  const ConnectWallet = async () => {
    const provider = await web3Modal.connect();
    await setWeb3(new Web3(provider));
  };

  useEffect(async () => {
    window.addEventListener("scroll", () => onScroll());

    return () => {
      window.removeEventListener("scroll", onscroll);
    };
  }, []);

  useEffect(async () => {
    if (!web3) return;
    setAccount((await web3.eth.getAccounts())[0]);
    setChainId(await web3.eth.getChainId());
  }, [web3]);

  const onScroll = e => {
    choise(position[Math.floor(window.scrollY / window.innerHeight)]);
  };

  return (
    <div className="Mobile">
      <TopNav style={{ display: display ? "none" : "flex" }}>
        <div className="container">
          <img className="logo" src="./images/logo.svg" />
          <span>UNILORD</span>
          <img
            className="navBt"
            src="./images/btn-hbg.svg"
            onClick={() => {
              setDisplay(!display);
            }}
          />
        </div>
      </TopNav>
      <Gnb
        display={display}
        setDisplay={setDisplay}
        choosen={choosen}
        choise={choise}
        connectWallet={ConnectWallet}
        account={account}
      />
      <Pools
        web3={web3}
        account={account}
        connectWallet={ConnectWallet}
        pools={contracts[chainId] ? contracts[chainId].SPOOL : undefined}
      />
      <YieldFarming
        web3={web3}
        account={account}
        connectWallet={ConnectWallet}
        pools={contracts[chainId] ? contracts[chainId].YPOOL : undefined}
      />
      <Swap
        web3={web3}
        account={account}
        pools={contracts[chainId] ? contracts[chainId].SPOOL : undefined}
      />
      <Modal type={type} display={displayS} setDisplay={setDisplayS} />
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
          background-color: black;
        }
      `}</style>
    </div>
  );
}
const TopNav = styled.div`
  .container {
    position: fixed;
    display: flex;
    width: 100%;
    height: 60px;
    background-color: #000000;
  }

  .logo {
    margin: auto auto;
    margin-right: 20px;
    width: 35px;
    height: 35px;
  }
  span {
    margin: auto 0px;
    font-weight: bold;
    font-size: 20px;
    color: #ffffff;
    padding-top: 10px;
  }
  .navBt {
    margin: auto auto;
    margin-right: 20px;
    width: 20px;
    height: 20px;
  }
`;

export default Mobile;

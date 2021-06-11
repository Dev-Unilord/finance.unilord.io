/* Components */
import Gnb from "./component/Desktop/gnb";
import Pools from "./component/Desktop/pools";
import YieldFarming from "./component/Desktop/yieldFarming";
import Swap from "./component/Desktop/Swap";
import Modal from "./component/Desktop/modal";
/* Libraries */
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import contracts from "./lib/contracts";

function Desktop({ web3Modal }) {
  const [display, setDisplay] = useState(false);
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
    <div className="Desktop">
      <Gnb
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
      <Modal type={type} modalOpen={display} setModalOpen={setDisplay} />
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

export default Desktop;

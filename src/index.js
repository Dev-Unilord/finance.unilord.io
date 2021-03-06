import React, { useState } from "react";
import ReactDOM from "react-dom";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import reportWebVitals from "./reportWebVitals";
import { BrowserView, MobileView } from "react-device-detect";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from "recoil";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  metamask: {
    id: "injected",
    name: "MetaMask",
    type: "injected",
    check: "isMetaMask"
  },
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "3fc11d1feb8944229a1cfba7bd62c8bc", // Required
      network: "mainnet",
      qrcodeModalOptions: {
        mobileLinks: [
          // "rainbow",
          "metamask"
          // "argent",
          // "trust",
          // "imtoken",
          // "pillar"
        ]
      }
    }
  }
};
const web3Modal = new Web3Modal({
  network: "mainnet",
  // network: "ropsten",
  cacheProvider: true,
  providerOptions
});

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserView>
        <Desktop web3Modal={web3Modal} />
      </BrowserView>
      <MobileView>
        <Mobile web3Modal={web3Modal} />
      </MobileView>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

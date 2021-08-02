import styled from "styled-components";
import React, { useState } from "react";

function Gnb({ choosen, choise, connectWallet, account }) {
  function Scroll(section) {
    window.location = "#" + section;
    choise(section);
  }

  return (
    <Container className="Gnb">
      <Content>
        <Logo onClick={() => Scroll("Staking")}>
          <img src="./images/logo.svg" />
          <div className="name">
            <div>UNILORD</div>
            <div>FINANCE</div>
          </div>
        </Logo>
        <ConnectWallet onClick={() => connectWallet()}>
          <span>
            {account
              ? account.substring(0, 8) + "..." + account.substring(36, 42)
              : "Connect wallet"}
          </span>
        </ConnectWallet>
        <Nav>
          <div
            className={"nav " + (choosen == "Home" ? "choosen" : "")}
            onClick={() => (window.location = "https://unilord.io")}
          >
            <NLine />
            <span>HOME</span>
          </div>

          <div
            className={
              "nav " +
              (choosen == "Staking" || choosen == "YieldFarming"
                ? "choosen"
                : "")
            }
            onClick={() => Scroll("Staking")}
          >
            <NLine />
            <span>Lord Pools</span>
          </div>

          <div
            className={"nav sub " + (choosen == "Staking" ? "choosen2" : "")}
            onClick={() => Scroll("Staking")}
          >
            <SubLine />
            <span>Staking</span>
          </div>
          <div
            className={
              "nav sub " + (choosen == "YieldFarming" ? "choosen2" : "")
            }
            onClick={() => Scroll("YieldFarming")}
          >
            <SubLine />
            <span>Yield Farming</span>
          </div>
          <div
            className={"nav " + (choosen == "Swap" ? "choosen" : "")}
            onClick={() => Scroll("Swap")}
          >
            <NLine />
            <span>Lord Swap</span>
          </div>
          <div
            className={
              "nav disabled " + (choosen == "Finance" ? "choosen" : "")
            }
          >
            <NLine />
            <span>Lord Finance</span>
          </div>
          <div
            className={"nav " + (choosen == "Vote" ? "choosen" : "")}
            onClick={() => (window.location = "https://snapshot.org/#/")}
          >
            <NLine />
            <span>Vote</span>
          </div>
          <div
            className={"nav " + (choosen == "About" ? "choosen" : "")}
            onClick={() =>
              (window.location =
                "https://unilord.medium.com/introducing-unilord-3e52ffa2032c")
            }
          >
            <NLine />
            <span>About Lord</span>
          </div>
        </Nav>
      </Content>
      <Line />
    </Container>
  );
}
const ConnectWallet = styled.div`
  display: flex;
  margin-top: 60px;
  width: 150px;
  height: 30px;
  object-fit: contain;
  border-radius: 20px;
  box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.6);
  background-color: #000000;
  span {
    margin: auto auto;
    font-family: Times New Roman;
    font-size: 15px;
    font-size: 15px;
    font-style: italic;
    line-height: 1.13;
    text-align: center;
    color: #29a7ff;
  }
`;
const Container = styled.div`
  display: flex;
  width: 30vw;
  height: 100vh;
  min-height: 480px;
  position: fixed;
`;
const Line = styled.div`
  display: flex;
  width: 1px;
  height: 100vh;
  margin-right: 0;
  object-fit: contain;
  background-color: #ffffff;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 500px;
  margin: auto auto;
  margin-right: 0px;
  span {
    cursor: pointer;
  }
`;
const Logo = styled.div`
  display: flex;
  width: 200px;
  img {
    margin: auto 0;
    width: 50px;
    height: 50px;
  }
  .name {
    div {
      margin: auto;
      margin-left: 9px;
      // font-family: NotoNastaliqUrdu;
      font-size: 20px;
      font-weight: bold;
      text-align: left;
      color: #ffffff;
    }
  }
`;
const Nav = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  .nav {
    display: flex;
    margin-top: 37px;
    div {
      display: none;
    }
    span {
      margin-left: 68px;
      font-family: Times New Roman;
      font-size: 15px;
      text-align: left;
      color: #ffffff;
    }
  }
  .sub {
    margin-top: 10px;
    span {
      margin-left: 84px;
    }
  }
  .choosen {
    display: flex;
    width: 200px;
    div {
      display: block;
    }
    span {
      margin-left: 0px;
      font-weight: bold;
    }
  }
  .choosen2 {
    display: flex;
    width: 200px;
    div {
      display: block;
    }
    span {
      margin-left: 0px;
      font-weight: normal;
    }
  }
  .disabled {
    cursor: not-allowed;
  }
`;
const NLine = styled.div`
  width: 50px;
  height: 2px;
  margin: auto 9px;
  object-fit: contain;
  border-radius: 3px;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  box-shadow: 0 0 10px 0 #ffffff;
  background-color: #ffffff;
`;
const SubLine = styled.div`
  width: 25px;
  height: 1px;
  margin: auto 9px;
  margin-left: 50px;
  object-fit: contain;
  border-radius: 3px;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  box-shadow: 0 0 10px 0 #ffffff;
  background-color: #ffffff;
`;

export default Gnb;

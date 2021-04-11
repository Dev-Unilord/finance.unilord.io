import styled from "styled-components";
import React, { useState } from "react";

function Gnb({ choosen, choise }) {
  function Scroll(section) {
    window.location = "#" + section;
    choise(section);
  }

  return (
    <Container className="Gnb">
      <Content>
        <Logo onClick={() => Scroll("Pools")}>
          <img src="./images/logo.svg" />
          <span>UNILORD</span>
        </Logo>
        <Nav>
          <div
            className={"nav " + (choosen == "Home" ? "choosen" : "")}
            onClick={() => (window.location = "https://unilord.io")}
          >
            <NLine />
            <span>HOME</span>
          </div>
          <div
            className={"nav " + (choosen == "Pools" ? "choosen" : "")}
            onClick={() => Scroll("Pools")}
          >
            <NLine />
            <span>Lord Pools</span>
          </div>
          <div
            className={"nav disabled " + (choosen == "Swap" ? "choosen" : "")}
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
            className={"nav disabled " + (choosen == "About" ? "choosen" : "")}
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
`;
const Logo = styled.div`
  display: flex;
  width: 200px;
  img {
    width: 50px;
    height: 50px;
  }
  span {
    margin: auto auto;
    margin-left: 9px;
    font-family: NotoNastaliqUrdu;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    color: #ffffff;
  }
`;
const Nav = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 84px;
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

export default Gnb;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { atom, useRecoilState } from "recoil";

function Pools() {
  // useEffect(() => {
  //   const timerInstance = setInterval(DdayTimer, 1000);
  //   return () => {
  //     clearInterval(timerInstance);
  //   };
  // }, [time]);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <Container className="Pools" id="Pools">
      <Title>
        <span>LORD Pool</span>
      </Title>
      <Pool>
        <Content className="column">
          <img src="./images/logo-peer.svg" />
          <span className="name">PEER</span>
          <span className="APY">APY: 30.00%</span>
          <Line />
          <span className="countdown">00.00.00:00</span>
          <span className="locked">PEER 000,000,000.00 PEER</span>
          <span className="lockedValue">TVL $999,999,999.00 PEER Locked</span>
          <BtnStake
            onClick={() => {
              setIsOpen1(!isOpen1);
            }}
          >
            <span>Stake</span>
            <img src={`./images/cross-${isOpen1 ? "left" : "right"}.svg`} />
          </BtnStake>
        </Content>
        <LineV className={isOpen1 ? "" : "hide"} />
        <Content className={"sub " + (isOpen1 ? "" : "hide")}>
          <div className="amount">
            <span className="text">PEER Locked:</span>
            <span className="value">000,000,000.00</span>
            <span className="symbol">PEER</span>
          </div>
          <div className="amount" style={{ marginTop: "10px" }}>
            <span className="text">USDT Mined:</span>
            <span className="value">000,000,000.00</span>
            <span className="symbol">USDT</span>
          </div>
          <div className="amount" style={{ marginTop: "25px" }}>
            <span className="text">Balance:</span>
            <span className="value">000,000,000.00</span>
            <span className="symbol">PEER</span>
          </div>
          <input
            type="text"
            className="amountStake"
            placeholder="Enter the amount of stake"
          />
          <div className="selected" style={{ marginTop: "3px" }}>
            <span className="text">Selected:</span>
            <span className="value">000,000,000.00</span>
          </div>
          <PercentBtns>
            <div>
              <span>25%</span>
            </div>
            <div>
              <span>50%</span>
            </div>
            <div>
              <span>75%</span>
            </div>
            <div>
              <span>100%</span>
            </div>
          </PercentBtns>
          <TwoBtns>
            <div>
              <span>Approve</span>
            </div>
            <div>
              <span>Unstake</span>
            </div>
          </TwoBtns>
          <StakeBtn>
            <span>Stake</span>
          </StakeBtn>
        </Content>
      </Pool>
      <Pool>
        <Content className="column">
          <img src="./images/logo-peer.svg" />
          <span className="name">PEER - LP</span>
          <span className="APY">APY: 30.00%</span>
          <Line />
          <span className="countdown">00.00.00:00</span>
          <span className="locked">PEER 000,000,000.00 PEER</span>
          <span className="lockedValue">TVL $999,999,999.00 PEER Locked</span>
          <BtnStake
            onClick={() => {
              setIsOpen2(!isOpen2);
            }}
          >
            <span>Stake</span>
            <img src={`./images/cross-${isOpen2 ? "left" : "right"}.svg`} />
          </BtnStake>
        </Content>
        <LineV className={isOpen2 ? "" : "hide"} />
        <Content className={"sub " + (isOpen2 ? "" : "hide")}>
          <div className="amount">
            <span className="text">PEER Locked:</span>
            <span className="value">000,000,000.00</span>
            <span className="symbol">PEER</span>
          </div>
          <div className="amount" style={{ marginTop: "10px" }}>
            <span className="text">USDT Mined:</span>
            <span className="value">000,000,000.00</span>
            <span className="symbol">USDT</span>
          </div>
          <div className="amount" style={{ marginTop: "25px" }}>
            <span className="text">Balance:</span>
            <span className="value">000,000,000.00</span>
            <span className="symbol">PEER</span>
          </div>
          <input
            type="text"
            className="amountStake"
            placeholder="Enter the amount of stake"
          />
          <div className="selected" style={{ marginTop: "3px" }}>
            <span className="text">Selected:</span>
            <span className="value">000,000,000.00</span>
          </div>
          <PercentBtns>
            <div>
              <span>25%</span>
            </div>
            <div>
              <span>50%</span>
            </div>
            <div>
              <span>75%</span>
            </div>
            <div>
              <span>100%</span>
            </div>
          </PercentBtns>
          <TwoBtns>
            <div>
              <span>Approve</span>
            </div>
            <div>
              <span>Unstake</span>
            </div>
          </TwoBtns>
          <StakeBtn>
            <span>Stake</span>
          </StakeBtn>
        </Content>
      </Pool>
    </Container>
  );
}
const Title = styled.div`
  display: flex;
  margin-top: 50px;
  margin-bottom: 80px;
  margin-left: calc(30vw + 100px);
  span {
    width: 198px;
    height: 45px;
    font-family: Times New Roman;
    font-size: 40px;
    font-weight: bold;
    font-style: italic;
    line-height: 1.18;
    text-align: center;
    color: #ffffff;
  }
`;
const Pool = styled.div`
  display: flex;
  margin: auto 0;
  margin-left: 35vw;
  width: 647px;
  object-fit: contain;
  background-color: #000000;
`;
const Container = styled.div`
  display: flex;
  width: 100vw;
  min-width: 1280px;
  height: 100vh;
  min-height: 480px;
  flex-direction: column;
  .hide {
    display: none;
  }
  .column {
    flex-direction: column;
    img {
      width: 72px;
      height: 72px;
      margin: auto auto;
      margin-top: 0;
      margin-bottom: 0px;
    }
    .name {
      margin: auto auto;
      margin-top: 10px;
      margin-bottom: 0;
      font-family: Times New Roman;
      font-size: 20px;
      font-weight: bold;
      line-height: 1.15;
      font-style: italic;
      text-align: center;
      color: #ffffff;
    }
    .APY {
      margin: auto auto;
      margin-top: 25px;
      margin-bottom: 0;
      font-family: Times New Roman;
      font-size: 20px;
      line-height: 27px;
      color: #ffffff;
    }
    .countdown {
      margin: 0 auto;
      margin-top: 10px;
      font-family: Times New Roman;
      font-size: 12px;
      line-height: 1.25;
      color: #ffffff;
    }
    .locked {
      margin: 0 auto;
      margin-top: 25px;
      width: 200px;
      font-family: Times New Roman;
      font-size: 12px;
      line-height: 1.25px;
      color: #ffffff;
    }
    .lockedValue {
      margin: 0 auto;
      margin-top: 10px;
      width: 200px;
      font-family: Times New Roman;
      font-size: 12px;
      line-height: 1.25px;
      color: #ffffff;
    }
  }

  .sub {
    flex-direction: column;
    height: 250px;
    width: 210px;
    margin-left: 0;
    font-family: Times New Roman;
    font-size: 12px;
    line-height: 1.25;
    color: #ffffff;
    .amount {
      display: flex;
      width: 210px;
      .text {
        margin-left: 0;
      }
      .value {
        margin-left: auto;
        margin-right: 10px;
      }
      .symbol {
        margin-right: 0;
      }
    }
    .selected {
      display: flex;
      margin-left: auto;
      margin-right: 0px;
      width: 130px;
      .text {
        margin-left: 0;
      }
      .value {
        margin-left: auto;
      }
    }
    .amountStake {
      margin-top: 10px;
      width: 200px;
      height: 30px;
      text-align: right;
      font-size: 12px;
      line-height: 1.25;
      color: #ffffff;
      object-fit: contain;
      padding: 0 10px 0 0;
      background-color: black;
      box-shadow: none;
      border: solid 0.3px #d8d8d8;
    }
  }
`;

const Content = styled.div`
  display: flex;
  width: 290px;
  height: 350px;
  margin: auto 0;
`;
const Line = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  width: 134px;
  height: 2px;
  object-fit: contain;
  border-radius: 3px;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  box-shadow: 0 0 10px 0 #ffffff;
  background-color: #ffffff;
`;
const LineV = styled.div`
  margin: auto 0;
  margin-left: 50px;
  margin-right: 20px;
  width: 1px;
  height: 249px;
  object-fit: contain;
  background-color: #ffffff;
`;
const BtnStake = styled.div`
  display: flex;
  margin: auto auto;
  margin-top: 37px;
  margin-bottom: 22px;
  margin-right: 12px;
  width: 86px;
  height: 22px;
  padding: 4px 17px;
  object-fit: contain;
  border-radius: 20px;
  background-color: #ffffff;
  span {
    margin: auto auto;
    font-family: Times New Roman;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.25;
    text-align: center;
    color: #000000;
  }
  img {
    margin: auto auto !important;
    width: 18px !important;
    height: 15px !important;
  }
`;
const PercentBtns = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 210px;
  height: 18px;
  div {
    display: flex;
    width: 48px;
    height: 18px;
    object-fit: contain;
    background-color: #ffffff;
    span {
      margin: auto auto;
      font-family: Times New Roman;
      font-size: 12px;
      line-height: 1.25;
      text-align: left;
      color: #000000;
    }
  }
`;
const TwoBtns = styled.div`
  display: flex;
  margin-top: 20px;
  width: 210px;
  height: 24px;
  justify-content: space-between;
  div {
    display: flex;
    width: 100px;
    height: 24px;
    object-fit: contain;
    box-shadow: 0 0 5px 0 #ffffff;
    border: solid 1px #ffffff;
    span {
      margin: auto auto;
      font-family: Times New Roman;
      font-size: 15px;
      font-weight: bold;
      line-height: 1.13;
      text-align: center;
      color: #ffffff;
    }
  }
`;
const StakeBtn = styled.div`
  display: flex;
  margin-top: 10px;
  width: 208px;
  height: 30px;
  object-fit: contain;
  box-shadow: 0 0 5px 0 #ffffff;
  border: solid 1px #ffffff;
  span {
    margin: auto auto;
    font-family: Times New Roman;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.13;
    text-align: center;
    color: #ffffff;
  }
`;
export default Pools;

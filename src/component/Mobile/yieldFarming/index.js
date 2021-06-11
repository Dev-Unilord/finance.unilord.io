import React, { useState, useEffect } from "react";
import styled from "styled-components";
import YieldFarming from "./yieldFarming";
import axios from "axios";

function StartInterval(callback, t) {
  callback();
  return setInterval(callback, t);
}
function Pools({ name, web3, account, connectWallet, pools }) {
  const [prices, setPrices] = useState({});
  useEffect(() => {
    let Interval = StartInterval(async () => {
      let res = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=unilord,weth&vs_currencies=usd"
      );
      setPrices(res.data);
      console.log(res.data);
    }, 5000);
    return clearInterval(Interval);
  }, []);
  return (
    <Container className="YieldFarming" id="YieldFarming">
      <Title>
        <span>
          LORD Pool<br></br><a>Yield Farming</a>
        </span>
      </Title>
      <YieldFarming
        name="LORD"
        stakePrice={prices.unilord ? prices.unilord.usd : 0}
        rewardPrice={prices.weth ? prices.weth.usd : 0}
        web3={web3}
        account={account}
        connectWallet={connectWallet}
        pool={pools ? pools["LORD"] : undefined}
      />
      <YieldFarming
        name="LORD-LP"
        stakePrice={prices.unilord ? prices.unilord.usd * 614 : 0}
        rewardPrice={prices.weth ? prices.weth.usd : 0}
        web3={web3}
        account={account}
        connectWallet={connectWallet}
        pool={pools ? pools["LORDLP"] : undefined}
      />
    </Container>
  );
}
const Title = styled.div`
  display: flex;
  width: 100vw;
  margin: 5vh 0;
  margin-bottom: 80px;
  span {
    margin: 0 auto;
    margin-top: 50px;
    height: 45px;
    font-family: Times New Roman;
    font-size: 8vw;
    font-weight: bold;
    font-style: italic;
    line-height: 1.18;
    text-align: center;
    color: #ffffff;
  }
  a {
    color: #e8164f;
  }
`;
const Container = styled.div`
  display: flex;
  width: 100vw;
  // height: 100vh;
  flex-direction: column;
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
      margin: 10px auto;
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
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 5vh;
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
export default Pools;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { atom, useRecoilState } from "recoil";
import { fromWei, toWei, toBN } from "web3-utils";
import { resultingClientExists } from "workbox-core/_private";
import CountUp from "react-countup";
export const ERC20_ABI = require("./../../../lib/abis/ERC20ABI.json");
export const POOL_ABI = require("./../../../lib/abis/poolABI.json");

function getAPY(TotalReward, TotalLocked, MyLocked, RewardPrice, StakePrice) {
  let APY = 0;
  let reward = TotalReward * RewardPrice + 1;
  let staked = TotalLocked * StakePrice;
  APY = ((reward / staked) * 100 * 365) / 14;
  if (APY > 100000000) APY = 0;
  if (isNaN(APY)) return 0;
  return APY;
}
const timeState = atom({
  key: "timeState",
  default: {
    d: 0,
    h: 0,
    m: 0,
    s: 0
  }
});
const P = number => {
  return number.toString().padStart(2, "0");
};
function n(x, pad = 2) {
  x = fromWei(String(x).split(".")[0], "ether").toString();
  let n = x.split(".");

  x =
    n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (n.length == 2 ? "." + n[1].substr(0, pad) : ".00");
  if (pad == 18) x = n[0] + (n.length == 2 ? "." + n[1].substr(0, pad) : ".00");
  return x;
}
function getTVL(TL, price) {
  let TVL = toBN(TL.toString())
    .mul(toBN((price * 10 ** 10).toString().split(".")[0]))
    .div(toBN(10 ** 10));
  return TVL;
}
function StartInterval(callback, t) {
  callback();
  return setInterval(callback, t);
}
function isOver(periodFinish) {
  let timestampSecond = Math.floor(+new Date() / 1000);
  return timestampSecond > periodFinish;
}

function isStart(startTime) {
  let timestampSecond = Math.floor(+new Date() / 1000);
  return timestampSecond > startTime;
}

function Pool({
  name,
  stakePrice,
  rewardPrice,
  web3,
  account,
  connectWallet,
  pool
}) {
  const [time, setTime] = useRecoilState(timeState);

  const DdayTimer = () => {
    var dday = new Date("April 14, 2021 23:00:00").getTime();
    var nowday = new Date();
    nowday = nowday.getTime();
    var distance = dday - nowday;

    var d = Math.floor(distance / (1000 * 60 * 60 * 24));

    var h = Math.floor((distance / (1000 * 60 * 60)) % 24);
    var m = Math.floor((distance / (1000 * 60)) % 60);
    var s = Math.floor((distance / 1000) % 60);
    if (distance <= 0) {
      setTime({
        d: 0,
        h: 0,
        m: 0,
        s: 0
      });
    } else {
      setTime({
        d,
        h,
        m,
        s
      });
    }
  };

  useEffect(() => {
    const timerInstance = setInterval(DdayTimer, 1000);
    return () => {
      clearInterval(timerInstance);
    };
  }, [time]);

  // useEffect(() => {
  //   const timerInstance = setInterval(DdayTimer, 1000);
  //   return () => {
  //     clearInterval(timerInstance);
  //   };
  // }, [time]);
  const [isOpen, setIsOpen] = useState(false);
  const [plAPY, setPlAPY] = useState(30);
  const [plTL, setPlTL] = useState(0);
  const [plLocked, setPlLocked] = useState(0);
  const [plMined, setPlMined] = useState(0);
  const [plBalance, setPlBalance] = useState(0);
  const [plAmount, setPlAmount] = useState("0");
  const [plIsApproved, setPlIsApproved] = useState(false);
  const [stakeToken, setStakeToken] = useState(undefined);
  const [rewardToken, setRewardToken] = useState(undefined);
  const [rewardTotal, setRewardTotal] = useState(0);
  const [RewardTokenInstance, setRewardTokenInstance] = useState(undefined);
  const [PoolInstance, setPoolInstance] = useState(undefined);
  const [StakeTokenInstance, setStakeTokenInstance] = useState(undefined);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const Approve = () => {
    if (!StakeTokenInstance || plIsApproved) return;
    StakeTokenInstance.methods
      .approve(pool, toWei("9999999999999999999", "ether"))
      .send({ from: account });
  };
  const GetReward = () => {
    if (!PoolInstance) return;
    PoolInstance.methods.getReward().send({ from: account });
  };
  const Stake = () => {
    if (!PoolInstance) return;
    PoolInstance.methods
      .stake(toWei(plAmount, "ether"))
      .send({ from: account });
    setPlAmount(0);
  };
  const UnStake = () => {
    if (!PoolInstance) return;
    PoolInstance.methods.exit().send({ from: account });
  };
  const SetPercent = x => {
    setPlAmount(((n(plBalance).replaceAll(",", "") / 100) * x).toString());
  };
  const createInstance = () => {
    setPoolInstance(new web3.eth.Contract(POOL_ABI, pool));
  };
  const createTokenInstance = () => {
    setStakeTokenInstance(new web3.eth.Contract(ERC20_ABI, stakeToken));
    setRewardTokenInstance(new web3.eth.Contract(ERC20_ABI, rewardToken));
  };

  useEffect(() => {
    if (!web3) return;
    createInstance();
  }, [pool]);

  useEffect(() => {
    if (!web3) return;
    createTokenInstance();
  }, [rewardToken]);

  useEffect(async () => {
    console.log(RewardTokenInstance);
    if (!PoolInstance) return;
    setStakeToken(await PoolInstance.methods.stakeToken.call().call());
    setRewardToken(await PoolInstance.methods.rewardToken.call().call());
    if (!RewardTokenInstance) return;
    const Interval = StartInterval(async () => {
      setPlLocked(await PoolInstance.methods.balanceOf(account).call());
      setPlMined(await PoolInstance.methods.earned(account).call());
      setPlTL(await PoolInstance.methods.totalSupply().call());
      setDuration(await PoolInstance.methods.DURATION().call());
      setStartTime(await PoolInstance.methods.startTime().call());
      setRewardTotal(await RewardTokenInstance.methods.balanceOf(pool).call());
    }, 3000);
    return () => {
      clearInterval(Interval);
    };
  }, [PoolInstance, RewardTokenInstance]);

  useEffect(async () => {
    if (!StakeTokenInstance || !account) return;
    const Interval = StartInterval(async () => {
      setPlBalance(await StakeTokenInstance.methods.balanceOf(account).call());
      setPlIsApproved(
        (await StakeTokenInstance.methods.allowance(account, pool).call()) > 0
          ? true
          : false
      );
    }, 3000);

    return () => {
      clearInterval(Interval);
    };
  }, [StakeTokenInstance]);

  return (
    <Container className="Pool" id="Pool">
      <Content className="column">
        <img src="./images/logo-peer.png" />
        <span className="name">{name}</span>
        <span className="APY">
          APY:{" "}
          {getAPY(rewardTotal, plTL, plLocked, rewardPrice, stakePrice).toFixed(
            2
          )}
          %
        </span>
        <Line />
        <span className="countdown">{`${P(time.d)}.${P(time.h)}.${P(
          time.m
        )}:${P(time.s)}`}</span>
        <div className="amount" style={{ marginTop: "10px" }}>
          <div className="items text">Total</div>
          <div className="items value">{n(plTL)}</div>
          <div className="items symbol">{name}</div>
        </div>
        <div className="amount" style={{ marginTop: "10px" }}>
          <div className="items text">TVL</div>
          <div className="items value">{n(getTVL(plTL, stakePrice))}</div>
          <div className="items symbol">USD</div>
        </div>
      </Content>
      <LineV className={isOpen ? "" : "hide"} />
      <Content className={"sub " + (isOpen ? "" : "hide")}>
        <div className="amount">
          <span className="text">Locked:</span>
          <span className="value">{n(plLocked)}</span>
          <span className="symbol">{name}</span>
        </div>
        <div className="amount" style={{ margin: "5px auto" }}>
          <span className="text">Mined:</span>
          <span className="value">
            <CountUp
              preserveValue={true}
              end={Number(n(plMined, 18))}
              decimals={10}
              duration={1}
            ></CountUp>
          </span>
          <span className="symbol">WETH</span>
        </div>
        <div className="amount" style={{ marginTop: "5px" }}>
          <span className="text">Balance:</span>
          <span className="value">{n(plBalance)}</span>
          <span className="symbol">{name}</span>
        </div>
        <input
          type="text"
          className="amountStake"
          value={plAmount}
          onChange={e => {
            setPlAmount(e.target.value);
          }}
          placeholder="Enter the amount of stake"
        />
        <div className="amount" style={{ marginTop: "3px" }}>
          <div className="text">Selected:</div>
          <div className="value">{plAmount}</div>
          <div className="symbol">{name}</div>
        </div>
        <PercentBtns>
          <div
            onClick={() => {
              SetPercent(25);
            }}
          >
            <span>25%</span>
          </div>
          <div
            onClick={() => {
              SetPercent(50);
            }}
          >
            <span>50%</span>
          </div>
          <div
            onClick={() => {
              SetPercent(75);
            }}
          >
            <span>75%</span>
          </div>
          <div
            onClick={() => {
              SetPercent(100);
            }}
          >
            <span>100%</span>
          </div>
        </PercentBtns>
        <TwoBtns>
          <div
            onClick={() => {
              plIsApproved ? Stake() : Approve();
            }}
          >
            <span className={account ? "" : "disable"}>
              {plIsApproved ? "Stake" : "Approve"}
            </span>
          </div>
        </TwoBtns>
        <StakeBtn onClick={GetReward} className={account ? "" : "disable"}>
          <div>
            <span
              onClick={GetReward}
              className={plLocked > 0 && account ? "" : "disable"}
            >
              Mine
          </span>
          </div>
        </StakeBtn>
      </Content>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  margin-bottom: 5vw;
  margin-left: 35vw;
  width: 615px;
  height: 250px;
  object-fit: contain;
  background-color: #000000;
  box-shadow: 0 0 20px 0 #29a7ff;
  border-radius: 8px;
  padding: 30px 0;
  
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
      margin-top: 25px;
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
      margin-bottom: 30px;
      font-family: Times New Roman;
      font-size: 12px;
      line-height: 1.25;
      color: #ffffff;
    }
  }

  .sub {
    flex-direction: column;
    width: 260px;
    margin: auto auto;
    font-family: Times New Roman;
    font-size: 12px;
    line-height: 1.25;
    color: #ffffff;
    .selected {
      display: flex;
      margin-left: auto;
      margin-right: 10px;
      width: 130px;
      .text {
        margin-left: 0;
      }
      .value {
        margin-left: auto;
      }
    }
    .amountStake {
      box-sizing: border-box;
      margin: auto auto;
      margin-top: 10px;
      margin-right: 25px;
      width: 220px;
      text-align: right;
      font-size: 15px;
      line-height: 1.25;
      color: #ffffff;
      object-fit: contain;
      padding: 5px 10px 5px 0;
      background-color: black;
      box-shadow: none;
      border: solid 0.3px #d8d8d8;
    }
  }
  .amount {
    display: flex;
    margin: 0 auto;
    font-size: 15px;
    font-family: Times New Roman;
    color: #ffffff;
    display: flex;
    width: 225px;
    .text {
      margin-left: 0;
    }
    .value {
      margin-left: auto;
      margin-right: 10px;
    }
    .symbol {
      width: 60px;
      margin-right: 0;
    }
  }
`;

const Content = styled.div`
  display: flex;
  width: 290px;
  margin: auto 0;
  margin-top: -65px;
  margin-left: 10px;
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
  // margin: auto 0;
  // margin-left: 50px;
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
  margin: auto auto;
  margin-top: 10px;
  padding-right: 10px;
  width: 225px;
  height: 20px;
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
  margin: auto;
  margin-top: 10px;
  padding-right: 10px;
  width: 225px;
  .disable {
    color: #535353;
  }
  div {
    display: flex;
    height: 25px;
    box-shadow: 0 0 5px 0 #ffffff;
    border: solid 1px #ffffff;
    span {
      margin: auto auto;
      font-family: Times New Roman;
      font-size: 15px;
      font-weight: bold;
      color: #ffffff;
    }
  }
`;
const StakeBtn = styled.div`
  margin: auto;
  margin-top: 10px;
  padding-right: 10px;
  width: 225px;
  .disable {
    color: #535353;
  }
  div {
    display: flex;
    height: 25px;
    box-shadow: 0 0 5px 0 #ffffff;
    border: solid 1px #ffffff;
    span {
      margin: auto auto;
      font-family: Times New Roman;
      font-size: 15px;
      font-weight: bold;
      color: #ffffff;
    }
  }
`;
export default Pool;

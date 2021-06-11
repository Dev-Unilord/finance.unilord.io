import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fromWei, toWei } from "web3-utils";
export const ERC20_ABI = require("./../../../lib/abis/ERC20ABI.json");
export const POOL_ABI = require("./../../../lib/abis/poolABI.json");

function StartInterval(callback, t) {
  callback();
  return setInterval(callback, t);
}
function n(x, pad = 2) {
  x = fromWei(String(x).split(".")[0], "ether").toString();
  let n = x.split(".");

  x =
    n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (n.length == 2 ? "." + n[1].substr(0, pad) : ".00");
  if (pad == 18) x = n[0] + (n.length == 2 ? "." + n[1].substr(0, pad) : ".00");
  return x;
}

console.log("~~~~~~~~~~~~~~~~~~~~~~~~");

function Swap({ web3, account, pools }) {
  /* Token List for Swapping */
  const tokenList = ["PEER", "LORD"];
  /* State Management */
  const [recipe, setRecipe] = useState({
    from: tokenList[0],
    to: tokenList[1],
    fromBalance: 0,
    toBalance: 0,
    ethBalance: 0
  });
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [plIsApproved, setPlIsApproved] = useState(false);
  const [FromInstance, setFromInstance] = useState(undefined);
  const [ToInstance, setToInstance] = useState(undefined);

  const SetPercent = x => {
    setFromAmount(
      ((n(recipe.fromBalance).replaceAll(",", "") / 100) * x).toString()
    );
    if (recipe.from == "PEER") {
      setToAmount(fromAmount / 100);
    } else if (recipe.from == "LORD") {
      setToAmount(fromAmount * 100);
    }
  };

  const approve = () => {
    if (!FromInstance || plIsApproved) return;
    FromInstance.methods
      .approve(pools[`${recipe.from}`], toWei("9999999999999999999", "ether"))
      .send({ from: account });
  };

  const Switch = () => {
    setRecipe({
      from: recipe.to,
      to: recipe.from,
      fromBalance: recipe.toBalance,
      toBalance: recipe.fromBalance,
      ethBalance: recipe.ethBalance
    });
    setFromInstance(ToInstance);
    setToInstance(FromInstance);

    setFromAmount(0);
    setToAmount(0);

    console.log(recipe);
  };

  const handleResultValue = value => {
    setFromAmount(
      value.toLocaleString(undefined, {
        minimumFractionDigits: 6,
        maximumFractionDigits: 12
      })
    );

    if (recipe.from == "PEER") {
      setToAmount(fromAmount / 100);
    } else if (recipe.from == "LORD") {
      setToAmount(fromAmount * 100);
    }
  };

  const swap = () => {
    const token = new web3.eth.Contract(POOL_ABI, pools[recipe.from]);

    token.methods
      .transfer(pools[recipe.from], toWei(recipe.fromAmount, "ether"))
      .send({ from: account });
  };

  const createTokenInstance = async () => {
    setFromInstance(
      await new web3.eth.Contract(ERC20_ABI, pools[`${recipe.from}`])
    );
    setToInstance(
      await new web3.eth.Contract(ERC20_ABI, pools[`${recipe.to}`])
    );
  };

  useEffect(() => {
    if (!web3) return;
    createTokenInstance();
  }, [pools]);

  useEffect(async () => {
    try {
      if (!ToInstance || !account) return;
      let toBalance = await ToInstance.methods.balanceOf(account).call();
      if (!FromInstance || !account) return;
      let fromBalance = await FromInstance.methods.balanceOf(account).call();
      let ethBalance = fromWei(await new web3.eth.getBalance(account), "ether");

      setRecipe({
        from: recipe.from,
        to: recipe.to,
        fromBalance: fromBalance,
        toBalance: toBalance,
        ethBalance: ethBalance
      });
      return;
    } catch {}
  }, [FromInstance, ToInstance]);

  // useEffect(async () => {
  //   if (!FromInstance || !account) return;
  //   const Interval = StartInterval(async () => {
  //     setPlIsApproved(
  //       (await FromInstance.methods
  //         .allowance(account, pools[`${recipe.from}`])
  //         .call()) > 0
  //         ? true
  //         : false
  //     );
  //   }, 3000);

  //   return () => {
  //     clearInterval(Interval);
  //   };
  // }, [FromInstance]);

  return (
    <Container className="Swap" id="Swap">
      <Title>
        <span>LORD Swap</span>
      </Title>

      <Box>
        <Content className="inputBox">
          <div className="fromBox">
            <div className="boxTitle">
              <div className="name">From</div>
              <div className="name">
                <img src={`./images/logo-${recipe.from.toLowerCase()}.png`} />
              </div>
              <div className="name">{recipe.from}</div>
            </div>

            <div className="amount" style={{ marginTop: "25px" }}>
              <span className="text">Balance:</span>
              <span className="value">{n(recipe.fromBalance)}</span>
              <span className="symbol"> {recipe.from}</span>
            </div>

            <input
              type="text"
              className="amountStake"
              value={fromAmount}
              onChange={e => {
                handleResultValue(e.target.value);
              }}
              placeholder="Enter the amount"
            />

            <div className="selected" style={{ marginTop: "3px" }}>
              <span className="text">Selected:</span>
              <span className="value">{fromAmount}</span>
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
          </div>

          <div className="arrowBox" onClick={Switch}>
            <img src="./images/Btn_switch@3x.png" className="img_arrow" />
          </div>

          <div className="toBox">
            <div className="boxTitle">
              <div className="name">To</div>
              <div className="name">
                <img src={`./images/logo-${recipe.to.toLowerCase()}.png`} />
              </div>
              <div className="name">{recipe.to}</div>
            </div>

            <div className="amount" style={{ marginTop: "25px" }}>
              <span className="text">Balance:</span>
              <span className="value">{n(recipe.toBalance)}</span>
              <span className="symbol"> {recipe.to}</span>
            </div>

            <div className="input">
              <div className="input2">{toAmount}</div>
            </div>

            <TwoBtns>
              <div
                onClick={() => {
                  plIsApproved
                    ? fromAmount > 0
                      ? swap()
                      : alert("Please enter the amount")
                    : approve();
                }}
              >
                <span>{plIsApproved ? "Swap" : "Approve"}</span>
              </div>
            </TwoBtns>
          </div>
        </Content>

        <Line />

        <Content>
          <div className="BalanceBox">
            <div className="item1">Balance:</div>
            <div className="item2">
              <div>
                {recipe.to == "LORD" ? recipe.toBalance : recipe.fromBalance}
              </div>
              <div>
                {recipe.from == "PEER" ? recipe.fromBalance : recipe.toBalance}
              </div>
              <div>{recipe.ethBalance}</div>
            </div>
            <div className="item3">
              <div>LORD</div>
              <div>PEER</div>
              <div>ETH</div>
            </div>
          </div>
        </Content>
      </Box>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  width: 100vw;
  min-width: 1280px;
  // height: 800px;
  min-height: 480px;
  margin-bottom: 100px;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  margin-top: 20vh;
  margin-bottom: 80px;
  margin-left: calc(30vw + 100px);
  span {
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

const Box = styled.div`
  display: column;
  margin-left: 35vw;
  width: 610px;
  object-fit: contain;
  background-color: #000000;
  box-shadow: 0 0 20px 0 #ffffff;
  border-radius: 8px;
  padding: 30px 0;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  margin: auto 0;

  .fromBox {
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
      font-family: Times New Roman;
    }

    .selected {
      font-family: Times New Roman;
      font-weight: bold;
      line-height: 1.18;
      text-align: right;
      color: #ffffff;
    }
    span {
      font-size: 12px;
    }
  }

  .boxTitle {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-family: Times New Roman;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.18;
    text-align: right;
    color: #ffffff;

    .name {
      font-family: Times New Roman;
      font-size: 20px;
      font-weight: bold;
      font-style: italic;
      line-height: 1.18;
      text-align: center;
      color: #ffffff;
      img {
        height: 70px;
      }
    }
  }

  .amount {
    font-family: Times New Roman;
    font-weight: bold;
    line-height: 1.18;
    text-align: right;
    color: #ffffff;
    span {
      font-size: 12px;
    }
  }

  .input {
    display: flex;
    margin-top: 10px;
    height: 30px;
    text-align: right;
    font-size: 13px;
    line-height: 1.25;
    color: #ffffff;
    object-fit: contain;
    padding: 0 10px 0 0;
    background-color: black;
    box-shadow: none;
    border: solid 0.3px #d8d8d8;
    font-family: Times New Roman;

    .input2 {
      margin: auto auto;
      margin-right: 0;
    }
  }

  .img_arrow {
    margin-top: 70px;
    height: 60px;
  }

  .BalanceBox {
    display: flex;
    margin: auto auto;
    margin-right: 0;
    color: #ffffff;
    font-family: Times New Roman;
    font-size: 12px;
    line-height: 1.18;
    font-weight: bold;

    .item1 {
      margin-right: 2vw;
    }

    .item2 {
      text-align: right;
    }

    .item3 {
      margin: 0 3vw 0 1vw;
    }
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
  .disable {
    color: #535353;
  }
  div {
    display: flex;
    width: 208px;
    height: 22px;
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

const Line = styled.div`
  margin: 30px auto;
  width: 95%;
  height: 2px;
  background-color: #ffffff;
`;

export default Swap;

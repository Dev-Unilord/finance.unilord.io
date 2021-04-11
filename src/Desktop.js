import Gnb from "./component/Desktop/gnb";
import Pools from "./component/Desktop/pools";
import Modal from "./component/Desktop/modal";
import React, { useState, useEffect } from "react";

function Desktop() {
  const [display, setDisplay] = useState(false);
  const [type, setType] = useState("pool");
  const [choosen, choise] = useState("Pools");

  const position = ["Pools"];

  useEffect(() => {
    window.addEventListener("scroll", () => onScroll());

    return () => {
      window.removeEventListener("scroll", onscroll);
    };
  }, []);

  const onScroll = e => {
    choise(position[(window.scrollY / window.innerHeight).toFixed()]);
  };

  return (
    <div className="Desktop">
      <Gnb choosen={choosen} choise={choise} />
      <Pools />
      <Modal type={type} display={display} setDisplay={setDisplay} />
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

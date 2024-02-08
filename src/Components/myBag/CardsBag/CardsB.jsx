import React from "react";
import { useSelector } from "react-redux";
import {Card} from "../../Cards/Card/Card"



import "./CardsB.css";

export const CardsBag = ({ products }) => {
  let { favProd } = useSelector((state) => state.alldata);
  const valores = favProd.map((e) => parseInt(e.attributes.price, 10));
  let total = valores.reduce((a, b) => a + b, 0);

  return (
    <div className="cartaB">
      <div className="montoTotal">
      <svg
          width="59"
          height="2"
          viewBox="0 0 59 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M59 0.999995L0 1" stroke="#E88A23" />
        </svg><span className="aPagar" autofocus>Total :${total} </span>   <svg
          width="59"
          height="2"
          viewBox="0 0 59 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M59 0.999995L0 1" stroke="#E88A23" />
        </svg>
      </div>
      <div className="rowsCardBag">
        {products?.map((e) => (
          <Card producto={e} />
        ))}
      </div>
    </div>
  );
};



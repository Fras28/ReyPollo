import React from "react";
import { Card } from "./Card/Card";

import "./Cards.css";
import { CardEdite } from "./Card/CardEdit";

export const CardsEdite = ({ products }) => {
  // console.log(products[0]?.attributes, "que llega a la card");
  return (
    <div className="cartaEdit" >
      <div className="rowsCardEdit">
        {products?.map((e) => (
          <CardEdite producto={e} />
        ))}
      </div>
    </div>
  );
};

// {products?.map((e)=><Card  nombre={e.name} detalle={e.detail} precio={e.price}/> )}

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { asyncCancelFav, asyncfavProducts } from "../../redux/slice";
import "./Card.css";
import ModalGen from "../../Modal/ModalConfirmacion/Modal";
import EditProduct from "../../Comander/formVenta/formEditProd";

export const CardEdite = ({ producto }) => {

  const dispatch = useDispatch();
  const [articles, setArticles] = useState({
    name: [],
    price: [],
  });
  const product = producto.attributes;

  const editLogo = (
    <svg
      width="30"
      viewBox="0 0 748 748"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M654.213 374.154V654.212C654.213 688.406 626.245 716.372 592.054 716.372L94.1591 716.434C59.9654 716.434 32 688.466 32 654.275L32.0625 156.38C32.0625 122.186 60.031 94.2207 94.2216 94.2207H374.28"
        stroke="black"
        stroke-width="62.2213"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M187.553 560.88L333.87 531.605C339.906 530.391 345.443 527.438 349.797 523.079L716.436 156.44C708.905 91.076 657.36 39.5257 591.996 32L225.357 398.639C221.003 402.993 218.045 408.535 216.831 414.566L187.553 560.88Z"
        stroke="black"
        stroke-width="62.2213"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  return (
    <div className="contCardEdit">
    <div className="cardContentEdit">
      <p className="nameProdEdit">{product.name}</p>
      <p className="priceEdit">${product.price}</p>
    </div>
    <div className="divBtnProd">
      <ModalGen
        txtBtn={editLogo}
        Child={<EditProduct product={product} id={producto.id} />}
      />
    </div>
  </div>
  );
};

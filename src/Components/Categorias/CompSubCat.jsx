import React, { useEffect } from "react";
import { Cards } from "../Cards/Cards.jsx";
import "./Categorias.css";
import Nav from "../Nav/Nav.jsx";
import { useDispatch, useSelector } from "react-redux";

import { VerPedido } from "../BtnBag/BtnBag.jsx";

import Spinner from "../assets/Spinner/Spinner.jsx";
import Logo from "../assets/Logo.png";
import { useParams } from "react-router-dom/cjs/react-router-dom.min.js";

const API = process.env.REACT_APP_API_STRAPI;

export const CompSubCat =  ({ idCat }) => {

  const { id } = useParams(); // Usa el hook useParams para obtener el parámetro de la URL



  const dispatch = useDispatch();
  const { allProduct } = useSelector((state) => state.alldata);



  const Productos = allProduct?.filter(
    (e) => e.attributes?.categorias?.data.id === idCat
  );

  const subCategoriaFilters = Productos?.reduce((acc, product) => {
    const subCategoriaId = product.attributes?.sub_categoria?.data?.id;

    if (subCategoriaId) {
      if (!acc[subCategoriaId]) {
        acc[subCategoriaId] = [];
      }
      acc[subCategoriaId].push(product);
    }

    return acc;
  }, []);

  // Puedes acceder a cada Xn dinámicamente
  const dynamicVariables = Object.keys(subCategoriaFilters).map((key) => {
    return subCategoriaFilters[key];
  });

  const subCategoriasTrue = subCategoriaFilters.filter((e) => e[0]);

  return (
    <div className="containerL">
      <Nav id={id} />
      <div className="sectioner">
        {subCategoriasTrue.length < 1 ? (
          <div className="sectioner">
            {subCategoriasTrue.map((product, index) =>
              product[0] ? (
                <a
                  key={index}
                  href={`#${product[0].attributes.sub_categoria.data.id}`}
                >
                  {product[0]?.attributes.sub_categoria.data.attributes.name}
                </a>
              ) : null
            )}
          </div>
        ) : null}
      </div>
      <div className="conteinerLC ">
        <div className="conteinerLB2 animate__animated  animate__zoomIn animate__faster">
          {subCategoriasTrue?.map((product) =>
            product[0] ? (
              <div
                id={product[0]?.attributes?.sub_categoria?.data?.id}
                key={product[0]?.attributes?.sub_categoria?.data?.id}
                style={{ paddingTop: "6rem" }}
              >
                {product[0]?.attributes?.sub_categoria?.data?.attributes
                  ?.picture?.data?.attributes?.url ? (
                  <img
                    src={
                      `${API}${product[0]?.attributes?.sub_categoria?.data?.attributes?.picture?.data?.attributes?.url}` ||
                      Logo
                    }
                    alt={
                      "img - " +
                      product[0]?.attributes?.sub_categoria?.data?.attributes
                        ?.name
                    }
                    id={product[0]?.attributes?.sub_categoria?.data?.id}
                    className="ImgSubCat"
                  />
                ) : null}
                <Cards products={product} />
              </div>
            ) : null
          )}
        </div>
        {allProduct.length === 0 ? <Spinner imageUrl={Logo} /> : null}
      </div>
      <VerPedido id={id} />
    </div>
  );
};

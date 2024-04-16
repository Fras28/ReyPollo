import React, { useEffect } from "react";
import { Cards } from "../Cards/Cards.jsx";
import "./Categorias.css";
import Nav from "../Nav/Nav.jsx";
import { useDispatch, useSelector } from "react-redux";

import { VerPedido } from "../BtnBag/BtnBag.jsx";

import Spinner from "../assets/Spinner/Spinner.jsx";
import Logo from "../assets/Logo.png";
import { useParams } from "react-router-dom/cjs/react-router-dom.min.js";
import { asyncSubCategoria } from "../redux/slice.jsx";

const API = process.env.REACT_APP_API_STRAPI;

export const CompSubCat =  ({ idCat }) => {

  const { id } = useParams(); // Usa el hook useParams para obtener el parámetro de la URL

console.log(idCat, "id de la categoria en la que estamos ");

  const dispatch = useDispatch();
  const { allProduct,subCategorias } = useSelector((state) => state.alldata);

  useEffect(() => {
    // Función que se ejecutará cuando el componente se monte o cuando id cambie
    dispatch(asyncSubCategoria(idCat));
  }, [dispatch, id]); // Dependencias: dispatch y id


  const articulosParaFiltrar = subCategorias.filter(e => e.id === idCat);
  const articulos = articulosParaFiltrar.length > 0 ? articulosParaFiltrar[0].attributes.sub_categorias.data : [];
  
  console.log(articulos, "en busca de solo las subs para mapear");
  

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
      <Nav id={id}/>
      <div className="sectioner">
        {articulos?.length > 1 ? (
          <div className="sectioner">
            {articulos?.map((product, index) =>
              product ? (
                <a
                  key={index}
                  href={`#${product.id}`}
                >
                  {">>"} {product?.attributes.name} 
                </a>
              ) : null
            )}
          </div>
        ) : null}
      </div>
      <div className="conteinerLC ">
        <div className="conteinerLB2 animate__animated  animate__zoomIn animate__faster">
          {articulos?.map((product) =>
            product[0] ? (
              <div
                id={product.id}
                key={product.id}
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
        {/* {allProduct.length === 0 ? <Spinner imageUrl={Logo} /> : null} */}
      </div>
      <VerPedido id={id} />
    </div>
  );
};

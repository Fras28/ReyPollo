import React, { useEffect } from "react";
import { Cards } from "../Cards/Cards.jsx";
import "./Cafeteria.css";
import { Nav } from "../Nav/Nav.jsx";
import { useDispatch, useSelector } from "react-redux";
import { asyncAllProducts } from "../redux/slice.jsx";
import { VerPedido } from "../BtnBag/BtnBag.jsx";
import oreo from "../assets/oreo.jpg"
import publi from "../assets/cafPast.jpg";
import Spinner from "../assets/Spinner/Spinner.jsx";
import Logo from "../assets/LogoCoqui.png"

export const Cafeteria = (id) => {
  const mesa = id.match.url.slice(1, 3);
  console.log(id.match.url.slice(1, 3), "buscando ideeee");

  let dispatch = useDispatch();

  let { allProduct } = useSelector((state) => state.alldata);

  useEffect(() => {
    // Función para realizar la acción deseada
    const fetchData = () => {
      console.log("Effect is running");
      dispatch(asyncAllProducts());
    };

    // Ejecutar la función inmediatamente al montar el componente
    fetchData();

    // Configurar la repetición cada 15 minutos
    const intervalId = setInterval(fetchData, 15 * 60 * 1000); // 15 minutos en milisegundos

    // Limpiar el intervalo al desmontar el componente para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const soloEsteComercio = allProduct.filter(
    (e) => e.attributes.comercio.data.id === 3
  );

  const CafeteriaProducts = soloEsteComercio?.filter(
    (e) => e.attributes?.categorias?.data.id === 4
  );

  console.log(CafeteriaProducts
  , " todos los productos de coqui cakes");

  const X1 = CafeteriaProducts?.filter(
    (e) => e.attributes?.sub_categoria?.data?.id === 9
  );
  const X2 = CafeteriaProducts?.filter(
    (e) => e.attributes?.sub_categoria?.data?.id === 10
  );
  const X3 = CafeteriaProducts?.filter(
    (e) => e.attributes?.sub_categoria?.data?.id === 11
  );
  const X4 = CafeteriaProducts?.filter(
    (e) => e.attributes?.sub_categoria?.data?.id === 12
  );
  const X5 = CafeteriaProducts?.filter(
    (e) => e.attributes?.sub_categoria?.data?.id === 13
  );
  const X6 = CafeteriaProducts?.filter(
    (e) => e.attributes?.sub_categoria?.data?.id === 14
  );
  const X7 = CafeteriaProducts?.filter(
    (e) => e.attributes?.sub_categoria?.data?.id === 15
  );
  // console.log(X3, " delicatesens");
  console.log(
    X7[0]?.attributes.sub_categoria.data.attributes.name,
    "EN BUSCA DEL TITULO DE LA SUB CAT"
  );
  return (
    <div className="containerL">
      <Nav id={mesa} />
      <div className="sectioner">
  {[X7, X6, X5, X4, X3, X2, X1].map((product, index) => (
    product[0] ? (
      <a key={index} href={`#${product[0].attributes.sub_categoria.data.id}`} >
        {product[0]?.attributes.sub_categoria.data.attributes.name}
        {console.log(product[0].attributes.sub_categoria.data.id, 'espero que apareza el numero de id')}
      </a>
    ) : null
  ))}
</div>
      <div className="conteinerLC ">
        <div className="conteinerLB2 animate__animated  animate__zoomIn animate__faster">
          {X1[0] ? (
            <>
              <img src="https://i0.wp.com/adrianacotte.com/wp-content/uploads/2019/07/BLOG_00-1.jpg?fit=750%2C600&ssl=1" alt="promo" id="9"/>
              <Cards products={X1} />
            </>
          ) : null}

          {X2[0] ? (
            <>
              <img
                src="https://i.pinimg.com/originals/b5/57/59/b5575945f530d0f9b7d4ee4d470b63c6.jpg"
                alt="promo"
                id="10"
              />
              <Cards products={X2} />
            </>
          ) : null}
          {X3 ? (
            <>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4YRaEgOy_STk3Kykcd2wQl20kd_6rb0zsk2Qx64BceqS-CNK_8B0yBIJecBIFndtYcWY&usqp=CAU"
                alt="promo"
                id="11"
              />
              <Cards products={X3} />
            </>
          ) : null}
          {X4[0] ? (
            <>
              {" "}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-TipnrNFLzeSVvyG2DcXvmn6PhuPB-jK4-g&usqp=CAU"
                alt="promo"
                id="12"
              />
              <Cards products={X4} />
            </>
          ) : null}

          {X5[0] ? (
            <>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-TipnrNFLzeSVvyG2DcXvmn6PhuPB-jK4-g&usqp=CAU"
                alt="promo"
                id="13"
              />
              <Cards products={X5} />
            </>
          ) : null}

          {X6[0] ? (
            <>
              {" "}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-TipnrNFLzeSVvyG2DcXvmn6PhuPB-jK4-g&usqp=CAU"
                alt="promo"
                id="14"
              />
              <Cards products={X6} /> aaa
            </>
          ) : null}
          {X7[0] ? (
            <>
              <img
                src="https://acdn.mitiendanube.com/stores/413/750/products/20200911_1414281-907801586675d4fd5c15998448698354-640-0.jpg"
                alt="promo"
                id="15"
              />
              <Cards products={X7} />
            </>
          ) : null}
        </div>
       {soloEsteComercio.length === 0? <Spinner imageUrl={Logo}/>:null} 
      </div>
      <VerPedido id={mesa} />
    </div>
  );
};

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardsEdite } from "../Cards/CardsEdit.jsx";

export const Editer = () => {
  const dispatch = useDispatch();
  const { allProduct } = useSelector((state) => state.alldata);


  // Estado para el valor de búsqueda
  const [searchValue, setSearchValue] = useState("");

  // Función para manejar cambios en el input de búsqueda
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };



  return (
    <div className="containerEdit">
      <div>
        <label htmlFor="">Buscar</label>
        <input
          type="search"
          name=""
          id=""
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Buscar producto..."
          className="searchBar"
        />
        <h2>Edicion de productos</h2>
        <CardsEdite products={allProduct} />
      </div>
    </div>
  );
};

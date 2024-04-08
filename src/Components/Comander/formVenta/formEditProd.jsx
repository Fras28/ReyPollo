import React, { useState } from 'react';
import "./formVenta.css";
import { useDispatch, useSelector } from 'react-redux';
import { asyncEditProd } from '../../redux/slice';

const EditProduct = ({ product, id }) => {
  const dispatch = useDispatch();
  const {categorias, subCategorias} = useSelector((state) => state.alldata);
  const [formData, setFormData] = useState({
    data: {
      id: id,
      attributes: {
        name: product?.name,
        price: product?.price,
        price2: product?.price2,
        price3: product?.price3,
        detail: product?.detail,
        sub_categoria: product?.sub_categoria,
        categoria: product?.categorias,
        comercio: product?.comercio,
      }
    }
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        attributes: {
          ...formData.data.attributes,
          [name]: value
        }
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datos del formulario:', formData, id);
    dispatch(asyncEditProd(formData))
  };
console.log(subCategorias,"sub categorias");
  return (
    <form onSubmit={handleSubmit} className='Formix2'>
      <h2>Editar Producto</h2>
      <div className="form-group">
        <label htmlFor="name">Nombre del Producto:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleInputChange}
          value={formData.data.attributes.name} 
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="categoria">Categoria:</label>
        <select
          id="categoria"
          name="categoria"
          onChange={handleInputChange}
          value={formData.data.attributes.categoria} 
          required
        >
          {categorias?.map(cat => <option key={cat.id}>{cat.attributes.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="sub_categoria">Sub Categoria:</label>
        <select
          id="sub_categoria"
          name="sub_categoria"
          onChange={handleInputChange}
          value={formData.data.attributes.sub_categoria} 
          required
        >
          {subCategorias?.map(cat => <option key={cat.id}>{cat.attributes.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.data.attributes.price} 
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Precio 2:</label>
        <input
          type="number"
          id="price"
          name="price2"
          value={formData.data?.attributes?.price2} 
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Precio 3:</label>
        <input
          type="number"
          id="price"
          name="price3"
          value={formData.data?.attributes?.price3} 
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="detail">Detalle:</label>
        <input
          type="text"
          id="detail"
          name="detail"
          value={formData.data.attributes.detail} 
          onChange={handleInputChange}
          required
        />
      </div>
      
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default EditProduct;

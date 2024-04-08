import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import Logo from "../../assets/LogMorton.png"
import './LoginComponent.css'; // Importa tu archivo de estilos CSS
import { asyncLogIn } from '../../redux/slice';

const LoginComponent = ({ onLoginSuccess }) => {
  const dispatch = useDispatch();
  const { comandas, usuarioComander } = useSelector((state) => state.alldata);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar la contraseña

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Evitar el envío automático del formulario
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      // Activar el estado de carga
      setIsLoading(true);
  
      // Realizar el inicio de sesión
      await dispatch(asyncLogIn(credentials));
  
      // Si la acción asyncLogIn se resuelve correctamente y usuarioComander está definido, cerrar la modal
      if (usuarioComander) {
        setModalIsOpen(false);
      } 
  
      // Ejecutar la función onLoginSuccess si es necesario
      onLoginSuccess();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Puedes manejar el error si es necesario
    }
     finally {
      // Desactivar el estado de carga independientemente de si la petición se realizó con éxito o no
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

const Show = <svg width="30"  viewBox="0 0 762 447" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 224C0 224 336 -280 762 224C762 224 418 724 0 224ZM381 132C426 132 463 173 463 223C463 274 426 315 381 315C336 315 300 274 300 223C300 209 303 195 308 182L381 223L334 149C347 138 364 132 381 132ZM381 63C477 63 555 135 555 223C555 312 477 384 381 384C285 384 207 312 207 223C207 135 285 63 381 63ZM381 87C463 87 529 148 529 223C529 299 463 360 381 360C300 360 233 299 233 223C233 148 300 87 381 87ZM69 224C69 224 344 -189 694 224C694 224 412 634 69 224Z" fill="black"/>
</svg>

const donTShow = <svg width="30"  viewBox="0 0 847 847" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M42 404C42 404 252 88.9995 550 206L520 238C350 177 216 284 152 353V449C186 484 218 510 250 531L220 563C163 528 103 477 42 404ZM706 122V123C719 135 720 155 708 168L197 722C185 735 164 736 151 724C138 712 137 692 150 679L661 124C673 111 693 110 706 122ZM656 264C704 298 753 344 804 404C804 404 609 688 333 614L365 579C516 612 636 515 695 452V359C671 335 648 314 625 297L656 264ZM423 295C437 295 450 297 461 301L325 449C319 435 315 419 315 403C315 343 364 295 423 295ZM532 399C532 400 532 401 532 403C532 461 486 509 428 511L532 399Z" fill="black"/>
</svg>




  return (
    <div className='bgModal' >
      <Modal
        isOpen={modalIsOpen && (comandas.length === 0 || !usuarioComander)}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Login Modal"
      >
        <div className="login-container">
          <div className='leftLogin'>
            <h2 className="login-heading">Log In</h2>
            <form className='formLogIn'>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:      <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="toggle-password"
                >
             {showPassword ? donTShow : Show}

                </button></label>
          
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="form-input"
                />
              </div>
              <button type="button" onClick={handleLogin} className="login-submit">
                Log in
              </button>
            </form>
          </div>
          <div className='rightLogin'>
            <img src={Logo} width="100%" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginComponent;

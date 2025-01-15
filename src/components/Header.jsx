import { useContext, useEffect, useState } from "react";
import { Link,} from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";


function Header() {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    useEffect(() => {
      // Obtener el usuario del localStorage
      if (isLoggedIn) {
        // Obtener el usuario desde localStorage si está logueado
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
      } else {
        // Si no está logueado, limpiar el estado de user
        setUser(null);
      }
    }, [isLoggedIn]);
  
    return (
      <nav className="bg-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Enlace a la izquierda, usa flex-grow para ocupar todo el espacio disponible */}
          <Link to="/" className="text-2xl font-bold text-gray-800 flex-grow">
            CRUD SAMUEL CANO
          </Link>
  
          {/* Botón de menú móvil */}
          <button
            className="lg:hidden text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="text-xl">☰</span> {/* Icono de menú */}
          </button>
  
          {/* Lista de navegación */}
          <ul
            className={`lg:flex space-x-6 items-center text-gray-800 ${isMenuOpen ? 'flex-col absolute top-full right-0 mt-2 bg-white shadow-lg w-full z-10' : 'hidden'} lg:block lg:flex-row lg:space-x-6`}
          >
            {isLoggedIn ? (
              <>
                {user && (
                  <li className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={user.avatar || "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-semibold">{user.email}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="text-red-500 hover:text-red-600"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                )}
              </>
            ) : (
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-500 transition duration-300"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }

  export default Header;
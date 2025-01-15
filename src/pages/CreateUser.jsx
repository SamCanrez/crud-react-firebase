import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/services/users/usersApi";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress"; 

export default function CreateUser() {
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [isLoading, setIsLoading] = useState(false); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);  // Aquí se llama correctamente a setIsLoading
      dispatch(createUser(formData))
        .unwrap()
        .then(() => {
          setIsLoading(false);  // Se desactiva el loading una vez completada la operación
          navigate("/");
        })
        .catch((error) => {
          setIsLoading(false);  // En caso de error también desactivamos el loading
          alert(error);
        });
    };
  
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Crear Usuario</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
              disabled={isLoading}  // Deshabilita el botón mientras se carga
            >
              {isLoading ? (
                <CircularProgress size={24} className="text-white" />
              ) : (
                "Crear"
              )}
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }
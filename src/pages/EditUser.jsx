import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, fetchUsers } from "../redux/services/users/usersApi";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress"; 

export default function EditUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, isLoading } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (!users.length) {
      dispatch(fetchUsers());
    } else {
      const user = users.find((user) => user.id === parseInt(id));
      if (user) setFormData({ name: user.name, email: user.email });
    }
  }, [dispatch, id, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: parseInt(id), userData: formData }))
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => alert(error));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Editar Usuario</h1>
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
            >{isLoading ? (
                <CircularProgress size={24} className="text-white" />  
              ) : (
                "Actualizar"
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

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../redux/services/users/usersApi";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { getDoc, doc } from "firebase/firestore"; 
import { db } from '../firebase'


export default function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [currentRole, setCurrentRole] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());

    const getUserRole = async () => {
      try {
        const userData = await JSON.parse(localStorage.getItem("user"));

        if (userData && userData.uid) {
          const userRef = doc(db, 'user', userData.uid); 
          const userDoc = await getDoc(userRef); 
        
          if (userDoc.exists()) {
            const role = userDoc.data().role; 
            setCurrentRole(role); 
          } else {
            console.log("El usuario no existe");
            setCurrentRole(null); 
          }
        }
      } catch (error) {
        console.error("Error al obtener el rol:", error);
        setCurrentRole(null); 
      }
    };

    getUserRole();
  }, [dispatch]);

  const openModal = (id) => {
    setUserToDelete(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setUserToDelete(null);
    setShowModal(false);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete));
      closeModal();
      setCurrentPage(1); 
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); 
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h2 className="text-2xl font-semibold text-blue-800 mb-6 p-2">{currentRole}</h2>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Usuarios</h1>
      

      <input
        type="text"
        placeholder="Buscar por nombre o correo..."
        value={search}
        onChange={handleSearchChange}
        className="px-4 py-2 border rounded-md mb-6 w-full max-w-md"
      />

      {currentRole === "user" && (
      <Link
        to="/create"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 mb-6"
      >
        Crear Usuario
      </Link>
      )}

      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <ul className="space-y-4">
          {currentUsers.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 rounded-md"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                <p className="text-sm text-gray-600 truncate">{user.email}</p>
              </div>
              <div className="flex space-x-4">
                {currentRole === "user" && (
                  <>
                    <Link
                      to={`/edit/${user.id}`}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FaEdit size={20} />
                    </Link>
                    <button
                      onClick={() => openModal(user.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
          {currentUsers.length === 0 && (
            <li className="text-gray-500 text-center">No se encontraron usuarios</li>
          )}
        </ul>
      </div>

      {filteredUsers.length > usersPerPage && (
        <div className="mt-4">
          <nav className="flex justify-center space-x-4">
            {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </nav>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirmación</h2>
            <p className="text-gray-600 mb-6">¿Estás seguro de que deseas eliminar este usuario?</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 mr-2"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                onClick={confirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggedIn } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const token = await response.user.getIdToken();
      localStorage.setItem("jwt", token);
      login(response);
      toast.success("¡Bienvenido!.");
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/users" />;
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100">
      <div className="w-full sm:w-full h-screen sm:h-auto max-w-md bg-white p-8 rounded-lg shadow-md md:mt-[calc(15vh)]">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Inicia sesión para continuar</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">Correo o contraseña incorrectos</p>}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-blue-500">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;


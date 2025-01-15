
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider,} from "./contexts/AuthContext";
import UserList from "./pages/UserList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import RouteGuard from "./contexts/RouteGuard";
import Header from "./components/Header";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/users"
              element={
                <RouteGuard>
                  <UserList />
                </RouteGuard>
              }
            />
             <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateUser />} />
            <Route path="/edit/:id" element={<EditUser />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import "./App.css";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Expense from "./components/Expense/Expense";
import UserEdit from "./components/User/UserEdit/UserEdit";
import ForgotPass from "./components/Auth/ForgotPass/ForgotPass";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/expense" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/expense",
    element: (
      <RequireAuth redirectTo="/login">
        <Expense />
      </RequireAuth>
    ),
  },
  {
    path: "/user/edit/:userId",
    element: (
      <RequireAuth redirectTo="/login">
        <UserEdit />
      </RequireAuth>
    ),
  },
  {
    path: "/forgotpassword",
    element: <ForgotPass />,
  },
  {
    path: "*",
    element: <p>404 Page Not Found</p>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

function RequireAuth(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? props.children : <Navigate to={props.redirectTo} />;
}

export default App;

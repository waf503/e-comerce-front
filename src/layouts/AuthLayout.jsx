import useAuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";

const AuthLayout = () => {
    const { user } = useAuthContext()
    return user ? <> <Header></Header>  <Outlet /> </> : <Navigate to="/login"/>;
};

export default AuthLayout;
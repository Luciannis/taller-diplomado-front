import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import './Navigationbar.css';
import { AuthContext } from "./AuthContext";
const NavigationBar = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return(

        <div className="navbar-container">
            <div className="navbar-sections">
                {isLoggedIn ? (
                    <>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/profile"}>Perfil</Link>
                        <Link to={"/transactions"}>Transacciones</Link>
                        
                    </>
                ) : (
                    <Link to={"/login"}>Login</Link>
                )}
            </div>
        </div>
    )
}
export default NavigationBar
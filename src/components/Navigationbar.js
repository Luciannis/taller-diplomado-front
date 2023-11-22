import { Link } from "react-router-dom";
import './Navigationbar.css';
const NavigationBar = () => {
    return(
        <div className="navbar-container">
            <div className="navbar-sections">
                <Link to={"/"} > Home</Link>
                <Link to={"/profile"} > Perfil</Link>
                <Link to={"/login"} > Login</Link>
                <Link to={"/transactions"} > Transacciones</Link>
            </div>
        </div>
    )
}
export default NavigationBar
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'
import axios from 'axios';
import { AuthContext } from './AuthContext';
const Login = () => {
    const URL = "http://localhost:8000";
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { setIsLoggedIn } = useContext(AuthContext);
    
    const onLogin = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`${URL}/login`,{username: username, password})
        localStorage.setItem('token', data.token)

        if(data){
          setIsLoggedIn(true);
          navigate("/profile");
        }

      } catch (error) {
        console.log("Error al inciar sesión",error);
      }

      }

    return (
        <div className='container mt-5'>
          <div className='row justify-content-center' >
            <div className='col-md-6' style={{'border':'2px solid black'}}>
              <h2>Login</h2>
              <form >
                <div className="mb-3">
                  <label className='form-label'>
                    Usuario:
                  <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                  </label>
                </div>
                <div className="mb-3">
                  <label className='form-label'>
                    Contraseña:
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                  </label>
                </div>
                <button type="submit" className='btn btn-primary' onClick={onLogin}>Login</button>
              </form>
            </div>
          </div>
        </div>
    );
}
export default Login;


import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const Profile = () => {
    const URL = "http://localhost:8000";
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate()
    const cerrarSesion = () => {
      console.log("entrooo");
      localStorage.removeItem('token')
      navigate("/login")
    }

    useEffect(() => {
        async function getProfile(){
          const token = localStorage.getItem('token')
          if(token){
            const { data } = await axios.get(`${URL}/profile`, {
            headers: {'Authorization': `Bearer ${token}`}
            })
            // Acá hacen el setUsername... etc para mostrar la información real del back
            setUsername(data.username);
            setEmail(data.email);
            setPhone(data.phone);
          }
        }
          getProfile()
    }, [])

return (
<>
<div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Perfil</h2>
              <div className="mb-3">
                <label className="form-label">Correo: {email}</label>
 
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre de usuario: {username}</label>
              </div>
              <div className="mb-3">
                <label className="form-label">Telefono: {phone}</label>

              </div>
              <div className="text-center">
                <button className="btn btn-danger" onClick={cerrarSesion}> Cerrar sesión</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</>
);
}
export default Profile;
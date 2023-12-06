import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useEffect,useState,useContext } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const URL = "http://localhost:8000";
  const [precios, setPrecios] = useState("")
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const getPrecios = async() => {
    try {
      const {data} = await axios.get(`${URL}/chart`)
      if(data){
        const precios = data.prices.map((elem) => ({fecha: elem[0],precio: elem[1]}));
        setPrecios(precios)
        setLoading(false)
      }
    } catch (error) {
      console.log("Error al obtener los precios", error);
    }
  }
  const formatearFecha = (valor) => {
      const fecha = new Date(valor)
      return fecha.toLocaleDateString();
  }
  const formaterPrecio = (value) => {
    const formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    });
    return formatter.format(value);
  };
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirige al componente Login si el usuario no está autenticado
    }
    getPrecios()
  },[isLoggedIn, navigate]);

    return (
      <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div style={{ width: '100%', maxWidth: '700px' }}>
          <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            width={500}
            height={400}
            data={precios}
            margin={{
              top: 50,
              right: 30,
              left: 100,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" tickFormatter={formatearFecha} />
            <YAxis tickFormatter={formaterPrecio}  />
            <Tooltip />
            <Area type="monotone" dataKey="precio"  stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
      

    );
}
export default Home;




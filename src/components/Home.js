import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts';
import data from '../preciosEjemplo.json'

const precios = data.prices.map((elem) => ({fecha: elem[0],precio: elem[1]}));

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
  
const Home = () => {
    return (
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
    );
}
export default Home;




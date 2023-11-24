import { useEffect,useState } from "react";
import axios from 'axios';

const Transactions = () => {
    const URL = "http://localhost:8000";
    const [valorCLP, setValorCLP] = useState("")
    const [valorBitcoin, setValorBitcoin] = useState("")
    const [saldoTotal, setsaldoTotal] = useState("")
    const [userCLP, setUserCLP] = useState("")
    const [userBitcoin, setUserBitcoin] = useState("")
    const getPrecios = async() => {
        try {
          const {data} = await axios.get(`${URL}/price`)
            console.log("data");
            console.log(data.bitcoin.clp);
            if(data){
                setValorCLP(data.bitcoin.clp)
            }
        } catch (error) {
          console.log("Error al obtener los precios", error);
        }
      }
      const calcularSaldoTotal = ()=>  {
        saldoTotal = (userBitcoin*valorBitcoin) + (userCLP)
        setsaldoTotal(saldoTotal);
      }
      useEffect(() => {
        getPrecios()
      },[])

    const labelStyle = {
        textAlign : 'left'
    }
    return (
        <div className="container mt-5">
        <div className="row justify-content-left">
            <div className="col-md-6">
            <div className="card">
                <div className="card-body">
                <h2 className="card-title text-center mb-4">Billetera</h2>
                <div className="mb-3 d-flex justify-content-start">
                    <label className="form-label" style={labelStyle}>Tienes 5 Bitcoins</label>
                </div>
                <div className="mb-3 d-flex justify-content-start">
                    <label className="form-label">Tienes {valorCLP} CLP</label>
                </div>
                <div className="mb-3 d-flex justify-content-start">
                    <label className="form-label">Comprar</label>
                    <input></input>
                    <label>BTC</label>
                    <button className="btn btn-success">Comprar</button>
                </div>
                <div className="mb-3 d-flex justify-content-start">
                    <label className="form-label">Vender</label>
                    <input></input>
                    <label>BTC</label>
                    <button className="btn btn-danger">Comprar</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
export default Transactions;
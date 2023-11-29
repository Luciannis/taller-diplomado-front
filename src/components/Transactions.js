import { useEffect,useState } from "react";
import axios from 'axios';

const Transactions = () => {
    const URL = "http://localhost:8000";
    const [saldoTotal, setsaldoTotal] = useState("")
    const [userCLP, setUserCLP] = useState("")
    const [userBitcoin, setUserBitcoin] = useState("")
    const [valorBitcoin,setValorBitcoin] = useState("")

    const formaterBTC = (value) => {
        return parseFloat(value).toFixed(0);
      };

    const formaterPrecio = (value) => {
        const formatter = new Intl.NumberFormat('es-CL', {
          style: 'currency',
          currency: 'CLP',
        });
        return formatter.format(value);
      };

    const getPrecios = async() => {
        try {
          const {data} = await axios.get(`${URL}/price`)
            if(data){
                setValorBitcoin(data.bitcoin.clp)
            }
        } catch (error) {
          console.log("Error al obtener los precios", error);
        }
    }
    //   const calcularSaldoTotal = ()=>  {
    //     saldoTotal = (userBitcoin*valorBitcoin) + (userCLP)
    //     setsaldoTotal(saldoTotal);
    //   }
      useEffect(() => {
        async function saldoUser(){
            const token = localStorage.getItem('token')
            if(token){
                const {data} = await axios.get(`${URL}/wallet`,{headers: {'Authorization': `Bearer ${token}`} })
                setUserBitcoin(data.balance_btc)
                setUserCLP(data.balance_clp)
                console.log("saldo del pana");
                console.log(data);
            }
        }
        getPrecios()
        saldoUser()
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
                    <label className="form-label" style={labelStyle}>1 BTC = {formaterPrecio(parseFloat(valorBitcoin))} CLP</label>
                </div>
                <div className="mb-3 d-flex justify-content-start">
                    <label className="form-label" style={labelStyle}>Tienes <b> {formaterBTC(userBitcoin)} Bitcoins</b></label>
                </div>
                <div className="mb-3 d-flex justify-content-start">
                    <label className="form-label">Tienes<b> {formaterPrecio(parseFloat(userCLP))} CLP </b></label>
                </div>
                <div className="mb-3 d-flex justify-content-start">
                    <label className="form-label">Saldo Total <b>{formaterPrecio(parseFloat(userCLP) + userBitcoin*valorBitcoin)} pesos</b></label>
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
                    <button className="btn btn-danger">Vender</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
export default Transactions;
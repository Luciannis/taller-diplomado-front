import { useEffect,useState } from "react";
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import Alert from 'react-bootstrap/Alert';

const Transactions = () => {
    const URL = "http://localhost:8000";
    const [userCLP, setUserCLP] = useState(0)
    const [userBitcoin, setUserBitcoin] = useState(0)
    const [valorBitcoin,setValorBitcoin] = useState({})
    const [inputBuy, setInputBuy] = useState(0)
    const [inputSell, setInputSell] = useState(0)
    const [loading, setLoading] = useState(true);
    //
    const [bitcoinsComprables, setBitcoinsComprable] = useState(0)
    const [errorAlert, setErrorAlert] = useState({
        show: false,
        message: ''
    });


    const comprarBitcoins = async () => {

        if(inputBuy === '' || inputBuy <= 0){
            setErrorAlert({
                show: true,
                message: 'Ingrese una cantidad válida para comprar bitcoins'
            });
            return;
        }
        const token = localStorage.getItem('token')
        const response = await axios.post(`${URL}/buy/` + inputBuy, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        setUserBitcoin(response.data.balanceBTC)
        setUserCLP(response.data.balanceCLP)
    }
    const closeErrorAlert = () => {
        setErrorAlert({
            show: false,
            message: ''
        });
    }
    const venderBitcoins = async () => {
        console.log("inputBuy");
        console.log(inputSell);
        if(inputSell === '' || inputSell <= 0){
            setErrorAlert({
                show: true,
                message: 'Ingrese una cantidad válida para vender bitcoins'
            });
            return;
        }
        const token = localStorage.getItem('token')
        const response = await axios.post(`${URL}/sell/` + inputSell, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        setUserBitcoin(response.data.balanceBTC)
        setUserCLP(response.data.balanceCLP)
    }

    const formaterBTC = (value) => {
        return parseFloat(value).toFixed(4);
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
                setLoading(false)
            }
        } catch (error) {
          console.log("Error al obtener los precios", error);
        }
    }
      useEffect(() => {
        async function saldoUser(){
            const token = localStorage.getItem('token')
            if(token){
                const {data} = await axios.get(`${URL}/wallet`,{headers: {'Authorization': `Bearer ${token}`} })
                setUserBitcoin(data.balance_btc)
                setUserCLP(data.balance_clp)
                if(userCLP > 0 && valorBitcoin > 0){
                    const total = userCLP / valorBitcoin
                    setBitcoinsComprable(total)
                }else{
                    console.log("no entro");
                }
            }
        }
        getPrecios()
        saldoUser()
      },[userCLP, valorBitcoin])


    const labelStyle = {
        textAlign : 'left'
    }
    return (
        <div>
        {errorAlert.show && (
            <Alert variant="danger" onClose={closeErrorAlert} dismissible>
                {errorAlert.message}
            </Alert>
        )}
        {loading ? (
            <LoadingSpinner />
        ) : (
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
                        <label className="form-label" style={labelStyle}>Tienes <b> {userBitcoin > 0 ? formaterBTC(userBitcoin) : 0} Bitcoins</b> ({formaterPrecio(parseFloat(userBitcoin * valorBitcoin))})</label>
                    </div>
                    <div className="mb-3 d-flex justify-content-start">
                        <label className="form-label">Tienes<b> {formaterPrecio(parseFloat(userCLP))} CLP </b></label>
                    </div>
                    {/* <div className="mb-3 d-flex justify-content-start">
                        <label className="form-label">Saldo Total <b>{formaterPrecio(parseFloat(userCLP) + userBitcoin*valorBitcoin)} pesos</b></label>
                    </div> */}
                    <div className="mb-3 d-flex justify-content-start">
                        <label className="form-label">Comprar</label>
                        <input type="text" value={inputBuy} onChange={e => setInputBuy(e.target.value)}/>
                        <label>BTC</label>
                        <button className="btn btn-success" onClick={comprarBitcoins} disabled={(inputBuy <= 0) || (inputBuy> bitcoinsComprables)}>Comprar</button>
                        <p>Puedes Comprar {formaterBTC(bitcoinsComprables)} bitcoins con tu saldo actual</p>
                    </div>
                    <div className="mb-3 d-flex justify-content-start">
                        <label className="form-label">Vender</label>
                        <input type="text" value={inputSell} onChange={e => setInputSell(e.target.value)}/>
                        <label>BTC</label>
                        <button className="btn btn-danger" onClick={venderBitcoins} disabled={(inputSell <= 0) || inputSell > userBitcoin}>Vender</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}
    </div>

    );
}
export default Transactions;
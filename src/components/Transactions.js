const Transactions = () => {
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
                    <label className="form-label">Tienes 10.000 CLP</label>
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
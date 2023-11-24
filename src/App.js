import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Navigationbar from './components/Navigationbar'
import Home from './components/Home';
import Profile from './components/Profile';
import Transactions from './components/Transactions';
import Login from './components/login';


function App() {
  return (
    <Router>
      <div className='App'>
          <>
            <Navigationbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/login' element={<Login />} />
              <Route path='/transactions' element={<Transactions />} />
            </Routes>
          </>
      </div>
    </Router>
  );
}

export default App;


import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Navigationbar from './components/Navigationbar'
import Home from './components/Home';
import Profile from './components/Profile';
import Transactions from './components/Transactions';
import Login from './components/login';
import { AuthProvider } from './components/AuthContext';


function App() {
  return (
    <Router>
      <AuthProvider>
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
      </AuthProvider>
    </Router>
  );
}

export default App;


import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Dashboard from './components/Dashboard/Dashboard';
import CreateWallet from './components/Dashboard/Dashboard-Operations/CreateWallet';
import NotFound from './components/NotFound';
import UpdateWallet from './components/Dashboard/Dashboard-Operations/UpdateWallet';
import Transaction from './components/Transactions/Transaction';
import AddTransaction from './components/Transactions/Transaction-Operations/AddTransaction';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const userId = localStorage.getItem('userId');
  const isLoggedIn = userId ? true : false;

  return (
      <div>
        {isLoggedIn && <Nav />}
        <Routes>
          {isLoggedIn && <Route path="/" exact element={<Dashboard />} />}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-wallet" element={<CreateWallet />} />
          <Route path="/update-wallet/:walletId" element={<UpdateWallet />} />
          <Route path="/transactions/:walletId" element={<Transaction />} />
          <Route path="/transactions/add-transaction/:walletId" element={<AddTransaction />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
  );
}

export default App;
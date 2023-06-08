import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardItem from './DashboardItem';
import { getWallets } from '../../redux/actions/walletActions';
import { getUser } from '../../redux/actions/userActions';

export default function Dashboard() {
  const dispatch = useDispatch();
  const wallets = useSelector((state) => state.walletReducer.wallets);
  const userId = localStorage.getItem('userId');


  useEffect(() => {
    dispatch(getUser(userId));
    dispatch(getWallets(userId));
  }, [userId, dispatch]);

  function totalBalance(wallets) {
    let total = 0;
    wallets.forEach((wallet) => {
      total += wallet.currentBalance;
    });
    return total;
  }

  return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">My Wallets</h1>
              <br />
              <div className="btn">
                <Link to={`/create-wallet`} className="btn btn-lg btn-primary mr-2">
                  Create Wallet
                </Link>
              </div>
              <div className="card text-center">
                <div className="card-header bg-dark text-white">
                  <h4>Current Balance (Total)</h4>
                  {<h1>$ {totalBalance(wallets)}</h1>}
                </div>
              </div>
              <hr />
              {wallets.map((wallet) => (
                  <DashboardItem key={wallet.id} wallet={wallet} />
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}

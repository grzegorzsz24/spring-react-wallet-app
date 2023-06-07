import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteWallet } from '../../redux/actions/walletActions';

export default function DashboardItem(props) {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  function handleClick(walletId) {
    confirmAlert({
      title: 'You are deleting a wallet!',
      message: 'Are you sure you want to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(deleteWallet(userId, walletId))
        },
        {
          label: 'No',
          onClick: () => navigate('/dashboard')
        }
      ]
    });
  }

  return (
    <div className="container">
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <h3>{props.wallet.name}</h3>
            <p>Account Number: {props.wallet.accountNumber}</p>
          </div>
          <div className="col-lg-4 col-md-6">
            <h3>Description</h3>
            <h5>{props.wallet.description}</h5>
          </div>
          <div className="col-lg-2 col-md-6 text-center">
            <h3>Balance</h3>
            <h1>{props.wallet.currentBalance}</h1>
          </div>
          <div className="col-lg-2 col-md-6 text-center">
            <ul className="list-group">
              <Link to={`/transactions/${props.wallet.id}`}>
                <li className="list-group-item list-group-item-success">
                  <i className="fa fa-flag-checkered pr-1"></i> View Transactions
                </li>
              </Link>
              <Link to={`/update-wallet/${props.wallet.id}`}>
                <li className="list-group-item list-group-item-info">
                  <i className="fa fa-edit pr-1"></i> Update Account Info
                </li>
              </Link>
              <li className="list-group-item list-group-item-danger" onClick={() => handleClick(props.wallet.id)}>
                <i className="fa fa-minus-circle pr-1"></i> Delete Account
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { deleteAndRevokeTransaction, deleteTransaction, getTransactions } from '../../redux/actions/transactionActions';
import { getWallet } from '../../redux/actions/walletActions';
import classnames from 'classnames';

export default function Transaction() {
    const dispatch = useDispatch();
    const { walletId } = useParams();
    const transactions = useSelector(state => state.transactionReducer.transactions);
    const wallet = useSelector(state => state.walletReducer.wallet);
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        dispatch(getWallet(userId, walletId));
        dispatch(getTransactions(walletId));
    }, [dispatch, userId, walletId])

    function handleClick(transactionId, walletId) {
        confirmAlert({
            title: 'You are deleting a transaction!',
            message: 'Do you want to revoke the transaction from your wallet?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(deleteAndRevokeTransaction(transactionId, walletId))
                            .then(() => dispatch(getWallet(userId, walletId)));
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        dispatch(deleteTransaction(transactionId, walletId));
                        dispatch(getWallet(userId, walletId));
                    }
                }
            ]
        });
    }
    
    return (
        <div className="container">
            <Link to={`/dashboard`} className="btn btn-default btn-lg mb-3">
                Back
            </Link>
            <Link to={`/transactions/add-transaction/${walletId}`} className="btn btn-info btn-lg mb-3">
                <i className="fas fa-plus-circle"> Record new Transaction</i>
            </Link>
            <br />
            <div className="card text-center">
                <div className="card-header bg-dark text-white">
                    <h1>{wallet.name}</h1>
                    <h3>Wallet Balance : $ {wallet.currentBalance}</h3>
                </div>
            </div>
            <hr />
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id} className={classnames("align-middle",(transaction.type === 1 ? "table-success" : "table-danger"))}>
                                <td>{transaction.transactionDate}</td>
                                <td>{transaction.description}</td>
                                <td className={transaction.type === 1 ? "text-success" : "text-danger"}>{transaction.amount}</td>
                                <td className='text-center'>
                                    <button onClick={() => handleClick(transaction.id, walletId)} type="button" className="btn btn-danger btn-sm"><i className="fas fa-trash fa-2x"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}

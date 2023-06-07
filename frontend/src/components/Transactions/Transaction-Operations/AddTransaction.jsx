import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createTransaction } from '../../../redux/actions/transactionActions';
import classnames from 'classnames';
import { getWallet } from '../../../redux/actions/walletActions';

export default function AddTransaction() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { walletId } = useParams();
  const userId = localStorage.getItem('userId');

  const error=useSelector(state=>state.error);
  const wallet=useSelector(state=>state.walletReducer.wallet);

  const [transaction, setTransaction] = useState({ amount: "", description: "", type: "",transactionDate:"" });

  function handleChange(event) {
    const { name, value } = event.target;
    setTransaction(prevState => ({ ...prevState, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(createTransaction(transaction,walletId,navigate))

  }
  useEffect(()=>{
    dispatch(getWallet(userId, walletId));
  },[userId, walletId, dispatch])
  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/transactions/${walletId}`} className="btn btn-light">
              Back to Wallet
            </Link>
            <h4 className="display-4 text-center">Record New Transaction</h4>
            <p className="lead text-center">{wallet.name}</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input onChange={handleChange} type="number" className={classnames("form-control form-control-lg", { "is-invalid": error.amount })} name='amount' value={transaction.amount} required placeholder='Amount' />
                {error.amount && (<div className='invalid-feedback'>{error.amount}</div>)}
              </div>
              <br />
              <div className="form-group">
                <textarea onChange={handleChange} className="form-control form-control-lg" name='description' value={transaction.description} required placeholder='Description'></textarea>
              </div>
              <br />
              <div className="form-group">
                <label >Transaction Type : </label>
                <div className="form-check form-check-inline">
                  <input onChange={handleChange} className="form-check-input" type="radio" name="type" id="income" value={1} required />
                  <label className="form-check-label" htmlFor='income'>Income</label>
                </div>
                <div className="form-check form-check-inline">
                  <input onChange={handleChange} className="form-check-input" type="radio" name="type" id="expense" value={2} />
                  <label className="form-check-label" htmlFor='expense'>Expense</label>
                </div>
              </div>
              <br />
              <h6>Transaction Date</h6>
              <div className="form-group">
                <input onChange={handleChange} type="date" name='transactionDate' value={transaction.transactionDate} required className="form-control form-control-lg" />
              </div>
              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

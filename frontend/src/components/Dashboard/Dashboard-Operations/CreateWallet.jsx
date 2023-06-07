import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createWallet } from '../../../redux/actions/walletActions';
import classnames from 'classnames';

export default function CreateWallet() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [wallet, setWallet] = useState({ name: "", accountNumber: "", description: "", currentBalance: "", priority: "" });
    const error = useSelector((state) => state.error);

    function handleChange(event) {
        const { name, value } = event.target;
        setWallet(prevState => ({ ...prevState, [name]: value }));
    };
    function handleSubmit(event) {
        event.preventDefault();
        dispatch(createWallet(userId, wallet, navigate));
    }
    return (
        <div className="project">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Create / Edit Wallet</h5>
                        <hr />
                        <form onSubmit={handleSubmit} action="dashboard.html">
                            <div className="form-group">
                                <input type="text" onChange={handleChange} name="name" value={wallet.name} className={classnames("form-control form-control-lg", { "is-invalid": error.name })} required placeholder="Account Name" />
                                {error.name && (<div className='invalid-feedback'>{error.name}</div>)}
                            </div>
                            <br />
                            <div className="form-group">
                                <input type="number" onChange={handleChange} name="accountNumber" value={wallet.accountNumber} className={classnames("form-control form-control-lg", { "is-invalid": error.accountNumber })} required placeholder="Account No" />
                                {error.accountNumber && (<div className='invalid-feedback'>{error.accountNumber}</div>)}
                            </div>
                            <br />
                            <div className="form-group">
                                <textarea onChange={handleChange} name="description" value={wallet.description} className={classnames("form-control form-control-lg", { "is-invalid": error.description })} required placeholder="Description"></textarea>
                                {error.description && (<div className='invalid-feedback'>{error.description}</div>)}
                            </div>
                            <br />
                            <div className="form-group">
                                <input type="number" onChange={handleChange} name="currentBalance" value={wallet.currentBalance} className={classnames("form-control form-control-lg", { "is-invalid": error.currentBalance })} placeholder="Balance" />
                                {error.currentBalance && (<div className='invalid-feedback'>{error.currentBalance}</div>)}
                            </div>
                            <br />
                            <div className="form-group">
                                <select onChange={handleChange} className="form-control form-control-lg" name="priority" value={wallet.priority} >
                                    <option value={""}>Select Priority</option>
                                    <option value={1}>High</option>
                                    <option value={2}>Medium</option>
                                    <option value={3}>Low</option>
                                </select>
                            </div>
                            <input type="submit" className="btn btn-primary btn-block mt-4" value="Create/Update" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

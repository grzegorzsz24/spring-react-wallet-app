import * as types from "./actionTypes";
import { getErrors } from "./walletActions";
import axios from "axios";

export const createTransaction=(transaction,walletId,navigate)=>{
    return async (dispatch)=>{
        try {
            await axios.post(`http://localhost:8080/transaction/${walletId}`,transaction);
            navigate(`/transactions/${walletId}`);
            dispatch(getErrors({}));
        } catch (error) {
            dispatch(getErrors(error.response.data));
        }
    }
}

export const getTransactions=(walletId)=>{
    return async (dispatch)=>{
        const transactions=(await axios.get(`http://localhost:8080/transaction/${walletId}`)).data;
        dispatch({type:types.GET_TRANSACTIONS,payload:transactions});
    }
}

export const getTransaction=(transactionId,walletId)=>{
    return async (dispatch)=>{
        const transaction=(await axios.get(`http://localhost:8080/transaction/${walletId}/${transactionId}`)).data;
        dispatch({type:types.GET_TRANSACTION,payload:transaction});
    }
}

export const deleteTransaction=(transactionId,walletId)=>{
    return async (dispatch)=>{
        await axios.delete(`http://localhost:8080/transaction/${walletId}/${transactionId}`)
        dispatch({type:types.DELETE_TRANSACTION,payload:transactionId})
    }
}

export const deleteAndRevokeTransaction=(transactionId,walletId)=>{
    return async (dispatch)=>{
        await axios.delete(`http://localhost:8080/transaction/revoke/${walletId}/${transactionId}`)
        dispatch({type:types.DELETE_TRANSACTION,payload:transactionId})
    }
}

import * as types from "./actionTypes";
import axios from "axios";


export const createWallet = (userId, wallet, navigate) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
  
        await axios.post(`http://localhost:8080/wallet/${userId}`, wallet);
        navigate(`/dashboard`);
        dispatch(getErrors({}));
      } catch (error) {
        dispatch(getErrors(error.response.data));
      }
    };
  }
export const updateWallet=(userId, wallet, walletId, navigate)=>{
    return async (dispatch)=>{
        try {
            await axios.put(`http://localhost:8080/wallet/update/${userId}/${walletId}`,wallet);
            navigate(`/dashboard`);
            dispatch(getErrors({}));
        } catch (error) {
            dispatch(getErrors(error.response.data));
        }
    }
}


export const getErrors=(error)=>{
    return {
        type:types.GET_ERRORS,
        payload:error
    }
}
  export const getWallets=(userId)=>{
    return async (dispatch)=>{
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const wallets=(await axios.get(`http://localhost:8080/wallet/${userId}`)).data;
        dispatch({type:types.GET_WALLETS,payload:wallets});
    }
}
  
export const getWallet=(userId, walletId)=>{
    return async (dispatch)=>{
        await axios.get(`http://localhost:8080/wallet/${userId}/${walletId}`).then(res=>{dispatch({type:types.GET_WALLET,payload:res.data});})
        
    }
}

export const deleteWallet=(userId, walletId)=>{
    return async (dispatch)=>{
        await axios.delete(`http://localhost:8080/wallet/${userId}/${walletId}`)
        dispatch({type:types.DELETE_WALLET,payload:walletId})
    }
}
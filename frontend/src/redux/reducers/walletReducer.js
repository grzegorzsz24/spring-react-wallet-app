import * as actionTypes from "../actions/actionTypes";

const initialState={
    wallets:[],
    wallet:{}
};

export default function walletReducer(state=initialState,action){
    switch (action.type) {
        case actionTypes.GET_WALLETS:
            return {...state,wallets:action.payload};  
        case actionTypes.GET_WALLET:
            return {...state,wallet:action.payload}
        case actionTypes.DELETE_WALLET:
            return {...state,wallets:state.wallets.filter(wallet=>wallet.id!==action.payload)}
        default:
            return state;
    }
}
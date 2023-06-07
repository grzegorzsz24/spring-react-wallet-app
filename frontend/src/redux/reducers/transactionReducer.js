import { DELETE_TRANSACTION, GET_TRANSACTION, GET_TRANSACTIONS } from "../actions/actionTypes";

export * as types from "../actions/actionTypes";

const initialState={
    transactions:[],
    transaction:{}
}

export default function transactionReducer(state=initialState,action){
    switch (action.type) {
        case GET_TRANSACTIONS:
            return {...state,transactions:action.payload};
        case GET_TRANSACTION:
            return {...state,transaction:action.payload};
        case DELETE_TRANSACTION:
            return {...state,transactions:state.transactions.filter(transaction=>transaction.id!==action.payload)};
        default:
            return state;
    }
}
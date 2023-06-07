import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import transactionReducer from "./transactionReducer";
import walletReducer from "./walletReducer";
import userReducer from "./userReducer";

const rootReducer=combineReducers({
    error:errorReducer,
    walletReducer:walletReducer,
    transactionReducer:transactionReducer,
    userReducer:userReducer
})

export default rootReducer;
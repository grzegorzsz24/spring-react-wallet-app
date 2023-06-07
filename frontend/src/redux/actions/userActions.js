import axios from "axios";
import * as types from "./actionTypes";

export const getUsers=()=>{
    return async (dispatch)=>{
        const users=(await axios.get("http://localhost:8080/api/user/all")).data;
        dispatch({type:types.GET_USERS,payload:users});
    }
}

export const getUser=(userId)=>{
    return async (dispatch)=>{
        const user=(await axios.get(`http://localhost:8080/api/user/${userId}`)).data;
        dispatch({type:types.GET_USER,payload:user});
    }
}

import {DATA_LOADED,DATA_FAILED} from '../actions/types'

const initialState={
    loading:true,
}

export default function(state=initialState,action){
    const {type,payload}=action;
    switch(type){
        case DATA_LOADED:
       
        return{
            ...state,
            loading:false,
            data:payload
        }
case DATA_FAILED:
return{
    loading:false,
    ...state
}
        default:
        return state
    }
}
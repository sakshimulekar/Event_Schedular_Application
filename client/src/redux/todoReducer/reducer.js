import { TODO_FAILURE, TODO_LOADING, TODO_SUCCESS } from "./actiontype";

const initialState = {
    isLoading:false,
    isErr:false,
    events:[]
}

export const reducer=(state=initialState,{type,payload})=>{
    switch (type) {
        case TODO_LOADING:
            return {...state,isLoading:true}
            break;
        case TODO_SUCCESS:
            console.log(payload,'15')
            return {...state,isLoading:false,events:payload}
        case TODO_FAILURE:
            return {...state,isErr:true}
        default:
            return {...state}
            break;
    }

}


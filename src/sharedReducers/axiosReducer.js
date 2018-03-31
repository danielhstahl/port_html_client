import {
    TOGGLE_AXIOS_FAILURE,
    TOGGLE_AXIOS_SUCCESS,
    AXIOS_LOADING
} from '../actions/actions'
const defaultState={
    loading:{
        status:false,
        id:''
    },
    success:{
        status:false,
        id:''
    },
    failure:{
        status:false,
        id:''
    }
}
const getToggle=(state, key, id)=>({
    ...state,
    [key]:{
        status:!state[key].status,
        id
    }
})
export default (state=defaultState, action)=>{
    switch(action.type){
        case TOGGLE_AXIOS_FAILURE:
            return getToggle(state, 'failure', action.id)
        case TOGGLE_AXIOS_SUCCESS:
            return getToggle(state, 'success', action.id)
        case AXIOS_LOADING:
            return {...state, loading:action.value}
        default:
            return state
    }
}
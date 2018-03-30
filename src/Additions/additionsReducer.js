import {
    UPDATE_NEW_PORT,
    UPDATE_NEW_MATERIAL
} from '../actions/actions'

const defaultState={
    newPort:'',
    newMaterial:''
}

export default (state=defaultState, action)=>{
    switch(action.type){
        case UPDATE_NEW_PORT:
            return {...state, newPort:action.value}
        case UPDATE_NEW_MATERIAL:
            return {...state, newMaterial:action.value}
        default:
            return state
    }
}
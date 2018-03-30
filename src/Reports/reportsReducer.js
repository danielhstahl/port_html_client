import {
    UPDATE_REPORT_DATE,
    UPDATE_REPORT_DATA
} from '../actions/actions'

const defaultState={
    reportDate:'',
    data:[]
}
export default (state=defaultState, action)=>{
    switch(action.type){
        case UPDATE_REPORT_DATE:
            return {...state, reportDate:action.value}
        case UPDATE_REPORT_DATA:
            return {...state, data:action.value}
        default:
            return state
    }
}

import {
    UPDATE_RECEIVE_PORT,
    UPDATE_PROVIDE_PORT,
    UPDATE_POSSIBLE_PORTS,
    UPDATE_POSSIBLE_MATERIALS,
    UPDATE_MATERIAL,
    UPDATE_MATERIAL_AMOUNT,
    UPDATE_COMMENTS,
    POPULATE_POSSIBLE_PORTS,
    UPDATE_TRANSACTION_DATE,
    TOGGLE_MODAL,
    POPULATE_POSSIBLE_MATERIALS
} from '../actions/actions'
const defaultSubmission={
    receivePort:'',
    possiblePorts:[],
    material:'',
    transactionDate:'',
    possibleMaterials:[],
    materialAmount:0,
    providePort:'',
    comments:'',
    showWarningModal:false,

}

export default (state=defaultSubmission, action)=>{
    switch(action.type){
        case UPDATE_RECEIVE_PORT:
            return {...state, receivePort:action.value}
        case UPDATE_MATERIAL:
            return {...state, material:action.value}
        case UPDATE_TRANSACTION_DATE:
            return {...state, transactionDate:action.value}
        case UPDATE_MATERIAL_AMOUNT:
            return {...state, materialAmount:action.value}
        case UPDATE_PROVIDE_PORT:
            return {...state, providePort:action.value}
        case UPDATE_COMMENTS:
            return {...state, comments:action.value}
        case UPDATE_POSSIBLE_PORTS:
            return {...state, possiblePorts:[...state.possiblePorts, action.value]}
        case POPULATE_POSSIBLE_PORTS:
            return {...state, possiblePorts:action.value}
        case UPDATE_POSSIBLE_MATERIALS:
            return {...state, possibleMaterials:[...state.possibleMaterials, action.value]}
        case POPULATE_POSSIBLE_MATERIALS:
            return {...state, possibleMaterials:action.value}
        case TOGGLE_MODAL:
            return {...state, showWarningModal:!state.showWarningModal}
        default:
            return state
    }
}
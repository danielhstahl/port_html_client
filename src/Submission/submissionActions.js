import {
    UPDATE_RECEIVE_PORT,
    UPDATE_PROVIDE_PORT,
    UPDATE_MATERIAL,
    UPDATE_MATERIAL_AMOUNT,
    UPDATE_COMMENTS,
    POPULATE_POSSIBLE_PORTS,
    POPULATE_POSSIBLE_MATERIALS,
    UPDATE_TRANSACTION_DATE,
    TOGGLE_MODAL
} from '../actions/actions'

import {
    generateFormValueAction,
    generateFormDateAction,
    generateFormInputAction,
    
} from '../actions/formActions'

import {
    showAxiosFailure,
    showAxiosSuccess,
    setLoading
} from '../actions/apiActions'

import axios from 'axios'

export const selectReceivePort=generateFormValueAction(UPDATE_RECEIVE_PORT)
export const selectMaterial=generateFormValueAction(UPDATE_MATERIAL)
export const selectMaterialAmount=generateFormValueAction(UPDATE_MATERIAL_AMOUNT)
export const selectProvidePort=generateFormValueAction(UPDATE_PROVIDE_PORT)
export const selectComments=generateFormInputAction(UPDATE_COMMENTS)
export const selectTransactionDate=generateFormDateAction(UPDATE_TRANSACTION_DATE)

export const toggleModal=dispatch=>()=>dispatch({
    type:TOGGLE_MODAL
})
const generatePost=(url, type)=>dispatch=>()=>{
    axios.post(url, {}).then(({data})=>{
        if(!data||data.Failure){
            return
        }
        dispatch({
            type,
            value:data
        })
    })
}
export const loadMaterials=generatePost('/getMaterials', POPULATE_POSSIBLE_MATERIALS)
export const loadPorts=generatePost('/getPorts', POPULATE_POSSIBLE_PORTS)    

export const submitNewTransaction=dispatch=>({receivePort, material, materialAmount, comments, transactionDate, providePort})=>()=>{
    setLoading(true)(dispatch)
    const body={
        firstPort:{
            Port:receivePort,
            Material:material,
            Date:transactionDate,
            Amount:materialAmount, 
            Comment:comments
        }
    }
    const fullBody=providePort?
        {
            ...body, 
            secondPort:{
                ...body.firstPort,
                Port:providePort,
                Amount:-materialAmount
            }
        }:
        body
    axios.post('/writeTransaction', fullBody).then(({data})=>{
        if(data.Failure){
            showAxiosFailure('submission')(dispatch)
            return
        }
        showAxiosSuccess('submission')(dispatch)
    }).catch(err=>{
        showAxiosFailure('submission')(dispatch)
    }).finally(()=>{
        setLoading(false)(dispatch)
    })
}
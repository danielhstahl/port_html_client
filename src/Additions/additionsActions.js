import {
    UPDATE_NEW_PORT,
    UPDATE_NEW_MATERIAL,
    UPDATE_POSSIBLE_PORTS,
    UPDATE_POSSIBLE_MATERIALS
} from '../actions/actions'

import {
    generateFormInputAction,
} from '../actions/formActions'

import {
    showAxiosFailure,
    showAxiosSuccess,
    setLoading
} from '../actions/apiActions'
import {newPort, newMaterial} from './additionConstants'
import axios from 'axios'

const setUpdate=(type, value)=>dispatch=>dispatch({type, value})

export const selectNewPort=generateFormInputAction(UPDATE_NEW_PORT)
export const selectNewMaterial=generateFormInputAction(UPDATE_NEW_MATERIAL)

const submitGeneric=(url, type, key)=>dispatch=>text=>()=>{
    setLoading(true, key)(dispatch)
    setUpdate(type, text)(dispatch)
    axios.post(url, {[key]:text}).then(({data})=>{
        if(data.Failure){
            showAxiosFailure(key)(dispatch)
            return
        }
        showAxiosSuccess(key)(dispatch)
    }).catch(()=>{
        showAxiosFailure(key)(dispatch)
    }).finally(()=>{
        setLoading(false, key)(dispatch)
    })
}
export const submitNewPort=submitGeneric('/writePort', UPDATE_POSSIBLE_PORTS, newPort)
export const submitNewMaterial=submitGeneric('/writeMaterial', UPDATE_POSSIBLE_MATERIALS, newMaterial)


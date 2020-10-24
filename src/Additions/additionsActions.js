import {
    UPDATE_NEW_PORT,
    UPDATE_NEW_MATERIAL,
    UPDATE_POSSIBLE_PORTS,
    UPDATE_POSSIBLE_MATERIALS,
    DELETE_ALL_DATA
} from '../actions/actions'

import {
    generateFormInputAction,
} from '../actions/formActions'

import {
    showAxiosFailure,
    showAxiosSuccess,
    setLoading
} from '../actions/apiActions'
import { newPort, newMaterial, deleteAll } from './additionConstants'

const setUpdate = (type, value) => dispatch => dispatch({ type, value })

export const selectNewPort = generateFormInputAction(UPDATE_NEW_PORT)
export const selectNewMaterial = generateFormInputAction(UPDATE_NEW_MATERIAL)

const submitGeneric = (url, type, key, method = 'POST') => dispatch => text => () => {
    setLoading(true, key)(dispatch)
    setUpdate(type, text)(dispatch)
    fetch(url, { method, body: JSON.stringify({ [key]: text }) })
        .then(res => res.json()).then(({ data }) => {
            showAxiosSuccess(key)(dispatch)
        }).catch(() => {
            showAxiosFailure(key)(dispatch)
        }).finally(() => {
            setLoading(false, key)(dispatch)
        })
}
export const submitNewPort = submitGeneric('/port', UPDATE_POSSIBLE_PORTS, newPort)
export const submitNewMaterial = submitGeneric('/material', UPDATE_POSSIBLE_MATERIALS, newMaterial)
export const submitDeleteAll = submitGeneric('/all', DELETE_ALL_DATA, deleteAll, 'DELETE')


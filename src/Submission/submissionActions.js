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


export const selectReceivePort = generateFormValueAction(UPDATE_RECEIVE_PORT)
export const selectMaterial = generateFormValueAction(UPDATE_MATERIAL)
export const selectMaterialAmount = generateFormValueAction(UPDATE_MATERIAL_AMOUNT)
export const selectProvidePort = generateFormValueAction(UPDATE_PROVIDE_PORT)
export const selectComments = generateFormInputAction(UPDATE_COMMENTS)
export const selectTransactionDate = generateFormDateAction(UPDATE_TRANSACTION_DATE)

export const toggleModal = dispatch => () => dispatch({
    type: TOGGLE_MODAL
})
const generateGet = (url, type) => dispatch => () => {
    fetch(url, { method: 'GET' }).then(res => res.json()).then((data) => {
        if (!data || data.Failure) {
            return
        }
        dispatch({
            type,
            value: data
        })
    })
}
export const loadMaterials = generateGet('/material', POPULATE_POSSIBLE_MATERIALS)
export const loadPorts = generateGet('/port', POPULATE_POSSIBLE_PORTS)

export const submitNewTransaction = dispatch => ({ receivePort, material, materialAmount, comments, transactionDate, providePort }) => () => {
    setLoading(true)(dispatch)
    const body = {
        firstPort: {
            Port: receivePort,
            Material: material,
            Date: transactionDate,
            Amount: materialAmount,
            Comment: comments
        }
    }
    const fullBody = providePort ?
        {
            ...body,
            secondPort: {
                ...body.firstPort,
                Port: providePort,
                Amount: -materialAmount
            }
        } :
        body
    fetch('/transaction', { method: 'POST', body: JSON.stringify(fullBody) }).then(res => res.json()).then((data) => {
        if (data.Failure) {
            throw new Error(data.Failure)
        }
        showAxiosSuccess('submission')(dispatch)
    }).catch(err => {
        showAxiosFailure('submission')(dispatch)
    }).finally(() => {
        setLoading(false)(dispatch)
    })
}
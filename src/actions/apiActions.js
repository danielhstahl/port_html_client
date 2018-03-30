import {
    TOGGLE_AXIOS_FAILURE,
    TOGGLE_AXIOS_SUCCESS,
    AXIOS_LOADING
} from './actions'

const toggleFailure=id=>({
    type:TOGGLE_AXIOS_FAILURE,
    id
})
const toggleSuccess=id=>({
    type:TOGGLE_AXIOS_SUCCESS,
    id
})
export const setLoading=(loading, id)=>dispatch=>dispatch({
    type:AXIOS_LOADING,
    value:{
        status:loading,
        id
    }
})
const lengthToShowSuccess=2000
const showAxiosResults=result=>dispatch=>{
    dispatch(result)
    setTimeout(()=>{
        dispatch(result)
    }, lengthToShowSuccess)
}
export const showAxiosFailure=id=>showAxiosResults(toggleFailure(id))
export const showAxiosSuccess=id=>showAxiosResults(toggleSuccess(id))


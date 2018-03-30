

export const generateFormValueAction=type=>dispatch=>value=>dispatch({
    type,
    value
})
export const generateFormDateAction=type=>dispatch=>(date, dateString)=>dispatch({
    type,
    value:dateString
})
export const generateFormInputAction=type=>dispatch=>e=>dispatch({
    type,
    value:e.target.value
})

import {
    UPDATE_REPORT_DATE,
    UPDATE_REPORT_DATA
} from '../actions/actions'
import {
    setLoading,
    showAxiosFailure
} from '../actions/apiActions'
import {
    generateFormDateAction
} from '../actions/formActions'
import {
    downloadFile
} from '../utils/helperFns'

export const setReportDate = generateFormDateAction(UPDATE_REPORT_DATE)
export const selectReportData = dispatch => (key, reportDate) => () => {
    setLoading(true, key)(dispatch)
    fetch(`/all?report_date=${reportDate}`, { method: 'GET' }).then(res => res.json()).then((data) => {
        dispatch({
            type: UPDATE_REPORT_DATA,
            value: data.map((v, i) => ({ key: i, ...v }))
        })
    }).catch(() => {
        showAxiosFailure(key)(dispatch)
    }).finally(() => {
        setLoading(false, key)(dispatch)
    })
}
export const selectAllData = dispatch => key => () => {
    setLoading(true, key)(dispatch)
    fetch('/transaction', { method: 'GET' }).then(res => res.json()).then((data) => {
        downloadFile(data, 'results.csv')
    }).catch(() => {
        showAxiosFailure(key)(dispatch)
    }).finally(() => {
        setLoading(false, key)(dispatch)
    })
}
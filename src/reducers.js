import axios from './sharedReducers/axiosReducer'
import submission from './Submission/submissionReducer'
import additions from './Additions/additionsReducer'
import reports from './Reports/reportsReducer'
import { combineReducers } from 'redux'

export default combineReducers({
    axios,
    submission,
    additions,
    reports
})

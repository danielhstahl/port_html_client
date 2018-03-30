import { connect } from 'react-redux'
import Reports from './Reports'

import {
    setReportDate,
    selectReportData, 
    selectAllData
} from './reportsActions'


const mapStateToProps=state=>({
    data:state.reports.data,
    reportDate:state.reports.reportDate,
    loading:state.axios.loading,
    success:state.axios.success,
    failure:state.axios.failure
})
const mapDispatchToProps=dispatch=>({
    setReportDate:setReportDate(dispatch),
    selectReportData:selectReportData(dispatch),
    selectAllData:selectAllData(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
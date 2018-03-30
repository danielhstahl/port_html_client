import { connect } from 'react-redux'
import Submission from './Submission'

import {
    selectReceivePort,
    selectMaterial,
    selectMaterialAmount,
    selectProvidePort,
    selectComments,
    selectTransactionDate,
    submitNewTransaction,
    toggleModal,
    loadMaterials,
    loadPorts
} from './submissionActions'


const mapStateToProps=state=>({
    receivePort:state.submission.receivePort,
    possiblePorts:state.submission.possiblePorts,
    material:state.submission.material,
    possibleMaterials:state.submission.possibleMaterials,
    materialAmount:state.submission.materialAmount,
    providePort:state.submission.providePort,
    comments:state.submission.comments,
    showWarningModal:state.submission.showWarningModal,
    loading:state.axios.loading,
    success:state.axios.success,
    failure:state.axios.failure,
    transactionDate:state.submission.transactionDate
})
const mapDispatchToProps=dispatch=>({
    selectReceivePort:selectReceivePort(dispatch),
    selectMaterial:selectMaterial(dispatch),
    selectMaterialAmount:selectMaterialAmount(dispatch),
    selectProvidePort:selectProvidePort(dispatch),
    selectComments:selectComments(dispatch),
    selectTransactionDate:selectTransactionDate(dispatch),
    toggleWarningModal:toggleModal(dispatch),
    submit:submitNewTransaction(dispatch),
    loadMaterials:loadMaterials(dispatch),
    loadPorts:loadPorts(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Submission)
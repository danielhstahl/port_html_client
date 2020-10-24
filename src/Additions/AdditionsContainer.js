import { connect } from 'react-redux'
import Additions from './Additions'

import {
    selectNewPort,
    selectNewMaterial,
    submitNewPort,
    submitNewMaterial,
    submitDeleteAll
} from './additionsActions'


const mapStateToProps = state => ({
    newPort: state.additions.newPort,
    newMaterial: state.additions.newMaterial,
    loading: state.axios.loading,
    success: state.axios.success,
    failure: state.axios.failure
})
const mapDispatchToProps = dispatch => ({
    selectNewPort: selectNewPort(dispatch),
    selectNewMaterial: selectNewMaterial(dispatch),
    submitNewPort: submitNewPort(dispatch),
    submitNewMaterial: submitNewMaterial(dispatch),
    submitDeleteAll: submitDeleteAll(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Additions)
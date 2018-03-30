import React from 'react'
import { Select, InputNumber, Input, Button, Modal, Form, DatePicker} from 'antd'
import AsyncHOC from '../SharedComponents/AsyncHOC'
import {
    formStyle,
    buttonFormStyle, 
    inputStyle
} from '../utils/styles'
import {
    buttonText
} from '../utils/helperFns'
const Option = Select.Option
const FormItem=Form.Item
const verifyForm=(materialAmount, transactionDate)=>{
    //date in yyyy-mm-dd
    const isValidDate=transactionDate.match(/((19|20)\d\d)-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/)
    //integers
    const isValidMaterialAmount=materialAmount.toString().match(/^[-+]?\d+$/)
    return isValidDate&&isValidMaterialAmount
}


const Submission=({
    receivePort, selectReceivePort, possiblePorts,
    material, selectMaterial, possibleMaterials,
    materialAmount, selectMaterialAmount,
    providePort, selectProvidePort,
    comments, selectComments,
    transactionDate, selectTransactionDate,
    submit,
    toggleWarningModal,
    showWarningModal, 
    loading,
    success,
    failure
})=>{
    const currySubmit=submit({receivePort, material, materialAmount, comments, transactionDate, providePort})
    const toggleAndSubmit=()=>{
        currySubmit()
        toggleWarningModal()
    }
    return [
        <FormItem label='Port that will receive materials' {...formStyle} key='receivePort'>
            <Select value={receivePort} onChange={selectReceivePort} style={inputStyle}>
                {possiblePorts.map(v=><Option value={v} key={v}>{v}</Option>)}
            </Select>
        </FormItem>,
        <FormItem label='Select material' key='materal' {...formStyle}>
            <Select value={material} onChange={selectMaterial} style={inputStyle}>
                {possibleMaterials.map(v=><Option value={v} key={v}>{v}</Option>)}
            </Select>
        </FormItem>,
        <FormItem label='Number of Materials (integers only)' key='materialnum' {...formStyle}>
            <InputNumber value={materialAmount} onChange={selectMaterialAmount} style={inputStyle}/>
        </FormItem>,
        <FormItem label='Date of Transaction (yyyy-mm-dd)' key='tdate' {...formStyle}>
            <DatePicker onChange={selectTransactionDate} style={inputStyle}/>
        </FormItem>,
        <FormItem label='Port that will provide materials (not required)' key='pport' {...formStyle}>
            <Select value={providePort} onChange={selectProvidePort} style={inputStyle}>
                {possiblePorts.map(v=><Option value={v} key={v}>{v}</Option>)}
            </Select>
        </FormItem>,
        <FormItem label='Optional Comments' key='comments' {...formStyle}>
            <Input.TextArea rows={4} value={comments} onChange={selectComments} style={inputStyle}/>
        </FormItem>,
        <FormItem key='submitbutton' {...buttonFormStyle}>
            <Button type='primary' loading={loading.status} disabled={!verifyForm(materialAmount, transactionDate)} onClick={providePort?currySubmit:toggleWarningModal}>{buttonText(success.status, failure.status)}</Button>
        </FormItem>,
        <Modal
            key='modalWarning'
            title=""
            visible={showWarningModal}
            onOk={toggleAndSubmit}
            onCancel={toggleWarningModal}
            okText='Ok.  I only want one port.'
            cancelText='Not Ok!  Let me go back and edit.'
        >
            Warning: no second port selected.  Is this ok?
        </Modal>
    ]
}
const loadM=({loadMaterials})=>loadMaterials()
const loadP=({loadPorts})=>loadPorts()

export default AsyncHOC(loadM, loadP)(Submission)
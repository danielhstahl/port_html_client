import React from 'react'
import { DatePicker, Button, Form, Table} from 'antd'
import { buttonText } from '../utils/helperFns'
import {
    formStyle,
    inputStyle
} from '../utils/styles'
const FormItem=Form.Item
const verifyForm=val=>val.length>0

const columns = [
    {
        title: 'Port',
        dataIndex: 'Port',
        key: 'Port',
    }, {
        title: 'Amount',
        dataIndex: 'Amount',
        key: 'Amount',
    }, {
        title: 'Material',
        dataIndex: 'Material',
        key: 'Material',
    }
]

const reportKey='getReports'
const allDataKey='allData'
const downloadText='Download to CSV'
const getIdFromKeys=(success, failure, key)=>success.id===key||failure.id===key
const DownloadButton=(selectAllData, success, failure)=>()=><Button type='primary' onClick={selectAllData(allDataKey)}>
    { 
        getIdFromKeys(success, failure, allDataKey)?
        buttonText(success.status, failure.status, downloadText):
        buttonText(false, false, downloadText)
    }
</Button>

const Reports=({setReportDate, selectReportData, selectAllData, reportDate, loading, success, failure, data})=> [
    <FormItem label='Select Reporting Date' {...formStyle} key={reportKey}>
        <DatePicker onChange={setReportDate} style={inputStyle}/>
        <Button type='primary' loading={loading.id===reportKey&&loading.status} disabled={!verifyForm(reportDate)} onClick={selectReportData(reportKey, reportDate)}>{getIdFromKeys(success, failure, reportKey)?buttonText(success.status, failure.status):buttonText(false, false)}</Button>
    </FormItem>,
    <Table pagination={false} title={DownloadButton(selectAllData, success, failure)} dataSource={data} columns={columns} key='displaytable'/>
] 
export default Reports
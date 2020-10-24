import React from 'react'
import { Input, Button, Form, Modal } from 'antd'
import { buttonText } from '../utils/helperFns'
import {
    formStyle,
    inputStyle
} from '../utils/styles'
import { newPort as portKey, newMaterial as materialKey, deleteAll as deleteKey } from './additionConstants'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const FormItem = Form.Item
const getIsBetween = (min, max) => length => length > min && length < max
const isBetweenSpec = getIsBetween(0, 50)
const verifyForm = value => isBetweenSpec(value.length)


const Addition = ({ val, updateVal, submit, trackAxios, title, loading, success, failure }) => (
    <FormItem label={`${title} (under 50 characters)`} {...formStyle}>
        <Input value={val} onChange={updateVal} style={inputStyle} />
        <Button type='primary' loading={trackAxios && loading.status} disabled={!verifyForm(val)} onClick={submit}>{trackAxios ? buttonText(success.status, failure.status) : buttonText(false, false)}</Button>
    </FormItem>
)
const DeleteButton = ({ submit, trackAxios, loading, success, failure }) => (
    <FormItem label="Danger" {...formStyle}>

        <Button danger type='primary' loading={trackAxios && loading.status} onClick={confirm(submit)}>{trackAxios ? buttonText(success.status, failure.status, "Delete All") : buttonText(false, false, "Delete All")}</Button>
    </FormItem>
)
const confirm = (submit) => () => {
    Modal.confirm({
        title: 'Confirm',
        icon: <ExclamationCircleOutlined />,
        content: 'Are you sure?',
        okText: 'Delete',
        cancelText: 'Cancel',
        onOk: submit
    })
}
const Additions = ({
    newPort, selectNewPort,
    newMaterial, selectNewMaterial,
    submitNewPort, submitNewMaterial,
    submitDeleteAll,
    loading, success, failure }) => [
        <Addition
            title='Add Port' val={newPort}
            updateVal={selectNewPort} key={portKey}
            trackAxios={loading.id === portKey}
            loading={loading}
            success={success}
            failure={failure}
            submit={submitNewPort(newPort)}
        />,
        <Addition
            title='Add Material Type'
            val={newMaterial}
            updateVal={selectNewMaterial}
            key={materialKey}
            trackAxios={loading.id === materialKey}
            loading={loading}
            success={success}
            failure={failure}
            submit={submitNewMaterial(newMaterial)}
        />,
        <DeleteButton
            key={deleteKey}
            trackAxios={loading.id === deleteKey}
            loading={loading}
            success={success}
            failure={failure}
            submit={submitDeleteAll()}
        />,
    ]

export default Additions
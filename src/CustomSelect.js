import React from 'react';
import {
    FormControl, 
    FormGroup, 
    ControlLabel 
} from 'react-bootstrap'
export default ({label, onSelect, types, placeholder})=>(
<FormGroup>
  <ControlLabel>{label}</ControlLabel>
  <FormControl componentClass="select" placeholder={placeholder} onChange={(event)=>{onSelect(event);} }>
    <option value=''></option>
    {types.map((value, index)=>(<option key={index} value={value}>{value}</option>)
    )}
  </FormControl>
</FormGroup>
)
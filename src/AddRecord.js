import React, { Component } from 'react';
import {
    Button, 
    FormControl, 
    FormGroup, 
    ProgressBar, 
    ControlLabel
} from 'react-bootstrap'
import axios from 'axios'
export default class AddRecord extends Component{
    constructor(props) {
      super(props);
      this.state={
        id:this.props.id,
        label:this.props.label,
        //url:this.props.url,
        text:'',
        style:'primary',
        progress:false,
        buttonText:'Submit',
        key:this.props.httpKey,
        canSubmit:false
      }
    }
    onSubmit(event){
      event.preventDefault();
      if(!this.state.canSubmit){
        return;
      }
      var data={};
      data[this.state.key]=this.state.text;
      this.setState(
        {
          progress:true
        },
        axios.post('/'+this.props.url, data).then(({data})=>{
            if(!data.error){
             
              if(this.props.onSuccess){
                this.props.onSuccess();
              }
              this.setState({
                style:'success',
                buttonText:'Success',
                progress:false
              },
              ()=>{setTimeout(()=>{
                this.setState({
                  style:'primary',
                  buttonText:'Submit'
                });
              }, 1000)});
            }
          }
        ).catch(err=>console.log(err))
      );
      
    }
    onFieldChange(e){
      var val=e.target.value;
      if(val.length>0 && val.length<=50){
        this.setState({
          text:e.target.value,
          validate:null,
          canSubmit:true
        });
      }
      else{
        this.setState({
          validate:'error',
          canSubmit:false
        });
      }
      
    }
    render(){
      
      return(
        <form onSubmit={(event)=>{this.onSubmit(event);}}>
          <FormGroup controlId={this.state.id} validationState={this.state.validate}>
            <ControlLabel>{this.state.label}</ControlLabel>
            <FormControl onChange={(event)=>{this.onFieldChange(event);} } type='text'/>
          </FormGroup>  
          {this.state.progress?<ProgressBar active/>:<Button type='submit' disabled={!this.state.canSubmit} bsStyle={this.state.style}>{this.state.buttonText}</Button>}
        </form>
      );
      
    }
  }
import React, { Component } from 'react';
import CustomSelect from './CustomSelect'
import axios from 'axios'
import {
  Button, 
  FormControl, 
  FormGroup, 
  ProgressBar, 
  Row, Col, 
  ControlLabel, Modal
} from 'react-bootstrap'
export default class HoldSubmission extends Component{
    constructor(props) {
      super(props);
      this.state={
        firstPort:'',
        numberOfMaterials:0,
        materialType:'',
        secondPort:'',
        style:'primary',
        progress:false,
        buttonText:'Submit',
        canSubmit:false
      }
    }
    getFirstPort(event){
      this.setState({
        firstPort:event.target.value
      }, ()=>{this.canSubmit();});
    }
    getSecondPort(event){
      this.setState({
        secondPort:event.target.value
      });
    }
    getNumberMaterials(event){
      var val=event.target.value;
      //if(val.match(/^[1-9]\d*$/)){ //positive integers
      if(val.match(/^[-+]?\d+$/)){ // integers
        
        this.setState({
          nValidationState:null,
          numberOfMaterials:parseFloat(event.target.value)
        },
        ()=>{this.canSubmit();});
      }
      else{
        this.setState({
          nValidationState:'error',
          numberOfMaterials:0
        });
      }
    }
    getAsOf(event){
      var val=event.target.value;
      if(val.match(/((19|20)\d\d)-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/)){ //date in yyyy-mm-dd
        this.setState({
          dValidationState:null,
          asOf:event.target.value
        },
        ()=>{this.canSubmit();});
      }
      else{
        this.setState({
          dValidationState:'error',
          asOf:''
        });
      }
    }
    getMaterial(event){
      this.setState({
        materialType:event.target.value
      }, ()=>{this.canSubmit();});
    }
    getOptionalComment(event){
      this.setState({
        optionalComment:event.target.value
      });
    }
    canSubmit(){
      if(this.state.materialType&&/*this.state.numberOfMaterials>0&&*/this.state.firstPort&&this.state.asOf){
        this.setState({
          canSubmit:true
        })
      }
    }
    afterSuccess(noErrors){
      if(noErrors){
        this.setState({
          progress:false,
          style:'success',
          buttonText:'Success'
          
        },
        ()=>{setTimeout(()=>{
          this.setState({
            style:'primary',
            buttonText:'Submit'
          });
        }, 1000)});
      }
      else{
        this.setState({
          progress:false
        });
      }
      
    }
    onSubmit(event){
      event.preventDefault();
      if(this.state.canSubmit){
        if(!this.state.secondPort){
          this.setState({
            showModal:true
          });
        }
        else{
          this.submitUtil();
        }
      }
    }
    submitUtil(){
      this.setState({
          progress:true,
          showModal:false
        }, 
        ()=>{
          const {secondPort, firstPort, asOf, numberOfMaterials, optionalComment, materialType}=this.state
          //var numT=this.state.secondPort?2:1;
          //var noErrors=true;
          //var numError=0;
          const transactionBody=Object.assign({}, {firstPort:{Port:firstPort, Material:materialType, Date:asOf, Amount:numberOfMaterials, Comment:optionalComment}}, secondPort?{secondPort:{Port:secondPort, Material:materialType, Date:asOf, Amount:-numberOfMaterials, Comment:optionalComment}}:{})

          axios.post('/writeTransaction', transactionBody).then(({data})=>{
            if(data.Failure){
              alert(data.Failure.Detail)
              this.afterSuccess(false)//errors
              return
            }
            this.afterSuccess(true);//no errors
          }).catch(err=>{
            alert(err)
            this.afterSuccess(false)
          })
          
        });
    }
    closeModal(){
      this.setState({
        showModal:false
      });
    }
    render(){
      return(
        <form onSubmit={(event)=>{this.onSubmit(event);}}>
          <Row>
            <Col xs={12} sm={6} md={4}>
              <CustomSelect 
                types={this.props.ports} 
                label='Port that will receive materials' 
                onSelect={(event)=>{
                  this.getFirstPort(event);
                }}
                placeholder="Select a Port"
              />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <CustomSelect 
                types={this.props.materials} 
                label='Select material' 
                onSelect={(event)=>{
                  this.getMaterial(event);
                }}
                placeholder="Select Materials"
              />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <FormGroup validationState={this.state.nValidationState}>
                <ControlLabel>Number of Materials</ControlLabel>
                <FormControl  type='text' onChange={(event)=>{this.getNumberMaterials(event);}}/>
              </FormGroup>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <FormGroup validationState={this.state.dValidationState}>
                <ControlLabel>Date of Transaction (yyyy-mm-dd)</ControlLabel>
                <FormControl  type='text' onChange={(event)=>{this.getAsOf(event);}}/>
              </FormGroup>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <CustomSelect 
                types={this.props.ports} 
                label='Port that will provide materials (not required)' 
                onSelect={(event)=>{
                  this.getSecondPort(event);
                }}
                placeholder="Select a Port"
              />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <FormGroup >
                <ControlLabel>Optional Comments</ControlLabel>
                <FormControl  componentClass="textarea" onChange={(event)=>{this.getOptionalComment(event);}}/>
              </FormGroup>
            </Col>
           </Row> 
          {this.state.progress?<ProgressBar active/>:<Button disabled={!this.state.canSubmit} type='submit' bsStyle={this.state.style}>{this.state.buttonText}</Button>}
           <Modal show={this.state.showModal} onHide={()=>{this.closeModal();}}>
            <Modal.Body>
              Warning: no second port selected.  Is this ok?
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle='warning' onClick={()=>{this.closeModal();}}>Not Ok!  Let me go back and edit.</Button>
              <Button bsStyle='success' onClick={()=>{this.submitUtil();}}>Ok.  I only want one port.</Button>
            </Modal.Footer>
          </Modal>
        </form>
      );
    }
  
  }
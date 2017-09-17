import React, { Component } from 'react';
import {downloadFile, convertDateToString} from './utils'
import {
    Button,  
    FormGroup, 
    FormControl,
    ProgressBar, 
    ControlLabel, 
    Table
} from 'react-bootstrap'
import axios from 'axios'

export class DisplayResults extends Component {
    constructor(props){
      super(props);
      this.currDate=convertDateToString(new Date())
      this.state={
        canSubmit:true,
        asOf:this.currDate,
        allResultsProgress:false
      };
    }
    onSubmit(event){
      event.preventDefault();
      axios.post('/getResults', {Date:this.state.asOf}).then(({data})=>{
        if(!data.error){
          this.setState({
            data
          });
        }
      }).catch(err=>console.log(err));
    }
    getAsOf(event){
      var val=event.target.value;
      if(val.match(/((19|20)\d\d)-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/)){ //date in yyyy-mm-dd
        this.setState({
          dValidationState:null,
          asOf:event.target.value
        },
        ()=>{this.setState({
          canSubmit:true
        })});
      }
      else{
        this.setState({
          dValidationState:'error',
          asOf:'',
          canSubmit:false
        });
      }
    }
    downloadData(){
      this.setState({
        allResultsProgress:true
      }, 
      ()=>{
        axios.post('/getAllResults', {}).then(({data})=>{
          if(!data.error){
            downloadFile(data, "results.csv");
          }
          this.setState({
            allResultsProgress:false
          });
        }).catch(err=>console.log(err))
      });
      
      
    }
    render(){
      return(
        <div>
          {this.state.allResultsProgress?<ProgressBar active/>:<Button onClick={()=>{this.downloadData();}}>Download as CSV</Button>}
          <form onSubmit={(e)=>{this.onSubmit(e);}}>
            <FormGroup validationState={this.state.dValidationState}>
              <ControlLabel>As Of Date (yyyy-mm-dd)</ControlLabel>
              <FormControl type='text' onChange={(event)=>{this.getAsOf(event);}} defaultValue={this.currDate} />
            </FormGroup>
            <Button disabled={!this.state.canSubmit} type='submit' bsStyle='primary'>Submit</Button>
          </form>
          <DisplayTable data={this.state.data}/>
        </div>
      );
      
    }
  
  
  }


export const DisplayTable=({data})=>{
    const columns=data?data[0]?Object.keys(data[0]):[]:[];
    const myData=data?data:[];
    return(
    <Table responsive>
      <thead>
        <tr>
          {columns.map((value, index)=>{
            return(
              <th key={index}>{value}</th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {myData.map((value, index)=>{
          return(
            <tr key={index}>
              {columns.map((valueKey, indexCol)=>{
                return(
                  <td key={indexCol}>{value[valueKey]}</td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
    );
  }
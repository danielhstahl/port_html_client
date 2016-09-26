import React, { Component } from 'react';
import './App.css';
import {Button, FormControl, Nav, NavItem, Jumbotron, FormGroup, ProgressBar, Row, Col, ControlLabel, Table} from 'react-bootstrap'

var hrefUrl='';
if(process.env.NODE_ENV!=='production'){
  hrefUrl='http://localhost:3000';
}
Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();
  var mms=mm.toString();
  var dds=dd.toString();
  dd=dds[1]?dds:'0'+dds;
  mm=mms[1]?mms:'0'+mms;
  return [this.getFullYear(), '-', mm , '-', dd].join(''); // padding
};

function ajax(url, data, callback){

    var xmlhttp=new XMLHttpRequest();
    //the callback function to be callled when AJAX request comes back
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState===4 && xmlhttp.status===200){
            callback(JSON.parse(xmlhttp.responseText));
        }
        else{
          callback({error:"Something went wrong"});
        }
    }       
    xmlhttp.open("POST",hrefUrl+'/'+url,true);
    xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.send(JSON.stringify(data));
}

class PortSelect extends Component {
  render(){
    return(
      <FormGroup>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl componentClass="select" placeholder="Select a Port" onChange={(event)=>{this.props.onSelect(event);} }>
          <option value='0'></option>
          {this.props.portTypes.map((value, index)=>{
            return(<option key={index} value={value}>{value}</option>);
          })}
        </FormControl>
      </FormGroup>  
    )
  }
}
class MaterialSelect extends Component {
  render(){
    return(
      <FormGroup>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl componentClass="select" placeholder="Select Materials" onChange={(event)=>{this.props.onSelect(event);} }>
          <option value='0'></option>
          {this.props.materialTypes.map((value, index)=>{
            return(<option key={index} value={value}>{value}</option>);
          })}
        </FormControl>
      </FormGroup>  
    )
  }
}

class DisplayResults extends Component {
  constructor(props){
    super(props);
    this.currDate=new Date().yyyymmdd();
    this.state={
      canSubmit:true,
      asOf:this.currDate
    };
  }
  onSubmit(event){
    event.preventDefault();
    ajax('getResults', {Date:this.state.asOf}, (msg)=>{
      console.log(msg);
      if(!msg.error){
        this.setState({
          data:msg
        });
      }
    });
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
  render(){
    return(
      <div>
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

class DisplayTable extends Component{
  constructor(props){
    super(props);
    this.state={
      columns:this.props.data?this.props.data[0]?Object.keys(this.props.data[0]):[]:[],
      n:this.props.data?this.props.data.length:0,
      data:this.props.data?this.props.data:[]
    };
  }
  componentWillReceiveProps(nextProps){
    this.setData(nextProps);
  }
  setData(props){
    this.setState({
      columns:props.data?props.data[0]?Object.keys(props.data[0]):[]:[],
      n:props.data?props.data.length:0,
      data:props.data?props.data:[]
    });
  }
  render(){
    return(
      <Table responsive>
        <thead>
          <tr>
            {this.state.columns.map((value, index)=>{
              return(
                <th key={index}>{value}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((value, index)=>{
            return(
              <tr key={index}>
                {this.state.columns.map((valueKey, indexCol)=>{
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
}

class HoldSubmission extends Component{
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
    if(val.match(/^[1-9]\d*$/)){ //positive integers
      
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
  canSubmit(){
    if(this.state.materialType&&this.state.numberOfMaterials>0&&this.state.firstPort&&this.state.asOf){
      this.setState({
        canSubmit:true
      })
    }
  }
  onSubmit(event){
    event.preventDefault();
    if(this.state.canSubmit){
      ajax('writeTransaction', {Port:this.state.firtPort, Material:this.state.materialType, Date:this.state.asOf, Amount:this.state.numberOfMaterials}, (result)=>{
        console.log(result);
      });
      if(this.state.secondPort){
        ajax('writeTransaction', {Port:this.state.secondPort, Material:this.state.materialType, Date:this.state.asOf, Amount:this.state.numberOfMaterials*(-1)}, (result)=>{
          console.log(result);
        });
      }
    }
  }
  render(){
    return(
      <form onSubmit={(event)=>{this.onSubmit(event);}}>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <PortSelect 
              portTypes={this.props.ports} 
              label='Port that will receive materials' 
              onSelect={(event)=>{
                this.getFirstPort(event);
              }}
            />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <MaterialSelect 
              materialTypes={this.props.materials} 
              label='Select material' 
              onSelect={(event)=>{
                this.getMaterial(event);
              }}
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
            <PortSelect 
              portTypes={this.props.ports} 
              label='Port that will provide materials (not required)' 
              onSelect={(event)=>{
                this.getFirstPort(event);
              }}
            />
          </Col>
         </Row> 
        {this.state.progress?<ProgressBar active/>:<Button disabled={!this.state.canSubmit} type='submit' bsStyle={this.state.style}>{this.state.buttonText}</Button>}
        
      </form>
    )
  }

}
class AddRecord extends Component{
  constructor(props) {
    super(props);
    this.state={
      id:this.props.id,
      label:this.props.label,
      url:this.props.url,
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
    //var onSuccess=this.props.onSuccess;
    //console.log(onSuccess);
    this.setState(
      {
        progress:true
      },
      ajax(this.state.url, data, 
        (obj)=>{
          if(!obj.error){
           
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
      )
    );
    
  }
  onFieldChange(e){
    var val=e.target.value;
    if(val.length>0){
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
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      eventOne:true,
      eventTwo:false,
      eventThree:false,
      active:"1",
      ports:[],
      materials:[]
    };
  }
  switchRow(eventKey){
    event.preventDefault();
    eventKey=parseInt(eventKey, 10);
    switch(eventKey){
      case 1:
        this.setState({
          eventOne:true,
          eventTwo:false,
          eventThree:false,
          active:"1"
        });
        break;
      case 2:
        this.setState({
          eventOne:false,
          eventTwo:true,
          eventThree:false,
          active:"2"
        });
        break;
      case 3:
        this.setState({
          eventOne:false,
          eventTwo:false,
          eventThree:true,
          active:"3"
        });
        break;
      default:
    }
  }
  componentWillMount(){
    this.getPorts();
    this.getMaterials();
  }
  getPorts(){
    ajax('getPorts', {}, (results)=>{
      if(!results||results.error){
        return;
      }
      this.setState({
        ports:results
      });
    });
  }
  getMaterials(){
    ajax('getMaterials', {}, (results)=>{
      if(!results||results.error){
        return;
      }
      this.setState({
        materials:results
      });
    });
  }
  render() {
    return (
      <div>
        <Jumbotron>
          <div className='container'>
            <h1>Material Tracker</h1>
            <p>This app tracks materials between ports</p>
          </div>
        </Jumbotron>


        <div className='container'>
          <Nav bsStyle="tabs" activeKey={this.state.active} onSelect={(eventKey)=>{this.switchRow(eventKey);}}>
            <NavItem eventKey="1" >Enter Data</NavItem>
            <NavItem eventKey="2" >Add Options</NavItem>
            <NavItem eventKey="3" >Results</NavItem>
          </Nav>
          <div className='smallSpace'></div>
          {this.state.eventOne?<HoldSubmission ports={this.state.ports} materials={this.state.materials}/>:null}
          {this.state.eventTwo?<Row>
            <Col sm={12} md={6}>
              <AddRecord id='addport' label='Add Port' httpKey='Port' url='writePort' onSuccess={()=>{
                this.getPorts();
              }}/>
              <AddRecord id='addmaterial' label='Add Material Type' url='writeMaterial' httpKey='Material' onSuccess={()=>{
                this.getMaterials();
              }}/>
            </Col>
          </Row>:null}
          {this.state.eventThree?<DisplayResults/>:null}
        </div>
        <div className='blankSpace'></div>
      </div>
    );
  }
}

export default App;

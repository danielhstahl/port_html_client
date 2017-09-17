import React, { Component } from 'react';
import './App.css';
import {
  Nav, NavItem, 
  Jumbotron, 
  Row, Col
} from 'react-bootstrap'

import {DisplayResults} from './Displays'
import AddRecord from './AddRecord'
import HoldSubmission from './HoldSubmission'
import axios from 'axios'


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
    eventKey=parseInt(eventKey, 10);
    switch(eventKey){
      case 1:
        this.setState({
          eventOne:true,
          eventTwo:false,
          eventThree:false,
          active:eventKey
        });
        break;
      case 2:
        this.setState({
          eventOne:false,
          eventTwo:true,
          eventThree:false,
          active:eventKey
        });
        break;
      case 3:
        this.setState({
          eventOne:false,
          eventTwo:false,
          eventThree:true,
          active:eventKey
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
    axios.post('/getPorts', {}).then(({data})=>{
      if(!data||data.error){
        return;
      }
      this.setState({
        ports:data
      });
    }).catch(err=>console.log(err));
  }
  getMaterials(){
    axios.post('getMaterials', {}).then(({data})=>{
      if(!data||data.error){
        return;
      }
      this.setState({
        materials:data
      });
    }).catch(e=>console.log(e));
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

import React, {Component} from 'react'
export default (...get)=>WrappedComponent=>
    class extends Component{
        componentDidMount(){
            Promise.all(get.map(g=>g(this.props)))
        }
        render(){
            return <WrappedComponent {...this.props}/>
        }
    }

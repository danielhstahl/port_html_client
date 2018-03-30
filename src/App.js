import React from 'react'
import { Layout, Menu } from 'antd'
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import Submission from './Submission/SubmissionContainer'
import Additions from './Additions/AdditionsContainer'
import Reports from './Reports/ReportsContainer'
const { Header, Content, Footer } = Layout
const menuStyle={ lineHeight: '64px' }
const contentStyle={ padding: '0 50px' }
const contentDiv={ background: '#fff', padding: 24, minHeight: 280 }
const footerStyle={ textAlign: 'center' }
const ENTER_DATA_ROUTE='/enter_data'
const ADD_OPTIONS_ROUTE='/add_options'
const RESULTS_ROUTE='/results'

const AppMenu=({location})=>(
  <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        style={menuStyle}
      >
        <Menu.Item key={ENTER_DATA_ROUTE}><Link to={ENTER_DATA_ROUTE}>Enter Data</Link></Menu.Item>
        <Menu.Item key={ADD_OPTIONS_ROUTE}><Link to={ADD_OPTIONS_ROUTE}>Add Options</Link></Menu.Item>
        <Menu.Item key={RESULTS_ROUTE}><Link to={RESULTS_ROUTE}>Results</Link></Menu.Item>
      </Menu>
    </Header>
)

const App=()=>(
<Router>
  <Layout className="layout">
    
    <Route path='/' component={AppMenu} />    
    <Content style={contentStyle}>
      <div style={contentDiv}>
        <Switch>
          <Redirect exact to={ENTER_DATA_ROUTE} from='/'/>
          <Route path={ENTER_DATA_ROUTE} component={Submission}/>
          <Route path={ADD_OPTIONS_ROUTE} component={Additions}/>
          <Route path={RESULTS_ROUTE} component={Reports}/>
        </Switch>
      </div>
    </Content>
    <Footer style={footerStyle}>
      Port Client
    </Footer>
  </Layout>
</Router>
)

export default App

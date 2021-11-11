import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from "./components/Home"
import {SignUp} from "./components/Register"
import SignIn from './components/SignIn'
import Adminview from "./components/Adminview"
import './index.css'
import Layout from './container/Layout'
import Studentview from "./components/Studentview"
function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={SignIn} />
                    <Route exact path="/register" component={SignUp} />
                    <Route exact path="/student-view" component={Studentview} />
                    <Route exact path="/admin-dashboard" component={Adminview} />
                </Switch>
            </Layout>
        </Router>
    )
}

export default App
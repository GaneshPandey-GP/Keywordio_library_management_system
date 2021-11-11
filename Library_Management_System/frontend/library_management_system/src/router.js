import React from "react";
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from "./components/Home";
import {Login} from "./components/Login";
import {Signup} from "./components/Signup"

export default function BaseRouter() {
    return(
        <Router>
            <Switch>
                <Route exact path="/home" element={Home}></Route>
                <Route exact path="/login" element={Login}></Route>
                <Route exact path="/register" element={Signup}></Route>
            </Switch>
        </Router>
    )
}
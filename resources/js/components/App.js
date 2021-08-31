import React, { Component } from 'react';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import Home from './Home/Home';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

export default class App extends Component {

    render(){
        let navLink = (
          <div className="Tab">
              <NavLink to="/sign-in" activeClassName="activeLink" className="signIn">Sign In</NavLink>
              <NavLink to="/" activeClassName="activeLink" className="Home signUp">Sign Up</NavLink>
          </div>
        );
        const login = localStorage.getItem("isLoggedIn");
        return(<>
        <div className="App">
           { login ? (
            <Router>
                <Route exact path="/" component={SignUp}></Route>
                <Route  path="/sign-in" component={SignIn}></Route>
              <Route  path="/home" component={Home}></Route>
            </Router>
           ):(
            <Router>
                {navLink}
                <Route exact path="/" component={SignUp}></Route>
                <Route  path="/sign-in" component={SignIn}></Route>
                <Route  path="/home" component={Home}></Route>
            </Router>
           )}
        </div>
        </>);
    }
}



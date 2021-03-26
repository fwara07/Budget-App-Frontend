import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Category from "./components/Category";
import Categories from "./components/Categories";
import Settings from "./components/Settings";
import History from "./components/History";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: localStorage.getItem("token") ? true : false,
      username: "",
      error: null,
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch("http://localhost:8000/core/current_user/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.username) {
            this.setState({ username: json.username });
          } else {
            localStorage.removeItem("token");
            window.location.href = "/";
          }
        });
    }
  }
  setLogoutState = () => {
    this.setState({ logged_in: false, username: "", error: "" });
  };

  setSignUpState = (username) => {
    this.setState({
      logged_in: true,
      username: username,
    });
  };

  setLoginState = (username) => {
    this.setState({
      logged_in: true,
      username: username,
    });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar
            logged_in={this.state.logged_in}
            setLogoutState={this.setLogoutState}
          />
          <Switch>
            <Route exact path="/">
              <Dashboard logged_in={this.state.logged_in} />
            </Route>
            <Route
              path="/login"
              render={(props) => {
                return (
                  <LoginForm {...props} setLoginState={this.setLoginState} />
                );
              }}
            />
            <Route
              path="/signup"
              render={(props) => {
                return (
                  <SignupForm {...props} setSignUpState={this.setSignUpState} />
                );
              }}
            />
            <Route path="/categories">
              <Categories />
            </Route>
            <Route
              exact
              path="/category/:id"
              render={(props) => {
                return <Category {...props} />;
              }}
            />
            <Route
              path="/category/settings/:id"
              render={(props) => {
                return <Settings {...props} />;
              }}
            />
            <Route
              path="/history"
              render={(props) => {
                return <History {...props} />;
              }}
            />
            )
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignupForm extends React.Component {
  state = {
    username: "",
    password: "",
    error: { username: null, password: null },
  };

  submitSignUp = (e) => {
    e.preventDefault();
    const data = { ...this.state };
    delete data.error;
    const is_valid = this.validateData(data);
    if (is_valid.ok) {
      fetch("https://budget-planning.herokuapp.com/core/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.hasOwnProperty("msg")) {
            this.setState({
              ...this.state,
              password: "",
              username: "",
              error: {
                ...this.state.error,
                username: json.msg,
              },
            });
          } else {
            localStorage.setItem("token", json.token);
            this.props.setSignUpState(json.username);
            this.props.history.push("/");
          }
        });
    } else {
      this.setState({
        ...this.state,
        password: "",
        error: {
          ...this.state.error,
          password: is_valid.msg,
        },
      });
    }
  };

  validateData = (data) => {
    if (
      data.password.length < 8 ||
      !/\d/.test(data.password) ||
      !/[a-zA-Z]/g.test(data.password)
    ) {
      return {
        ok: false,
        msg: "Use 8 or more characters with a mix of letters & numbers.",
      };
    }
    return { ok: true };
  };

  handle_change = (e) => {
    this.renderAlert = false;
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      newState["error"] = { username: null, password: null };
      return newState;
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <div className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  error={this.state.error.username}
                  helperText={this.state.error.username}
                  onChange={this.handle_change}
                  required
                  fullWidth
                  value={this.state.username}
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={this.state.error.password}
                  helperText={this.state.error.password}
                  value={this.state.password}
                  variant="outlined"
                  onChange={this.handle_change}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={this.submitSignUp}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(SignupForm);

SignupForm.propTypes = {
  setSignUpState: PropTypes.func.isRequired,
};

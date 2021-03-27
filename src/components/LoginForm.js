import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

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
    backgroundColor: theme.palette.primary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    error: null,
  };

  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      newState["error"] = null;
      return newState;
    });
  };

  submitLogIn = (e) => {
    e.preventDefault();
    const data = { ...this.state };
    delete data.error;
    fetch("/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.hasOwnProperty("non_field_errors")) {
          this.setState({
            username: "",
            password: "",
            error: "Please check your login credentials.",
          });
        } else {
          localStorage.setItem("token", json.token);
          this.props.setLoginState(json.user.username);
          this.props.history.push("/");
        }
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
            Login
          </Typography>
          <div className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  onChange={this.handle_change}
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  value={this.state.username}
                  name="username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={this.state.error}
                  helperText={this.state.error}
                  variant="outlined"
                  onChange={this.handle_change}
                  required
                  fullWidth
                  value={this.state.password}
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
                color="primary"
                className={classes.submit}
                onClick={this.submitLogIn}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default withStyles(useStyles, { withTheme: true })(LoginForm);

LoginForm.propTypes = {
  setLoginState: PropTypes.func.isRequired,
};

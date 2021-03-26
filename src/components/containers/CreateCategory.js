import React, { Component } from "react";
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
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";
import Alert from "@material-ui/lab/Alert";
import { getAllCategories } from "../actions/actions";
import Page from "./Page";

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

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

class CreateCategory extends Component {
  state = {
    title: this.props.categoryTitle,
    deposit_limit: Number(this.props.depositLimit),
    withdraw_limit: Number(this.props.withdrawLimit),
    renderAlert: false,
    alreadyHasCategory: false,
  };

  handle_change = (e) => {
    const title = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[title] = value;
      newState["renderAlert"] = false;
      newState["alreadyHasCategory"] = false;
      return newState;
    });
  };

  handle_create_category = (e) => {
    e.preventDefault();
    if (
      JSON.parse(localStorage.getItem("categories")).length >= 6 &&
      this.isUpdate === false
    ) {
      this.setState({
        renderAlert: true,
        title: "",
        deposit_limit: 10,
        withdraw_limit: 10,
      });
    } else {
      const data = { ...this.state };
      delete data.renderAlert;
      const fetchUrl = this.isUpdate
        ? `update-category/${this.updateCategoryID}`
        : "create-category";
      const fetchMethod = this.isUpdate ? "PUT" : "POST";
      fetch(`http://localhost:8000/api/${fetchUrl}`, {
        method: fetchMethod,
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: this.state.title,
          deposit_limit: Number(this.state.deposit_limit),
          withdraw_limit: Number(this.state.withdraw_limit),
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (this.isUpdate) {
            getAllCategories(() => {});
          } else {
            if (json.hasOwnProperty("msg")) {
              this.setState({
                title: "",
                alreadyHasCategory: true,
              });
            } else {
              window.location.href = "/";
            }
          }
        });
    }
  };

  isUpdate = this.props.isUpdate;
  categoryTitle = this.props.categoryTitle;
  updateCategoryID = Number(this.props.updateCategoryID);
  withdrawLimit = Number(this.props.withdrawLimit);

  render() {
    const { classes } = this.props;
    return (
      <Page
        title={
          this.isUpdate ? `Update ${this.categoryTitle}` : "Create A Category"
        }
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {this.isUpdate
                ? `Update ${this.categoryTitle}`
                : "Create A Category"}
            </Typography>
            {this.state.renderAlert && (
              <Alert severity="error">
                You cannot have more than 6 categories.
              </Alert>
            )}
            {this.state.alreadyHasCategory && (
              <Alert severity="error">
                A category with that name already exists.
              </Alert>
            )}
            <div className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    onChange={this.handle_change}
                    required
                    fullWidth
                    value={this.state.title}
                    id="title"
                    label="Title"
                    name="title"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Depost limit amount
                    <CustomTooltip title="This is the amount you cannot exced to make a deposit.">
                      <HelpIcon fontSize="small" />
                    </CustomTooltip>
                  </InputLabel>
                  <TextField
                    id="outlined-number"
                    value={this.state.deposit_limit}
                    onChange={this.handle_change}
                    InputProps={{
                      inputProps: {
                        max: 500,
                        min: 10,
                      },
                    }}
                    name="deposit_limit"
                    type="number"
                    fullWidth
                    variant="outlined"
                    required
                    labelWidth={200}
                  />
                </Grid>
                <Grid className={classes.margin} item xs={12}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Withdraw limit amount
                    <CustomTooltip title="This is the amount you cannot exced to make a withdrawal.">
                      <HelpIcon fontSize="small" />
                    </CustomTooltip>
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-number"
                    value={this.state.withdraw_limit}
                    onChange={this.handle_change}
                    InputProps={{
                      inputProps: {
                        max: 500,
                        min: 10,
                      },
                    }}
                    name="withdraw_limit"
                    type="number"
                    fullWidth
                    variant="outlined"
                    required
                    labelWidth={200}
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={this.handle_create_category}
                >
                  {this.isUpdate
                    ? `Update ${this.categoryTitle}`
                    : "Create A Category"}
                </Button>
              </Grid>
            </div>
          </div>
        </Container>
      </Page>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(CreateCategory);

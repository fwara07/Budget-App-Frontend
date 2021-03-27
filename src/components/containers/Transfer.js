import {
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";
import React, { Component } from "react";

export default class Transfer extends Component {
  state = {
    category: "",
    amount: 0,
    description: "",
    error: null,
    categoryError: null,
  };

  transfer = (e) => {
    e.preventDefault();
    const withdraw_data = { ...this.state };
    if (withdraw_data.category === "") {
      this.setState({ categoryError: "You must select a valid category" });
    } else {
      withdraw_data.category = this.props.category;
      delete withdraw_data.error;
      delete withdraw_data.categoryError;
      if (withdraw_data.amount > this.props.balance) {
        this.setState({
          amount: 0,
          error: `You do not have enough funds to transfer ${withdraw_data.amount}.`,
        });
      } else if (withdraw_data.amount <= 0) {
        this.setState({
          amount: 0,
          error: "You cannot transfer funds less than or equal to $0.00",
        });
      } else {
        fetch("https://budget-planning.herokuapp.com/api/withdraw", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(withdraw_data),
        }).then((_res) => {
          const deposit_data = { ...this.state };
          deposit_data.category = this.state.category;
          fetch("https://budget-planning.herokuapp.com/api/deposit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(deposit_data),
          }).then((_res) => {
            this.props.renderParentCallback();
          });
        });
      }
    }
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

  handle_select_change = (e) => {
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState["category"] = value;
      newState["categoryError"] = null;
      return newState;
    });
  };

  render() {
    const categories = JSON.parse(localStorage.getItem("categories"));
    return (
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Typography variant="h4">Make a transfer</Typography>
            <Grid item xs={12}>
              <Select
                required
                variant="outlined"
                fullWidth
                error={this.state.categoryError}
                displayEmpty
                value={this.state.category}
                onChange={this.handle_select_change}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="" disabled>
                  Select Category
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={Number(category.id)}>
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={this.state.categoryError}>
                {this.state.categoryError}
              </FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Amount"
                variant="outlined"
                required
                fullWidth
                type="number"
                name="amount"
                value={this.state.amount}
                error={this.state.error}
                helperText={this.state.error}
                onChange={this.handle_change}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                type="text"
                name="description"
                value={this.state.description}
                required={false}
                autoFocus={false}
                onChange={this.handle_change}
              />
            </Grid>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              onClick={this.transfer}
            >
              Transfer
            </Button>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

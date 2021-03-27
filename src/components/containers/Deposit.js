import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";

export default class Deposit extends Component {
  state = {
    category: JSON.parse(localStorage.getItem("categories")).find(
      (category) => {
        return category.id === this.props.category;
      }
    ),
    amount: 0,
    description: "",
    error: null,
  };

  deposit = (e) => {
    e.preventDefault();
    const data = { ...this.state };
    data.category = data.category.id;
    delete data.error;
    if (this.validateData(data)) {
      fetch("https://budget-planning.herokuapp.com/api/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      }).then((_res) => {
        this.props.renderParentCallback();
      });
    }
  };

  validateData = (data) => {
    if (Number(data.amount) > Number(this.state.category.deposit_limit)) {
      this.setState({
        amount: 0,
        error: `Deposit cannot be greater than $${this.state.category.deposit_limit}`,
      });
      return false;
    } else if (Number(data.amount) <= 0) {
      this.setState({
        amount: 0,
        error: `Deposit cannot be smaller or equal to $0.00`,
      });
      return false;
    }
    return true;
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

  render() {
    return (
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Typography variant="h4">Make a deposit</Typography>
            <Grid item xs={12}>
              <TextField
                id="outlined-number"
                label="Amount"
                value={this.state.amount}
                onChange={this.handle_change}
                InputProps={{
                  inputProps: {
                    max: this.state.category.deposit_limit,
                    min: 0,
                  },
                }}
                error={this.state.error}
                helperText={this.state.error}
                name="amount"
                type="number"
                fullWidth
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={this.handle_change}
                fullWidth
                required={false}
                autoFocus={false}
                value={this.state.description}
                id="description"
                label="Description"
                name="description"
              />
            </Grid>
            <Button
              fullWidth
              color="primary"
              type="submit"
              variant="contained"
              onClick={this.deposit}
            >
              Deposit
            </Button>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Input,
  InputLabel,
  Typography,
  TextField,
} from "@material-ui/core";

export default class Withdraw extends Component {
  state = {
    category: JSON.parse(localStorage.getItem("categories")).find(
      (category) => {
        return category.id == this.props.category;
      }
    ),
    amount: 0,
    description: "",
    error: null,
  };

  withdraw = (e) => {
    e.preventDefault();
    const data = { ...this.state };
    data.category = data.category.id;
    delete data.error;
    if (this.validateData(data)) {
      fetch("http://localhost:8000/api/withdraw", {
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

  validateData = (data) => {
    if (Number(data.amount) > Number(this.state.category.withdraw_limit)) {
      this.setState({
        amount: 0,
        error: `Withdraw cannot be greater than $${this.state.category.withdraw_limit}`,
      });
      return false;
    } else if (Number(data.amount) <= 0) {
      this.setState({
        amount: 0,
        error: `Withdraw cannot be smaller or equal to $0.00`,
      });
      return false;
    } else if (Number(data.amount) > this.props.balance) {
      this.setState({
        amount: 0,
        error: `You do not have enough funds to withdraw ${data.amount}.`,
      });
      return false;
    }
    return true;
  };

  render() {
    return (
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Typography variant="h4">Spend ( Withdraw )</Typography>
            <Grid item xs={12}>
              <TextField
                label="Amount"
                variant="outlined"
                InputProps={{
                  inputProps: {
                    max: this.state.category.withdraw_limit,
                    min: 0,
                  },
                }}
                error={this.state.error}
                helperText={this.state.error}
                type="number"
                name="amount"
                value={this.state.amount}
                fullWidth
                required={true}
                onChange={this.handle_change}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                type="text"
                label="Description"
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
              onClick={this.withdraw}
              type="submit"
            >
              Withdraw
            </Button>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

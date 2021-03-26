import React, { Component } from "react";
import Deposit from "./containers/Deposit";
import Withdraw from "./containers/Withdraw";
import Transfer from "./containers/Transfer";
import { Container, Grid, Typography } from "@material-ui/core";
import WelcomeCategoryCard from "./containers/WelcomeCategoryCard";
import Page from "./containers/Page";
import { getBalance } from "./actions/actions";

export default class Category extends Component {
  state = {
    title: "",
    category: Number(this.props.match.params.id),
    balance: 0,
    username: this.props.username,
  };

  setBalanceState = (json) => {
    this.setState({
      title: Object.keys(json)[0],
      balance: Number(Object.values(json)[0]).toFixed(2),
    });
  };

  componentDidMount() {
    getBalance(this.setBalanceState, this.state);
  }

  renderParentCallback = () => {
    getBalance(this.setBalanceState, this.state);
  };

  render() {
    return (
      <Page title={this.state.title}>
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={12} sm={12} xl={12} xs={12} align="center">
              <Typography variant="h3" gutterBottom>
                {this.state.title}
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6} xl={12} xs={12}>
              <WelcomeCategoryCard
                category={this.state.category}
                balance={this.state.balance}
              />
            </Grid>
            <Grid item lg={6} sm={6} xl={12} xs={12}>
              <Transfer
                balance={this.state.balance}
                category={this.state.category}
                renderParentCallback={this.renderParentCallback}
              />
            </Grid>
            <Grid item lg={6} sm={6} xl={12} xs={12}>
              <Deposit
                renderParentCallback={this.renderParentCallback}
                category={this.state.category}
              />
            </Grid>
            <Grid item lg={6} sm={6} xl={12} xs={12}>
              <Withdraw
                balance={this.state.balance}
                renderParentCallback={this.renderParentCallback}
                category={this.state.category}
              />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }
}

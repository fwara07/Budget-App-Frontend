import React, { Component } from "react";
import { Button, Container, colors, Grid } from "@material-ui/core";
import SpendingPerCategory from "./containers/SpendingPerCategory";
import "./Dashboard.css";
import { ThemeProvider, withStyles } from "@material-ui/core/styles";
import Page from "./containers/Page";
import TotalHistory from "./containers/TotalHistory";
import TotalCategory from "./containers/TotalCategory";
import TotalBalance from "./containers/TotalBalance";
import CategoryList from "./containers/CategoryList";
import HighestPerformingCategory from "./containers/HighestPerformingCategory";
import LowestPerformingCategory from "./containers/LowestPerformingCategory";
import LineChart from "./containers/LineChart";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import { getAllCategories } from "./actions/actions";

const styles = (theme) => ({
  root: {
    backgroundColor: colors.grey[100],
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
});

class Dashboard extends Component {
  state = {
    categories: [],
    has_categories: false,
  };

  setCategoriesState = (json) => {
    this.setState({
      categories: json,
      has_categories: true,
    });
  };

  componentDidMount() {
    if (this.props.logged_in) {
      getAllCategories(this.setCategoriesState);
    }
  }

  notLoggedInComponent = (
    <div className={"home__hero-section darkBg"}>
      <div className="container">
        <div
          className="row home__hero-row"
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="col">
            <div className="home__hero-text-wrapper">
              <h1 component="h1" className="heading">
                Budgeting Made Easy
              </h1>
              <p className="home__hero-subtitle">
                Learn to create budgets with pretend money, to get ready for the
                real world
              </p>
              <Button href="/signup" color="secondary" variant="contained">
                Get Started
              </Button>
            </div>
          </div>
          <div className="col">
            <div className="home__hero-img-wrapper">
              <img src="finance.svg" alt="Finance" className="home__hero-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  hasCategoryLoggedIn = (styles) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Page className={styles.root} title="Dashboard">
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCategory />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalBalance />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <HighestPerformingCategory />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <LowestPerformingCategory />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LineChart />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <CategoryList />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <SpendingPerCategory />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <TotalHistory />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </ThemeProvider>
  );

  noCategoryLoggedIn = (
    <div className="paper">
      <h1 component="h1" className="heading__dark">
        Seems like you don't have any categories...
      </h1>
      <Button variant="contained" color="primary" href="/categories">
        Create a Category
      </Button>
    </div>
  );

  LoggedInComponent = (state, styles) => (
    <div>
      {state.has_categories
        ? this.hasCategoryLoggedIn(styles)
        : this.noCategoryLoggedIn}
    </div>
  );

  render() {
    console.log(this.state);
    const { classes } = this.props;
    return (
      <div>
        {this.props.logged_in
          ? this.LoggedInComponent(this.state, classes)
          : this.notLoggedInComponent}
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);

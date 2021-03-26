import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { Component } from "react";
import CreateCategory from "./containers/CreateCategory";
import DeleteIcon from "@material-ui/icons/Delete";
import Page from "./containers/Page";
import { getAllCategories } from "./actions/actions";

export default class Settings extends Component {
  state = {
    category: JSON.parse(localStorage.getItem("categories")).find(
      (category) => {
        return category.id == this.props.match.params.id;
      }
    ),
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  deletCategory = () => {
    fetch(
      `http://localhost:8000/api/delete-category/${this.state.category.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((_json) => {
        getAllCategories(() => {});
        window.location.href = "/";
      });
  };

  render() {
    return (
      <Page title={`Update ${this.state.category.title}`}>
        <Grid item align="center">
          <Typography variant="h3">Settings</Typography>
        </Grid>
        <CreateCategory
          isUpdate={true}
          categoryTitle={this.state.category.title}
          updateCategoryID={this.state.category.id}
          depositLimit={this.state.category.deposit_limit}
          withdrawLimit={this.state.category.withdraw_limit}
        />
        <br />
        <Grid item align="center">
          <Button
            variant="contained"
            color="primary"
            href={`/category/${this.props.match.params.id}`}
            size="large"
          >
            Back
          </Button>
        </Grid>
        <br />
        <Grid item align="center">
          <Button
            startIcon={<DeleteIcon />}
            variant="contained"
            color="secondary"
            onClick={this.handleClickOpen}
          >
            Delete
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {`Are you sure you want to delete ${this.state.category.title} category?`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Deleting this category will remove all transactions associated
                with this category. This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.deletCategory} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Page>
    );
  }
}

import {
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
});

const WelcomeCategoryCard = ({ balance, category, ...rest }) => {
  const classes = useStyles();
  return (
    <div>
      <Card className={clsx(classes.root)} {...rest}>
        {/* <CardContent>
          <Grid container spacing={2}>
            <Typography variant="h4">{`Welcome ${username} Your balance is $${balance}`}</Typography>
          </Grid>
        </CardContent> */}
        <CardContent>
          <Grid container justify="space-between" spacing={3}>
            <Grid item>
              <Typography gutterBottom variant="h5">
                Category Balance
              </Typography>
              <br />
              <Typography color="textPrimary" variant="h2">
                {`$${balance}`}
              </Typography>
              <br />
              <br />
              <br />
              <Button
                variant="outlined"
                color="secondary"
                href={`settings/${category}`}
              >
                Change Settings
              </Button>
              <Button
                style={{
                  marginLeft: 10,
                }}
                variant="contained"
                color="secondary"
                href="/"
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

WelcomeCategoryCard.propTypes = {
  className: PropTypes.string,
  balance: PropTypes.number.isRequired,
};

export default WelcomeCategoryCard;

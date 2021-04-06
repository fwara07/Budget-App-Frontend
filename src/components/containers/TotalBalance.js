import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56,
  },
}));

const TotalBalance = ({ className, ...rest }) => {
  const classes = useStyles();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      let response = await fetch(
        "https://budget-planning.herokuapp.com/api/total-balance",
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        }
      );
      let json = await response.json();
      setBalance(json);
    };
    getBalance();
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL BALANCE
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {`$${balance}`}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalBalance.propTypes = {
  className: PropTypes.string,
};

export default TotalBalance;

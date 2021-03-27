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
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.pink[600],
    height: 56,
    width: 56,
  },
}));

const HighestPerformingCategory = ({ className, ...rest }) => {
  const classes = useStyles();
  const [performingCategory, setPerformingCategory] = useState("");

  useEffect(() => {
    fetch(
      "https://budget-planning.herokuapp.com/api/highest-performing-category",
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setPerformingCategory(json);
      });
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              HIGHEST CATEGORY
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {performingCategory}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ArrowUpwardIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

HighestPerformingCategory.propTypes = {
  className: PropTypes.string,
};

export default HighestPerformingCategory;

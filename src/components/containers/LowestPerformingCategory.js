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
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.purple[600],
    height: 56,
    width: 56,
  },
}));

const LowestPerformingCategory = ({ className, ...rest }) => {
  const classes = useStyles();
  const [notPerformingCategory, setNotPerformingCategory] = useState("");

  useEffect(() => {
    const getNotPerformingCategory = async () => {
      let response = await fetch(
        "https://budget-planning.herokuapp.com/api/lowest-performing-category",
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        }
      );
      let json = await response.json();
      setNotPerformingCategory(json);
    };
    getNotPerformingCategory();
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              LOWEST CATEGORY
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {notPerformingCategory}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ArrowDownwardIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

LowestPerformingCategory.propTypes = {
  className: PropTypes.string,
};

export default LowestPerformingCategory;

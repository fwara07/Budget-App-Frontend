import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import moment from "moment";
import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  image: {
    height: 48,
    width: 48,
  },
});

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
};

const CategoryList = ({ className, ...rest }) => {
  const classes = useStyles();
  const [categories] = useState(JSON.parse(localStorage.getItem("categories")));
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        subtitle={`${categories.length} in total`}
        title="All Categories"
      />
      <Divider />
      <List>
        {categories.map((category, i) => (
          <ListItemLink
            href={`category/${category.id}`}
            divider={i < categories.length - 1}
            key={category.id}
          >
            <ListItemText
              primary={category.title}
              secondary={`Created ${moment(category.created_at).fromNow()}`}
            />
          </ListItemLink>
        ))}
      </List>
      <Divider />
    </Card>
  );
};

CategoryList.propTypes = {
  className: PropTypes.string,
};

export default CategoryList;

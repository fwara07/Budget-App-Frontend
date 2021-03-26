import React, { useEffect, useState } from "react";
import clsx from "clsx";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { getTotalHistoryData } from "../actions/actions";

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: "flex-end",
  },
}));

const TotalHistory = ({ className, ...rest }) => {
  const classes = useStyles();
  const [history, setHistory] = useState([]);

  const setHistoryState = (json) => {
    setHistory(json);
  };

  useEffect(() => {
    getTotalHistoryData(setHistoryState);
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Latest History" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Action</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(history.length >= 8 ? history.slice(0, 8) : history).map(
                (item) => (
                  <TableRow hover key={item.id}>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.action}</TableCell>
                    <TableCell>
                      {moment(item.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          href="/history"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

TotalHistory.propTypes = {
  className: PropTypes.string,
};

export default TotalHistory;

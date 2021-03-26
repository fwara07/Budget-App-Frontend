import React, { useEffect, useState } from "react";
import {
  Box,
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
import { getTotalHistoryData } from "./actions/actions";
import clsx from "clsx";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Page from "./containers/Page";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: "flex-end",
  },
}));

const History = ({ className, ...rest }) => {
  const classes = useStyles();
  const [history, setHistory] = useState([]);

  const setHistoryState = (json) => {
    setHistory(json);
  };

  useEffect(() => {
    getTotalHistoryData(setHistoryState);
  }, []);
  return (
    <Page title="History">
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardHeader title="Latest History" />
        <Divider />
        <PerfectScrollbar>
          <Box>
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
                {history.map((item) => (
                  <TableRow hover key={item.id}>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.action}</TableCell>
                    <TableCell>
                      {moment(item.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
    </Page>
  );
};

History.propTypes = {
  className: PropTypes.string,
};

export default History;

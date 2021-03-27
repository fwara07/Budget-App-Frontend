import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const SpendingPerCategory = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [series, setSeries] = useState([]);
  const [error, setError] = useState(false);

  const colorsLst = [
    colors.yellow[700],
    colors.blue[500],
    colors.green[500],
    colors.indigo[200],
    colors.red[500],
    colors.purple[500],
  ];

  useEffect(() => {
    fetch("https://budget-planning.herokuapp.com/api/get-percentage", {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.hasOwnProperty("msg")) {
          setSeries(Object.values(json));
        } else {
          setError(true);
        }
      });
  }, []);

  const labels = JSON.parse(localStorage.getItem("categories")).map(
    (category) => category.title
  );

  const data = {
    datasets: [
      {
        data: [...series],
        backgroundColor: colorsLst,
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: labels,
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const getCategoryChartData = () => {
    const resultLst = [];
    for (let i = 0; i < labels.length; i++) {
      resultLst.push({
        textColor: colorsLst[i],
        title: labels[i],
        value: series[i],
      });
    }
    return resultLst;
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Spending Per Category" />
      <Divider />
      {error ? (
        <CardContent>
          <Box height={300} position="relative">
            <svg width="100%" height="100%" viewBox="0 0 42 42" class="donut">
              <circle
                class="donut-hole"
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="#fff"
              ></circle>
              <circle
                class="donut-ring"
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke="#d2d3d4"
                stroke-width="3"
              ></circle>

              <circle
                class="donut-segment"
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke="#ce4b99"
                stroke-width="3"
              ></circle>
            </svg>
            <Typography variant="h4" gutterBottom>
              You have not spent yet.
            </Typography>
          </Box>
        </CardContent>
      ) : (
        <CardContent>
          <Box height={300} position="relative">
            <Doughnut data={data} options={options} />
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            {getCategoryChartData().map(({ textColor, title, value }) => (
              <Box key={title} p={0.5} textAlign="center">
                <Typography color="textPrimary" variant="body1">
                  {title}
                </Typography>
                <Typography style={{ color: textColor }} variant="h4">
                  {value}%
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      )}
    </Card>
  );
};

SpendingPerCategory.propTypes = {
  className: PropTypes.string,
};

export default SpendingPerCategory;

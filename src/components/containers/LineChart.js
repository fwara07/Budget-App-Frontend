import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
}));

const LineChart = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const labels = JSON.parse(localStorage.getItem("categories")).map(
    (category) => category.title
  );
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const getChartData = async () => {
      let response = await fetch(
        "https://budget-planning.herokuapp.com/api/get-line-chart-data",
        {
          headers: {
            Authorization: `Jwt ${localStorage.getItem("token")}`,
          },
        }
      );
      let json = await response.json();
      setSeries(json);
    };
    getChartData();
  }, []);

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        borderColor: colors.indigo[500],
        data: series,
        label: "Performance",
      },
    ],
    labels: labels,
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 15,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider,
          },
        },
      ],
    },
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

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Performance Per Category" />
      <Divider />
      <CardContent>
        <Box height={400} position="relative">
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

LineChart.propTypes = {
  className: PropTypes.string,
};

export default LineChart;

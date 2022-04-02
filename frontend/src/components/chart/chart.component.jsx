import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  Label,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Title from "../titles/titles.component";
import "./chart.component.css";
import moment from "moment";

// Generate Sales Data
function createData(date, number) {
  return { date, number };
}

const data = [
  createData("10/01", 0),
  createData("10/3", 3),
  createData("10/8", 6),
  createData("10/11", 8),
  createData("10/14", 15),
  createData("10/15", 20),
  createData("10/18", 24),
  createData("10/17", 24),
  //   createData('10/1', undefined),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment className="chartcon">
      <Title>This Month</Title>
      <ResponsiveContainer>
        <LineChart
          className="chartcor"
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 10,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />

          <XAxis dataKey="date" stroke="black" style={theme.typography.body2} />
          <YAxis stroke="black" style={theme.typography.body2}>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Infected
            </Label>
          </YAxis>
          <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="number"
            stroke="#b30000"
            activeDot={{ r: 8 }}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

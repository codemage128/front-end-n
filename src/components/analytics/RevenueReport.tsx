import { FC, useMemo } from "react";
import React from "react";
import { CircularProgress, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { UserType } from "../../types/user";
import { RevenueType, StudyType } from "../../types/analytics";
import { asRevenueDisplayData } from "../../util";

const RevenueReport: FC<{ data: StudyType[] | null, userInfo: UserType }> = ({
  data,
  userInfo,
}) => {
  const displayData = useMemo<RevenueType[]>(() => asRevenueDisplayData(data as StudyType[]), [data]);
  return (
    <>
      <Box m={2}>
        {displayData ? (
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              width={500}
              height={500}
              data={displayData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#ff7300"
                activeDot={{ r: 8 }}
              />
              <Brush />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </>
  );
};

export default RevenueReport;

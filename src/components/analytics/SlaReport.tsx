import { CircularProgress } from "@mui/material";
import { Box} from "@mui/system";
import { FC, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SlaDisplayType, StudyType } from "../../types/analytics";
import { UserType } from "../../types/user";
import { asSlaDisplayData } from "../../util";

const toPercent = (value: number, fixed = 0) =>
  `${(value).toFixed(0)}%`;

const SlaReport: FC<{ data: StudyType[] | null; userInfo: UserType }> = ({
  data,
  userInfo,
}) => {
  const [displayData, setDisplayData] = useState<SlaDisplayType[] | null>(null);
  useEffect(() => {
    if (data) {
      setDisplayData(null);
      const slaData = asSlaDisplayData(data);
      setDisplayData(slaData);
    }
  }, [data]);
  const gradientOffset = () => {
    if (displayData) {
      const dataMax = Math.max(...displayData.map((i) => i.value));
      const dataMin = Math.min(...displayData.map((i) => i.value));

      if (dataMax <= 0) {
        return 0;
      }
      if (dataMin >= 0) {
        return 1;
      }
      return dataMax / (dataMax - dataMin);
    }
  };

  const off = gradientOffset();
  return (
    <>
      <Box m={2}>
        {data && displayData ? (
          <>
            <ResponsiveContainer width="100%" height={500}>
              <AreaChart
                width={500}
                height={400}
                data={displayData}
                stackOffset="expand"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={toPercent} />
                <Tooltip />
                <defs>
                  <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={off} stopColor="green" stopOpacity={1} />
                    <stop offset={off} stopColor="red" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#000"
                  fill="url(#splitColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </>
        ) : (
          <>
            <CircularProgress />
          </>
        )}
      </Box>
    </>
  );
};

export default SlaReport;

import { FC, useEffect, useState } from "react";
import React from "react";
import { CircularProgress, Box, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { UserType } from "../../types/user";
import { StudiesDisplayType, StudyType } from "../../types/analytics";
import { asBodyPartDisplayData, bodyParts } from "../../util";

const BodyPartReport: FC<{ data: StudyType[] | null; userInfo: UserType }> = ({
  data,
  userInfo,
}) => {
  const [displayData, setDisplayData] = useState<StudiesDisplayType[] | null>(
    null
  );
  const [bodyPart, setBodyPart] = useState<string>("all");

  const handleChange = (event: SelectChangeEvent) => {
    setBodyPart(event.target.value as string);
  };

  useEffect(() => {
    if (data) {
      setDisplayData(null);
      const { bodyPartData } = asBodyPartDisplayData(data, bodyPart);
      setDisplayData(bodyPartData);
    }
  }, [data, bodyPart]);
  return (
    <>
      <Box m={2}>
        {data && displayData ? (
          <>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={bodyPart}
              label="Body Part"
              sx={{ minWidth: 120 }}
              onChange={handleChange}
            >
              <MenuItem value="all">All</MenuItem>
              {bodyParts.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart
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
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </>
  );
};

export default BodyPartReport;

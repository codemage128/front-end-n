import { FC, useMemo, useState } from "react";
import React from "react";
import { CircularProgress, Box, MenuItem} from "@mui/material";
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
import { asModalityDisplayData, modalities } from "../../util";

const StudiesReport: FC<{ data: StudyType[] | null; userInfo: UserType }> = ({
  data,
  userInfo,
}) => {
  const [modality, setModality] = useState<string>("all");
  const displayData = useMemo<StudiesDisplayType[] | null>(() => asModalityDisplayData(data as StudyType[], modality), [data, modality]);
  const handleChange = (event: SelectChangeEvent) => {
    setModality(event.target.value as string);
  };

  return (
    <>
      <Box m={2}>
        {data && displayData ? (
          <>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={modality}
              label="Modality"
              sx={{ minWidth: 120 }}
              onChange={handleChange}
            >
              <MenuItem value="all">All</MenuItem>
              {modalities.map((item, index) => (
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
                <Bar dataKey="count" fill="#8884d8" />
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

export default StudiesReport;

import { Box, TextField, Typography } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import useAnalyticsApi from "../../api/analytics";
import { RootState, useSelector } from "../../redux/store";
import { StudyType } from "../../types/analytics";
import BodyPartReport from "./BodyPartReport";
import RevenueReport from "./RevenueReport";
import StudiesReport from "./StudiesReport";
import UserInfo from "./UserInfo";
import SlaReport from "./SlaReport";

const UserAnalytics: FC = () => {
  const analyticsApi = useAnalyticsApi();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [data, setData] = useState<StudyType[] | null>(null);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs("2022-12-01"));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs("2023-01-01"));
  const handleChange = (newValue: Dayjs | null, type: string) => {
    if (type === "start") {
      setStartDate(newValue);
    } else {
      setEndDate(newValue);
    }
  };

  const getData = useCallback(
    async (startDate: Dayjs | null, endDate: Dayjs | null) => {
        const res: StudyType[] = await analyticsApi.getData(
          userInfo?.id as string,
          startDate?.format("YYYY-MM-DD") as string,
          endDate?.format("YYYY-MM-DD") as string
        );
        setData(res);
    },
    [userInfo]
  );

  useEffect(() => {
    if (userInfo) getData(startDate, endDate);
  }, [userInfo, getData]);
  return (
    <>
      <Box m={3}>
        <Box justifyContent="center" display="flex">
          <Typography variant="h5">User Analytics</Typography>
        </Box>

        {userInfo ? (
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                m={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="MM/DD/YYYY"
                  value={startDate}
                  onChange={(value) => handleChange(value, "start")}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="End Date"
                  inputFormat="MM/DD/YYYY"
                  value={endDate}
                  onChange={(value) => handleChange(value, "end")}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </LocalizationProvider>
            <UserInfo {...{ userInfo }} />
            <SlaReport {...{ data, userInfo }} />
            <StudiesReport {...{ data, userInfo }} />
            <BodyPartReport {...{ data, userInfo }} />
            <RevenueReport {...{ data, userInfo }} />
          </>
        ) : (
          <>Please select the user</>
        )}
      </Box>
    </>
  );
};

export default UserAnalytics;

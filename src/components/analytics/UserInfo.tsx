import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { UserType } from "../../types/user";

const UserInfo: FC<{userInfo: UserType}> = ({userInfo}) => {
    return (
        <>
        <Box mt={2}>
              <Typography variant="body1">Name: {userInfo.name}</Typography>
              <Typography variant="body1" mt={2}>
                Subspecialty Modality: {userInfo.subspecialtyModality}
              </Typography>
              <Typography variant="body1" mt={2}>
                Subspecialty Body Part: {userInfo.subspecialtyBodyPart}
              </Typography>
              <Typography variant="body1" mt={2}>
                Sla Goal: {userInfo.slaGoal}
              </Typography>
              <Typography variant="body1" mt={2}>
                Revenue Goal: {userInfo.revenueGoal}
              </Typography>
              <Typography variant="body1" mt={2}>
                Study Goal: {userInfo.studiesGoal}
              </Typography>
            </Box>
        </>
    )
}

export default UserInfo;
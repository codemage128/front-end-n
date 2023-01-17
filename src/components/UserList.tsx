import { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useUsersApi from "../api/user";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { UserType } from "../types/user";
import { useDispatch } from "../redux/store";
import { setUserInfo } from "../redux/slices/user";
import { TextField } from "@mui/material";

export default function UserList() {
  const dispatch = useDispatch();
  const userAPI = useUsersApi();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [users, setUsers] = useState<UserType[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    user: UserType,
    index: number
  ) => {
    dispatch(setUserInfo(user));
    setSelectedIndex(index);
  };
  const getUsers = useCallback(async () => {
    const users: UserType[] = await userAPI.getUsers();
    setUsers(users.filter(user => user.name.toLowerCase().includes(searchValue)));
  }, [searchValue]);
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
    setSearchValue(e.target.value);
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TextField id="outlined-basic" label="Search User" variant="outlined" fullWidth value={searchValue} onChange={handleSearch} />
      <List component="nav" aria-label="main mailbox folders">
        {users &&
          users.map((user, index) => (
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, user, index)}
              key={index}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={user.name} />
            </ListItemButton>
          ))}
      </List>
    </Box>
  );
}

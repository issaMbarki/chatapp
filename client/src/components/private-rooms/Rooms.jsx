import { useTheme } from "@emotion/react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { NoRooms } from "./NoRooms";
import { useGetRooms } from "../../api/reactQuery";
import { RoomsLoading } from "../loading/RoomsLoading";
import useLoader from "../../hooks/useLoader";

export const Rooms = ({ setCurrentRoom, currentRoom }) => {
  const theme = useTheme();
  const appBarHeight = theme.mixins.toolbar.minHeight;
  const contentHeight = `calc(98vh - ${appBarHeight}px)`;
  const { isLoading, data } = useGetRooms();
  const rooms = data?.data;
  const showLoader = useLoader(isLoading, 600);
  if (isLoading || showLoader) {
    return <RoomsLoading contentHeight={contentHeight} />;
  }
  return (
    <Grid
      item
      xs={12}
      sm={4}
      sx={{ display: { xs: !currentRoom ? "block" : "none" , sm: "block" }}}
    >
      <Box
        sx={{
          height: contentHeight,
          overflow: "auto",
          boxShadow: 1,
          borderRadius: 1,
          backgroundColor: theme.palette.listBackGround.main,
        }}
      >
        {rooms?.length === 0 ? (
          <NoRooms />
        ) : (
          rooms?.map((room) => (
            <Box
              key={room._id}
              sx={{
                display: "flex",
                height: 80,
                alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
                borderBottom: "1px solid #ccc",
                "&:hover": {
                  backgroundColor: "#fcfcfc",
                  cursor: "pointer",
                },
              }}
              onClick={() => setCurrentRoom(room)}
            >
              <Typography variant="h6" width={80}>
                {room.name}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ flexGrow: 1, ml: "1rem", alignSelf: "end" }}
              >
                {room?.lastMessage}
              </Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("fhfh");
                }}
              >
                <MoreVertOutlinedIcon />
              </IconButton>
            </Box>
          ))
        )}
      </Box>
    </Grid>
  );
};

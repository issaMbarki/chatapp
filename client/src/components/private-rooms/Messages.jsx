import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Box, Typography, useTheme } from "@mui/material";
import TimeAgo from "react-timeago";

export const Messages = ({ messages }) => {
  const { _id: currentUser } = useContext(UserContext);
  const theme = useTheme();
  return messages.map((message, index) => (
    <Box
      key={message._id}
      display="flex"
      flexDirection="column"
      alignItems={
        message.sender._id !== currentUser ? "flex-start" : "flex-end"
      }
      sx={{
        py:
          index === messages.length - 1 || index < messages.length - 1
            ? 0.2
            : 0.8,
      }}
      px={0.8}
    >
      <Typography
        sx={{
          backgroundColor:
            message.sender._id === currentUser
              ? theme.palette.primary.light
              : theme.palette.listBackGround.main,
          py: 0.8,
          pr: 2,
          pl: 0.8,
          borderRadius: "10px",
          borderTopRightRadius:
            index > 0 && message.sender._id === messages[index].sender._id
              ? "5px"
              : "10px",
          borderBottomRightRadius:
            index > 0 && message.sender._id === messages[index].sender.id
              ? "5px"
              : "10px",
        }}
      >
        {message.content}
      </Typography>
      {index === messages.length - 1 ||
      (index < messages.length - 1 &&
        message.sender._id !== messages[index + 1].sender._id) ? (
        <Typography
          sx={{
            mx: 1,
          }}
          variant="caption"
        >
          {message.sender._id !== currentUser && ""}
          <TimeAgo
            date={message.timestamp}
            minPeriod={60}
            formatter={formatTimeAgo}
          />
        </Typography>
      ) : (
        ""
      )}
    </Box>
  ));
};
function formatTimeAgo(value, unit, suffix) {
  if (unit === "second") {
    return "Just now";
  } else {
    return `${value} ${unit}${value > 1 ? "s" : ""} ${suffix}`;
  }
}

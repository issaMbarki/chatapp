import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import TimeAgo from "react-timeago";

export const Messages = ({ messages }) => {
  const { _id: currentUser } = useContext(UserContext);
  const theme = useTheme();
  return messages.map((message, index) => (
    <Box
      key={message._id}
      sx={{
        display: message.sender._id !== currentUser ? "flex" : "",
      }}
    >
      {(index < messages.length - 1 &&
        messages[index + 1].sender._id !== message.sender._id &&
        message.sender._id !== currentUser) ||
      (messages.length === 1 && message.sender._id !== currentUser) ||
      (index === messages.length - 1 && message.sender._id !== currentUser) ? (
        <Avatar
          alt={message.sender.username}
          src="x"
          sx={{
            marginRight: "4px",
            alignSelf: "center",
          }}
        />
      ) : (
        ""
      )}
      <Box
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
          ml:
            message.sender._id !== currentUser &&
            index !== messages.length - 1 &&
            message.sender._id === messages[index + 1].sender._id &&
            "44px",
          mr: message.sender._id === currentUser && 0.8,
         
        }}
      >
        <Typography
          sx={{
            backgroundColor:
              message.sender._id === currentUser
                ? theme.palette.message.main
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
                maxWidth:"80%",
                mt:index===0?2:""
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
            {message.sender._id !== currentUser &&
              message.sender.username + " · "}
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

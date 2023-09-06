import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Typography } from "@mui/material";

export const Participants = ({ participants }) => {
  const { _id: currentUserID } = useContext(UserContext);
  // i want to remove the current user name , and switch it with the string 'you' ad also add 'and'
  const roomParticipants = participants.map((participant) =>
    participant._id === currentUserID ? undefined : participant.firstName
  );
  const filtredParticipants = roomParticipants.filter(
    (participant) => participant !== undefined
  );
  filtredParticipants.unshift("you");
  return (
    <Typography variant="subtitle2">
      {filtredParticipants.length === "1"
        ? "you"
        : filtredParticipants.map((participant, index) => {
            const isLastItem = index === filtredParticipants.length - 1;
            const isBeforeLastItem = index === filtredParticipants.length - 2;
            return isBeforeLastItem
              ? participant + " and "
              : isLastItem
              ? participant
              : participant + ",";
          })}
    </Typography>
  );
};

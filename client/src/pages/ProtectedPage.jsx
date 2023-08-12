import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useLogOut } from "../api/reactQuery";
import { useQueryClient } from "react-query";

export default function ProtectedPage() {
  const queryClient = useQueryClient();
  const {mutate:logUserOut, isLoading,isError,error,isSuccess } = useLogOut();
  const { user } = useContext(UserContext);
  const handleLogOut = () => {
   logUserOut()
  };
  if (isLoading) {
    return 'loging out ...'
  }
  if (isError) {
    return error.message
  }
  if (isSuccess) {
    queryClient.invalidateQueries(['currentUser']);
  }

  return (
    <div>
      <p> Welcome {user?.firstName} </p>
      <button onClick={handleLogOut}>log out</button>
    </div>
  );
}

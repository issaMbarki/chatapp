import { useQueryClient } from "react-query";
import { useLogOut } from "../../api/reactQuery";

export default function ProtectedPage() {
  const queryClient = useQueryClient();
  const {
    mutate: logUserOut,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useLogOut();
  const handleLogOut = () => {
    logUserOut();
  };
  if (isLoading) {
    return "loging out ...";
  }
  if (isError) {
    return error.message;
  }
  if (isSuccess) {
    queryClient.invalidateQueries(["currentUser"]);
  }

  return <button onClick={handleLogOut}>log out</button>;
}

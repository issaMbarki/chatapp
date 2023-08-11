import axios from "axios";
import { useEffect } from "react";
import {  useQuery } from "react-query";

export default function ProtectedPage() {
  const { isLoading, isSuccess } = useQuery("test", () =>
    axios
      .get("http://localhost:4000/protected", {
        withCredentials: true,
      })
      .then((res) => res.data)
  );
  useEffect(()=>{
    if (!isLoading && isSuccess) {
        console.log("succes");
      }
    
  },[isLoading,isSuccess])
  return <div>ProtectedPage</div>;
}

import { AuthenticationContext } from "@context/auth";
import { useContext } from "react";

function useAuth() {
  return useContext(AuthenticationContext);
}

export { useAuth };

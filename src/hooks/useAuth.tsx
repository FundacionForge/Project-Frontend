import { AuthContext } from "@/app/context/AuthContext";
import React from "react";

export const useAuth = () => React.useContext(AuthContext);

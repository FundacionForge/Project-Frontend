import { ProjectContext } from "@/app/context/ProjectProvider";
import React from "react";

export const useProject = () => React.useContext(ProjectContext);

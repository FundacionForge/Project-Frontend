/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[]
}

type ProjectContextData = {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>
};

export const ProjectContext = React.createContext<ProjectContextData | undefined>(undefined);
export const ProjectProvider: React.FC<Props> = ({ children }) => {
  const [sidebar, setSidebar] = React.useState(false);

  return (
    <ProjectContext.Provider value={{ sidebar, setSidebar }}>
      {children}
    </ProjectContext.Provider>
  );
};

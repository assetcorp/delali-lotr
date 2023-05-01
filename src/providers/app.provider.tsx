import React from "react";
import { AppState } from "../interfaces/index.interface";

const DEFAULT_STATE: AppState = {
  appMargin: 0,
};

export const AppContext = React.createContext(DEFAULT_STATE);

export interface AppProviderProps {
  children?: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [appMargin, setAppMargin] = React.useState(DEFAULT_STATE.appMargin);

  return (
    <AppContext.Provider
      value={{
        appMargin,
        setAppMargin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

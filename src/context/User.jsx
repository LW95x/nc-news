import { createContext, useState } from "react";

export const usernameContext = createContext();

export const UserProvider = ({children, defaultUser = { user: { username: "tickle122" }}}) => {
  const [currentUser, setCurrentUser] = useState(defaultUser);

  return (
    <usernameContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </usernameContext.Provider>
  );
};

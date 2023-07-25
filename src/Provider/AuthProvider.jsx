import { createContext, useContext, useEffect, useState } from "react";
const AuthProviderContext = createContext();
const AuthProviderContextDispatcher = createContext();
// eslint-disable-next-line react/prop-types

// eslint-disable-next-line react/prop-types
const LOCAL_STORAGE_AUTH_KEY = "authState";
// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [state, setState] = useState(false);
  useEffect(() => {
    const userData =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)) || false;
    setState(userData);
  }, []);
  useEffect(() => {
    const data = state && JSON.stringify(state);
    if (data)
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, data);
  }, [state]);
  // useEffect(() => {
  //   const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY));
  //   if (userData) setState(userData);
  // }, []);

  // useEffect(() => {
  //   if(state?.length) { // only store the state if products exists and it's length is greater than 0
  //     localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(state));
  //   }
  // }, [state]);
  return (
    <AuthProviderContext.Provider value={state}>
      <AuthProviderContextDispatcher.Provider value={setState}>
        {children}
      </AuthProviderContextDispatcher.Provider>
    </AuthProviderContext.Provider>
  );
}

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthProviderContext);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthActions = () => useContext(AuthProviderContextDispatcher);

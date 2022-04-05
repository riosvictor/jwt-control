import React, { createContext, useState } from "react";
import { IAuth } from "../models";

interface IAuthContext {
  auth: IAuth;
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>;
}

const defaultState = {
  auth: {} as IAuth,
  setAuth: () => {}
};

const AuthContext = createContext<IAuthContext>(defaultState);

export const AuthProvider: React.FC = ({ children }) => {
    const [auth, setAuth] = useState<IAuth>({} as IAuth);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
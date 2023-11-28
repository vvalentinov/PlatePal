import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useService = (serviceFactory, authorized = true) => {
    let authToken;
    if (authorized) {
        const { token } = useContext(AuthContext);
        authToken = token;
    }

    return authorized ? serviceFactory(authToken) : serviceFactory();
};
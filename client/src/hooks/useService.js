import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useService = (serviceFactory) => {
    const { token } = useContext(AuthContext);

    return serviceFactory(token);
};
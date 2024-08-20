import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    // const [userPlace, setUserPlace] = useState("default");
    const [userPlace, setUserPlace] = useState("restaurant-profile-14"); //temp

    useEffect(() => {
        console.log("userPlace >>", userPlace);
    }, [userPlace]);

    return (
        <UserContext.Provider value={{ userPlace, setUserPlace }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;

import React from "react";
import UserContext from "./UserContext.js";

const UserContextProvider = ({children}) => {
    const [userDetails, setUserDetails] = React.useState(null)
    return(
        <UserContext.Provider value={{userDetails, setUserDetails}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
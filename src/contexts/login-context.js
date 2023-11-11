import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

const LoginContext = React.createContext([[]]);

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState("");

    useEffect(() => { checkLoginStatus(); }, [])

    const rescuingUser = (user) => {
        axios
        .get(`http://127.0.0.1:5000/user/${user}`, { 
            withCredentials: true 
        })
        .then(response => {
            setLoggedUser(response.data);
        })
        .catch(error => {
            console.log("Rescuing error", error);
        });
    }

    const checkLoginStatus = () => {
        axios
        .get("http://127.0.0.1:5000/login", {
            withCredentials: true
        })
        .then(response => {
            if (response.data.loggedIn) {
                rescuingUser(response.data.id);
            }
        })
        .catch(error => {
            console.log("Checking error", error);
        });
    }

    const handleLogout = () => {
        axios
        .delete("http://127.0.0.1:5000/login", { withCredentials: true })
        .then(response => {
            setLoggedUser("");
        })
        .catch(error => {
          console.log("Error logging out", error);
        });
    } 

    return (
        <LoginContext.Provider value={{
            loggedUser,
            setLoggedUser,
            handleLogout
        }}>
            {children}
        </LoginContext.Provider>
    )
}
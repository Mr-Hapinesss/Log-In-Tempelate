import React, { useEffect, useState } from 'react';
import { userContext } from './userContext.jsx';
import {Link} from 'react-router-dom';


function Header() {
  const { userInfo, setUserInfo } = React.useContext(userContext);


  useEffect( ()=> {   // Fetch user profile on component mount
        fetch('http://localhost:3000/user/profile', {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        })
        .then(response => {
            if (!response.ok) throw new Error('Not logged in');
            return response.json();
            })
        .then(data => {
            console.log("Fetched user info:", data);
           setUserInfo(data);
           console.log("User info set to:", data);
        })
        }, []);

        console.log("Current user info:", userInfo);



  async function logout() {   // Logout function
    await fetch('http://localhost:3000/user/logout', {
        method: 'POST',
        credentials: 'include' // Include cookies in the request
    })
    .then(response => {
        if (response.ok) {
            setUserInfo(null); // Clear user info on logout
        }
    })
    .catch(error => {
        console.error("Logout error:", error);
    });
  }

  const username = userInfo?.username;

  return (
    <>
        <header className="flex justify-between w-full bg-slate-600 px-4 py-6 border-gray-300">
            <Link to="/" className="text-black text-3xl align-middle font-bold">My Website</Link>
            <nav className="flex justify between gap-4 text-grey-100 text-sm font-medium">

                {username && ( // If user is logged in
                    <>
                        <button >
                          <Link to="/profile" >{username}'s Profile</Link>
                        </button>
                        <button >
                          <a onClick={logout}>Logout</a>
                        </button>
                    </>
                )}
                {!username && ( // If user is not logged in
                    <>
                        <button >
                          <Link to="/signin">SignIn</Link>
                        </button>
                        <button >
                          <Link to="/signup">SignUp</Link>
                        </button>
                    </>
                )}
            </nav>
        </header>
    </>
  );
}

export default Header;
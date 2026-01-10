import { useState } from "react";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ redirect, setRedirect ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation

        if (!username || !password) {
            alert("All fields are required");
            return;
        }
        if (username.length < 4) {
            alert("Username must be at least 4 characters long");
            return;
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }

        // Send login request to backend

        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password }), 
            credentials: 'include'      // Include cookies in the request   
        });
        if (response.ok) {
            alert("Login successful!");
            setRedirect(true);   // Set redirect to true on successful login

            // Redirect to profile page after login
            window.location.href = "/main";
        } else {
            alert("Login failed. Please check your credentials and try again.");
        }
        
        // Clear form fields
        setUsername("");
        setPassword("");

    };

    return (
        <>
            <div className="flex flex-col items-center justify-center bg-gray-100">
                <form onSubmit={handleSubmit} className=" my-4 rounded-md shadow-lg p-2 w-130 bg-gray-200">
                    <div>
                        <div className="text-center mb-4 font-bold">
                            <h1>Sign In</h1>
                        </div>
                        <div className="flex flex-col p-4">
                            <input type="text" 
                                    placeholder="Username" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md my-2 p-2" />
                            <input type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="w-full border border-gray-300 rounded-md my-2 p-2"/>
                            <button type="submit" className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md">Sign In</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignIn;
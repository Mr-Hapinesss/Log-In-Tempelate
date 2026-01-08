import { useState } from "react";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })    
        });
        if (response.ok) {
            alert("Login successful!");
        } else {
            alert("Login failed. Please check your credentials and try again.");
        }
        
        // Clear form fields
        setUsername("");
        setPassword("");

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                     <h1>Sign In</h1>
                </div>
                <div>
                    <input type="text" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Sign In</button>
                </div>
            </form>
        </>
    );
}

export default SignIn;
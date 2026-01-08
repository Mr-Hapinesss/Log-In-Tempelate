import { useState } from "react";
import { Navigate } from "react-router-dom";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation

        if (!username || !password || !confirmPassword) {
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
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Send registration request to backend

        const response =await fetch('http://localhost:3000/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })    
        });
        if (response.status === 201) {
            alert("Registration successful! Go to Sign In page to log in.");
            setRedirect(true);
        } else {
            alert("Registration failed. Please try again.");
        }

        // Clear form fields
        setUsername("");
        setPassword("");
        setConfirmPassword("");

        if (redirect) {
            return <Navigate to="/signin" />;
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                     <h1>Register Page</h1>
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
                    <input type="password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </>
    );
}

export default SignUp;